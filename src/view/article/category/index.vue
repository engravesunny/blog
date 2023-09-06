<template>
    <div class="categoryPage_container unselectable">
        <div class="categoryPage">
            <div v-if="!isShowArList" class="top box_border">
                <!-- 分类标题 -->
                <div class="title">
                    <h1>Post Categories</h1>
                </div>
                <div class="categoryCard">
                    <smallCard @click="toCategory(item.name)" v-for="item in categoryInfo" :active="item === title"
                        :key="item" :name="item.name" :num="item.value" />
                </div>
            </div>
            <div v-if="isShowArList" class="article_list_display">
                <!-- 具体分类列表展示 -->
                <div class="article_list box_border">
                    <!-- 返回按钮 -->
                    <div class="over">
                        <div class="back iconfont" @click="showArList(false)">&#xe60b; 返回</div>
                        <span class="title"> &nbsp;当前所选分类：<smallCard :name="title"></smallCard></span>
                    </div>
                    <articleList :articleList="categoryArList"></articleList>
                </div>
            </div>
            <div v-show="!isShowArList" class="radar box_border">
                <radar :categoryList="categoryList" :categoryLength="categoryInfo"></radar>
            </div>

        </div>
        <rightNav v-if="showRightNav"></rightNav>
        <!-- <placeOrder v-if="showRightNav"></placeOrder> -->
    </div>
</template>

<script setup>
import radar from '../../../components/radar.vue'
import rightNav from '../../../components/rightNav.vue';
import articleList from '../../../components/articleList.vue';
import smallCard from '../../../components/smallCard.vue'
import { getCategoryPost, getCategoryList } from '@/utils/getCategoryInfo'

const route = useRoute()
let title = ref('')
// 类别列表
let categoryList = reactive([])

// 是否显示文章列表
let isShowArList = ref(false)
let showArList = (item) => {
    if (!item) {
        title.value = ''
    }
    isShowArList.value = item
}
// 具体分类文章列表
let categoryArList = reactive([])

// 点击具体分类
let toCategory = async (item) => {
    title.value = item
    categoryArList.splice(0, categoryArList.length)
    const postInfos = getCategoryPost(item)
    postInfos.forEach(item => {
        categoryArList.push(item.name)
    })
    showArList(true)
}
// 获取类别列表
let getCategory = async () => {
    categoryList.splice(0, categoryList.length)
    const infos = getCategoryList()
    infos.forEach(element => {
        categoryList.push(element.name)
    });
}
let categoryInfo = reactive([])
let getLength = () => {
    categoryInfo.splice(0, categoryInfo.length)
    const infos = getCategoryList()
    infos.forEach(item => {
        categoryInfo.push(item)
    })
}

let showRightNav = ref(true)

onMounted(async () => {

    if (document.body.clientWidth < 1000) {
        showRightNav.value = false
    }
    PubSub.subscribe('closeSide', () => {
        showRightNav.value = false
    })
    PubSub.subscribe('openSide', () => {
        showRightNav.value = true
    })
    await getCategory()
    getLength()
})

watch(() => route, (val) => {
    if (val.query?.name) {
        toCategory(val.query?.name)
    }
}, {
    deep: true,
    immediate: true
})

</script>

<style lang="less" scoped>
.categoryPage_container {
    @media screen and (min-width:300px) and (max-width:500px) {
        margin-top: 0;
    }

    margin-top: 25px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    .categoryPage {
        @media screen and (min-width:300px) and (max-width:600px) {
            padding: 0;
            width: 100%;
        }

        @media screen and (min-width:600px) and (max-width:1250px) {
            width: 80%;
        }

        @media screen and (min-width:1250px) {
            width: 55%;
        }

        padding:0 20px;
        position: relative;
        width: 60%;
        min-width: 375px;
        display: flex;
        flex-direction: column;

        .top {
            width: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding: 20px;
            align-items: center;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

            .title {
                @media screen and (min-width:300px) and (max-width:600px) {
                    font-size: 0.5rem;
                }

                font-size: 30px;
                margin: 0 0 30px 0;
            }

            .categoryCard {
                width: 100%;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
        }

        .radar {
            border-radius: 10px;

            @media screen and (min-width:300px) and (max-width:500px) {
                width: 375px;
            }

            width: 100%;
            display: flex;
            padding: 50px;
            justify-content: center;
            margin: 20px 0;
            background: rgba(255, 255, 255, 0.9);
        }

        .article_list_display {
            width: 100%;

            .over {
                @media screen and (min-width:300px) and (max-width:600px) {
                    width: 300px;
                }

                margin-left: 40px;
                margin-top: 40px;
                width: 100%;
                height: 120px;

                .title {
                    @media screen and (min-width:300px) and (max-width:600px) {
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
                    display: block;
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