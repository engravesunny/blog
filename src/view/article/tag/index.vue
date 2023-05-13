<template>
    <div class="container unselectable">
        <div class="Page" :style="{ width: `${defaultWidth}%` }">
            <div class="top" v-if="showTop">
                <!-- 分类标题 -->
                <div class="title">
                    <h1>Post Tags</h1>
                </div>
                <div class="tagCard" v-loading="loading">
                    <smallCard :active="item.name === title" v-if="!loading" @click="toTag(item.name)"
                        v-for="item in tagFinalList" :key="item.name" :name="item.name" :num="item.num"></smallCard>
                </div>
            </div>

            <!-- 标签概览列表 -->
            <div v-if="!isShowArList && !loading" class="tagList">
                <tagList :tagFinalList="tagFinalList"></tagList>
            </div>

            <!-- 文章卡片列表 -->
            <div v-else class="article_list_display">
                <!-- 具体分类列表展示 -->
                <div v-if="!loading" class="article_list">
                    <!-- 返回按钮 -->
                    <div class="over">
                        <div class="back iconfont" @click="back(false)">&#xe60b; 返回 </div>
                        <span class="title"> &nbsp;当前所选标签：<smallCard :name="title"></smallCard></span>
                    </div>
                    <articleList :articleList="tagArList"></articleList>
                </div>
            </div>
            <rightNav v-if="showRightNav"></rightNav>
        </div>
        <placeOrder v-if="showRightNav"></placeOrder>
    </div>
</template>

<script setup>
import articleList from '../../../components/articleList.vue';
import smallCard from '../../../components/smallCard.vue'
import tagList from './components/tagList.vue'
import placeOrder from '../article/components/placeOrder.vue';
import { getDirNames } from '../../../api/postApi.js'

const showTop = ref(true)

let title = ref('')
const route = useRoute()
let showRightNav = ref(true)
let loading = ref(false)
let defaultWidth = ref(55)
let isShowArList = ref(false)
// 标签列表
let tagsList = reactive([])
// 最终标签列表
let tagFinalList = reactive([])
// 具体标签文章列表
let tagArList = reactive([])
// 展示具体标签文章列表
let toTag = async (item) => {
    showTop.value = false
    title.value = item
    tagArList.splice(0, tagArList.length)
    const { data: articleData } = await getDirNames({
        dir_path: './posts/tag/' + item
    })
    articleData.data.dir_names.forEach(item => {
        tagArList.push(item)
    })
    back(true)
}

let back = (item) => {

    if (!item) {
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
    loading.value = true
    tags.data.dir_names.forEach(element => {
        tagsList.push(element)
    });
    if (tagsList.length === tags.data.dir_names.length) {
        loading.value = false
    }
}
// 获取标签数量
let getTagNum = async (tag) => {
    const { data: tagNum } = await getDirNames({
        dir_path: `./posts/tag/${tag}/`
    })
    tagFinalList.push({
        name: tag,
        num: tagNum.data.dir_names.length
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
    }

}, {
    deep: true,
    immediate: true
})

onMounted(async () => {
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
})

</script>

<style lang="less" scoped>
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
            background: rgba(255, 255, 255, 0.8);
            border-radius: 25px;
            padding: 20px;
            align-items: center;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

            .title {
                @media screen and (min-width:300px) and (max-width:400px) {
                    font-size: 0.5rem;
                }

                font-size: 30px;
                margin: 0 0 30px 0;
            }

            .tagCard {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                overflow: hidden;
            }
        }

        .tagList {
            width: 100%;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

            @media screen and (min-width:300px) and (max-width:400px) {
                padding: 0;
            }

            padding: 20px;
            border-radius: 25px;
            background: rgba(255, 255, 255, 0.8);
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
                box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
                border-radius: 25px;
                border: 1px solid #fff;
            }
        }
    }
}
</style>