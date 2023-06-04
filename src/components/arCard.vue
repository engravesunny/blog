<template>
    <div ref="dom" @click="toArticle" class="card_container">
        <div class="top">
            <img ref="imgDom" :src="`${baseURL}/image/loading.gif`" :data-src="`${postImgUrl}/${postImg}`" alt="postImg">
        </div>
        <div class="bottom">
            <div class="bTop">
                <div class="left">
                    <div class="title shenglue">{{ postName }}</div>
                    <div class="publishTime iconfont">&#xe663;{{ dateInfo }}</div>
                </div>
                <div class="right">
                    <div @click.stop="toCategory" class="category iconfont shenglue">&#xe811;{{ category }}</div>
                </div>
            </div>
            <div class="bBottom">
                <div @click.stop="toTag(item)" class="tag iconfont" v-for="item in tags" :key="item">&#xe62f; {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { postImgUrl, baseURL } from '../constant'
import toPath from '../utils/toPath';
import { getPostInfo } from '../utils/getPostInfo';

const router = useRouter()
const props = defineProps({
    postName: {
        type: String,
        default: '文章标题'
    }
})

const dom = ref<Element>()
const imgDom = ref<Element>()
// 分类名
let category = ref('')
// 标签信息
let tags = reactive<string[]>([])
// 日期信息
let dateInfo = ref('')
// 封面信息
let postImg = ref('')

let timer = null

// 跳转
let toCategory = () => {
    toPath('/category', category.value)
}
let toTag = (item: string) => {
    toPath('/tag', item)
}
let toArticle = () => {
    router.push({
        path: '/article',
        query: {
            postName: props.postName,
            date: dateInfo.value,
            tag: tags,
            category: category.value
        }
    })
}

const handleLoad = () => {
    (dom.value as Element).classList.add('animate_zoomIn');
    if (postImg.value) {
        (imgDom.value as HTMLImageElement).src = (imgDom.value as HTMLImageElement).dataset.src as string
    }
}

const init = async () => {
    const info = await getPostInfo(props.postName)

    category.value = info.category
    info.tag.map(item => {
        tags.push(item)
    })
    dateInfo.value = info.date
    postImg.value = info.postImg
    if ((imgDom.value as HTMLImageElement).src.includes('loading')) {
        (imgDom.value as HTMLImageElement).src = postImgUrl + '/' + postImg.value
    }
}

const handleLazy = (el: Element) => {
    const intersectionObserver = new IntersectionObserver((changes) => {
        changes.forEach((item, index) => {

            if (item.intersectionRatio > 0) {
                intersectionObserver.unobserve(item.target)
                handleLoad()
            }
        })
    })
    intersectionObserver.observe(el)
}

onBeforeMount(async () => {
    await init()
})

onMounted(() => {
    handleLazy(dom.value as Element)
})

</script>

<style lang="less" scoped>
.animate_zoomIn {
    animation: zoomIn;
    animation-duration: 1s;
}

.card_container {
    width: 100%;
    min-width: 290px;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
    background: var(--background-transparent);
    border: var(--box-border);
    transition: all 0.5s;
    cursor: pointer;

    .top {
        position: relative;
        border-radius: 10px;
        width: 100%;
        height: 180px;
        text-align: center;
        transition: all 0.5s;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }

        img:hover {
            transform: scale(1.2);
        }

        .loadingImg {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .bottom {
        margin: 10px 0;
        width: 100%;
        height: 110px;

        // background-color: pink;
        .bTop {
            width: 100%;
            height: 60%;
            padding: 5px 10px;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);

            .left {
                width: 65%;
                float: left;
                height: 100%;
                display: flex;
                flex-direction: column;

                .title {
                    text-align: start;
                    font-size: 18px;
                    font-weight: 700;
                    width: 100%;
                    height: 60%;
                    // background-color: black;
                }

                .publishTime {
                    text-align: start;
                    height: 30%;
                    padding: 5px;
                    line-height: 10px;
                    font-size: 12px;
                    font-weight: 700;
                    color: gray;
                    // background-color: gray;
                }
            }

            .right {
                width: 30%;
                float: right;
                height: 100%;
                text-align: center;

                .category {
                    line-height: 50px;
                    font-size: 15px;
                    font-weight: 700;
                    width: 100%;
                    height: 100%;
                    padding: 5px;
                    cursor: pointer;
                }

                .category:hover {
                    color: #989898;
                }
            }
        }

        .bBottom {
            width: 100%;
            padding: 3px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .tag {
                margin: 2px 5px;
                padding: 0px 5px;
                font-size: 14px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                font-weight: 700;
                height: 30px;
                border-radius: 5px;
                background-color: #000;
                cursor: pointer;
                transition: all 0.5s;
            }

            .tag:hover {
                background-color: #fff;
                color: #000;
            }
        }
    }
}
</style>