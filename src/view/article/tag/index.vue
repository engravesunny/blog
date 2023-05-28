<template>
    <div class="container unselectable">
        <div class="Page" :style="{ width: `${defaultWidth}%` }">
            <div class="top box_border" v-if="showTop">
                <!-- 分类标题 -->
                <div class="title">
                    <h1>Post Tags</h1>
                </div>
                <div class="tagCard" v-loading="loading">
                    <histogram v-if="!loading" :tag="tagFinalList"></histogram>
                </div>
            </div>

            <!-- 标签概览列表 -->
            <div v-if="!isShowArList && !loading" class="tagList box_border">
                <tagList :tagFinalList="tagFinalList"></tagList>
            </div>

            <!-- 文章卡片列表 -->
            <div v-else class="article_list_display aniamte_fadeIn">
                <!-- 具体分类列表展示 -->
                <div v-loading="!tagArList.length" class="article_list box_border">
                    <!-- 返回按钮 -->
                    <div class="over">
                        <div class="back iconfont" @click="back(false)">&#xe60b; 返回 </div>
                        <span class="title"> &nbsp;当前所选标签：<smallCard :name="title"></smallCard></span>
                    </div>
                    <articleList :articleList="tagArList"></articleList>
                </div>
            </div>

        </div>
        <rightNav v-if="showRightNav"></rightNav>
        <!-- <placeOrder v-if="showRightNav"></placeOrder> -->
    </div>
</template>

<script setup>
import articleList from '../../../components/articleList.vue';
import smallCard from '../../../components/smallCard.vue'
import tagList from './components/tagList.vue'
import { getDirNames } from '../../../api/postApi.js'
import histogram from './components/histogram.vue';
import router from '../../../router';
import { getTagInfo, getTagPost } from '../../../utils/getTagInfo';

const showTop = ref(true)

let title = ref('')
const route = useRoute()
let showRightNav = ref(true)
let loading = ref(true)
let defaultWidth = ref(55)
let isShowArList = ref(false)
// 标签列表
let tagsList = reactive([])
// 最终标签列表
let tagFinalList = reactive([])
// 具体标签文章列表
let tagArList = reactive([])
// 展示具体标签文章列表
let toTag = (item) => {
    showTop.value = false
    title.value = item
    tagArList.splice(0, tagArList.length)
    const postList = getTagPost(item)
    postList.forEach(item => {
        tagArList.push(item.name)
    })
    back(true)
}

let back = (item) => {

    if (!item) {
        router.push('/tag')
        title.value = ''
        showTop.value = true
    }
    isShowArList.value = item
}

// 获取标签列表
let getTags = async () => {
    tagsList.splice(0, tagsList.length)
    const { data: tags } = await getDirNames({
        dir_path: './posts/tag'
    })
    tags.data.dir_names.forEach(element => {
        tagsList.push(element)
    });
}
// 获取标签数量
let getTagNum = async (tag) => {
    const tagInfo = await getTagInfo(tag)
    tagFinalList.push({
        name: tagInfo.name,
        num: tagInfo.num
    })
    if (tagsList.length === tagFinalList.length) {
        loading.value = false
    } else {
        loading.value = true
    }
}

const props = defineProps(['scroller'])

watch(() => route, (val) => {
    if (val.query.name) {
        toTag(val.query.name)
    } else {

    }

}, {
    deep: true,
    immediate: true
})

const init = async () => {
    await getTags()
    await tagsList.forEach((item, index) => {
        getTagNum(item)
    });
    if (window.innerWidth < 1000) {
        defaultWidth.value = 80
        showRightNav.value = false
    }
    PubSub.subscribe('closeSide', () => {
        defaultWidth.value = 80
        showRightNav.value = false
    })
    PubSub.subscribe('openSide', () => {
        defaultWidth.value = 55
        showRightNav.value = true
    })
}

onMounted(() => {
    init()
})

</script>

<style lang="less" scoped>
.aniamte_fadeIn {
    animation: fadeIn;
    animation-duration: 1s;
}

.container {
    @media screen and (min-width:300px) and (max-width:400px) {
        margin-top: 5px;
    }

    margin-top: 25px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    .Page {
        @media screen and (min-width:300px) and (max-width:400px) {
            padding: 0;
        }

        padding: 20px;
        position: relative;
        border-radius: 10px;
        border: 1px solid #fff;
        width: 55%;
        min-width: 375px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        flex-direction: column;

        .top {
            @media screen and (min-width:300px) and (max-width:400px) {
                width: 100%;
                padding: 20px 0px;
            }

            margin-bottom: 20px;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding: 20px;
            align-items: center;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

            .title {
                @media screen and (min-width:300px) and (max-width:400px) {
                    font-size: 0.5rem;
                }

                font-size: 25px;
                margin: 0 0 30px 0;
            }

            .tagCard {
                width: 100%;
                display: flex;
                justify-content: center;
                min-height: 200px;
                flex-wrap: wrap;
                border-radius: 10px;
                overflow: hidden;
            }
        }

        .tagList {
            width: 100%;

            @media screen and (min-width:300px) and (max-width:400px) {
                padding: 0;
            }

            padding: 20px;
            border-radius: 10px;
            transition: all 0.5s;
        }

        .article_list_display {
            width: 100%;

            .over {
                @media screen and (min-width:300px) and (max-width:400px) {
                    margin-left: 20px;
                    margin-top: 10px;
                    width: 300px;
                }

                margin-left: 40px;
                margin-top: 40px;
                width: 100%;
                height: 120px;

                .title {
                    @media screen and (min-width:300px) and (max-width:400px) {
                        font-size: 0.4rem;
                        width: 300px;
                    }

                    font-size: 18px;
                    width: calc(100% - 200px);
                    display: flex;
                    align-items: center;
                }

                .back {
                    width: 80px;
                    display: inline;
                    font-size: 20px;
                    line-height: 60px;
                    color: rgb(0, 0, 0);
                    cursor: pointer;
                }

                .back:hover {
                    color: rgba(0, 0, 0, 0.5);
                }
            }

            .article_list {
                width: 100%;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 10px;
            }
        }
    }
}
</style>