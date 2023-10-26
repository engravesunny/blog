<template>
    <div class="container">
        <div class="header" :style="{ backgroundImage: `url(${postImgUrl}/${postImg.split('.')[0] + 'min.webp'})` }">
            <div class="site-info">
                <h1>{{ postName }}</h1>
                <div class="top">
                    <div class="bottom">
                        <div class="date shenglue iconfont" :title="date">&#xe663; {{ date }}</div>
                        <div class="tagList iconfont">
                            <div class="tag shenglue iconfont" :title="item" v-for="(item, index) in tagList" :key="item">
                                &#xe62f; {{ item }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <waves />
        </div>
        <div class="article_container line-numbers match-braces">
            <article ref="article" class="article">
                <div v-loading="loading" class="markdown-body" v-html="html"></div>
            </article>
            <rightNav v-if="showRightNav"></rightNav>
        </div>
    </div>
    <img-display @closeImgDisplay="hanldeCloseImgDisplay" v-if="showDisplayImg" :display-img-src="displayImgSrc"
        :display-img-alt="displayImgAlt"></img-display>
</template>

<script setup>
import _ from 'lodash'
import { postImgUrl } from '../../../constant';
import rightNav from '../../../components/rightNav.vue'
import 'github-markdown-css'
import Prism from 'prismjs';
import showdown from 'showdown';
import getPost from '@/api/post'
import { getPostInfo } from '../../../utils/getPostInfo';
import imgDisplay from './components/imgDisplay.vue';

// 点击图片展示
// 展示图片的src
const displayImgSrc = ref('');
const displayImgAlt = ref('');
const showDisplayImg = ref(false);
// TODO there should have a method which can let the article image can be clicked and open in screen.
// 给图片添加点击事件
const addClickToImg = () => {
    const article = document.querySelector('article');
    const dfs = (nodes) => {
        nodes.childNodes.forEach(node => {
            if (node.childNodes.length > 0) {
                dfs(node);
            } else {
                if (node.nodeName === 'IMG') {
                    node.style.borderRadius = '5px';
                    node.addEventListener('click', handleClickImg)
                    function mouseEnter() {
                        node.style.margin = '5px 0'
                        node.style.transition = 'all 0.2s'
                        node.style.boxShadow = 'rgba(17, 17, 26, 0.1) 0px 0px 16px';
                    }
                    function mouseLeave() {
                        node.style.boxShadow = 'none';
                        node.removeEventListener('mouseenter', mouseLeave);
                    }
                    node.addEventListener('mouseenter', mouseEnter)
                    node.addEventListener('mouseleave', mouseLeave)

                }
            }
        })
    }
    dfs(article);
}
const handleClickImg = (e) => {
    let target = e.target;
    displayImgAlt.value = target.alt;
    displayImgSrc.value = target.src;
    showDisplayImg.value = true;
}
const hanldeCloseImgDisplay = () => {
    showDisplayImg.value = false;
}

let loading = ref(false)

let showRightNav = ref(true)

let defaultWidth = ref(55)

let html = ref('')

let postName = ref('文章标题')
let date = ref('')
let tagList = reactive([])
let postImg = ref('')
let currnetQuery = ref('')

const getPostImg = async () => {
    const res = getPostInfo(postName)
    postImg.value = res.postImg
}

const route = useRoute()

onMounted(() => {
    if (document.body.clientWidth < 1250) {
        showRightNav.value = false
    }
    PubSub.subscribe('closeSide', () => {
        showRightNav.value = false
    })
    PubSub.subscribe('openSide', () => {
        PubSub.publish('getHead')
        defaultWidth.value = 55
        showRightNav.value = true
    })
})

const handleRouteChange = (val) => {
    try {
        if (val.path === '/article') {
            currnetQuery.value = val.query;
            loading.value = true
            tagList.splice(0, tagList.length)
            postName = val.query.postName
            getPostImg()
            date = val.query.date
            if (val?.query?.tag?.forEach) {
                val?.query?.tag?.forEach(item => {
                    tagList.push(item)
                })
            } else {
                tagList.push(val?.query?.tag)
            }
            getPost(encodeURIComponent(val.query.postName + '.md')).then(res => {
                const converter = new showdown.Converter();
                const htmlOutput = converter.makeHtml(res.data);
                html.value = htmlOutput
            }).then(() => {
                const pres = document.querySelectorAll('pre')
                pres.forEach(pre => {
                    pre.setAttribute('data-prismjs-copy', '复制')
                    pre.setAttribute('data-prismjs-copy-success', '复制成功!')
                })
                loading.value = false
                addClickToImg();
            }).then(() => {
                Prism.highlightAll();
                PubSub.publish('getHead')
                loading.value = false
            }).catch(error => {
                loading.value = false
            })
        }
    } catch (error) {
    }
}

watch(() => route, (val) => {
    if (_.isEqual(val.query, currnetQuery.value)) return;
    handleRouteChange(val);
}, {
    deep: true,
    immediate: true
})

</script>

<style lang="less" scoped>
.container {
    margin-top: -55px;
}

.header {
    padding-top: 55px;
    position: relative;
    width: 100%;
    height: 400px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;

    .site-info {
        position: absolute;
        top: 145px;
        width: 100%;

        .top {
            @media screen and (min-width:300px) and (max-width:600px) {
                height: 80px;
            }

            width: 100%;

            .bottom {
                @media screen and (min-width:300px) and (max-width:600px) {
                    padding: 0 10px;
                }

                width: 100%;
                display: flex;
                justify-content: center;
                padding: 0 20px;

                .date {
                    @media screen and (min-width:300px) and (max-width:600px) {
                        font-size: 12px;
                    }

                    margin-right: 20px;
                    text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
                    font-size: 20px;
                    color: #fff;
                }

                .tagList {
                    display: flex;
                    justify-content: flex-end;

                    .tag {
                        @media screen and (min-width:300px) and (max-width:600px) {
                            font-size: 12px;
                        }

                        padding: 3px 5px;
                        background-color: #000;
                        color: #fff;
                        margin: 0 3px;
                        border-radius: 5px;
                        font-weight: 700;
                        transition: all 0.5s;
                        cursor: pointer;
                    }

                    .tag:hover {
                        color: #000;
                        background-color: #fff;
                    }
                }
            }
        }

        h1 {
            @media screen and (min-width: 300px) and (max-width: 500px) {
                font-size: 22px;
            }

            color: #fff;
            text-align: center;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, .45);
            line-height: 2;
            font-size: 3em;
        }
    }


}

.article_container {
    (min-width:300px) and (max-width:600px) {
        margin-top: 5px;
    }

    margin-top: 25px;
    position: relative;
    width: 100%;
    min-height: 900px;
    display: flex;
    justify-content: center;



    .article {
        width: 55%;

        @media screen and (min-width:300px) and (max-width:600px) {
            padding: 5px;
            border-radius: 10px;
            width: 100%;
        }

        @media screen and (min-width:600px) and (max-width:1250px) {
            width: 80%;
        }

        position: relative;
        min-width: 375px;
        transition: all 0.5s;

        .markdown-body {
            @media screen and (min-width:300px) and (max-width:600px) {
                padding: 20px 10px;
            }

            margin-right: 40px;
            justify-content: space-between;
            width: 100%;
            padding: 30px;
            border-radius: 10px;
            background: rgba(255, 255, 255, 0.9);
        }
    }

}
</style>