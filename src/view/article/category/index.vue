<template>
    <div class="categoryPage_container unselectable">
        <div class="categoryPage" :style="{ width: `${defaultWidth}%` }">
            <div class="top box_border">
                <!-- 分类标题 -->
                <div class="title">
                    <h1>Post Categories</h1>
                </div>
                <div class="categoryCard">
                    <smallCard @click="toCategory(item)" v-for="item in categoryList" :active="item === title" :key="item"
                        :name="item" />
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
                <radar :categoryList="categoryList" :categoryLength="categoryLength"></radar>
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
import placeOrder from '../article/components/placeOrder.vue'
import smallCard from '../../../components/smallCard.vue'
import { getDirNames } from '../../../api/postApi.js'

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
    const { data } = await getDirNames({
        dir_path: "./posts/category/" + item
    })
    data?.data?.dir_names?.forEach(element => {
        categoryArList.push(element)
    });
    showArList(true)
}

// 获取类别列表
let getCategory = async () => {
    categoryList.splice(0, categoryList.length)
    const { data } = await getDirNames({
        dir_path: "./posts/category"
    })
    data?.data?.dir_names?.forEach(element => {
        categoryList.push(element)
    });
}

let categoryLength = reactive([])

let getLength = () => {
    categoryLength.splice(0, categoryLength.length)
    categoryList.forEach(async item => {
        const { data: len } = await getDirNames({
            dir_path: './posts/category/' + item
        })
        categoryLength.push({
            name: item,
            value: len.data.dir_names.length
        })
    })
}

let showRightNav = ref(true)

let defaultWidth = ref(55)

onMounted(async () => {
    if (document.body.clientWidth < 1000) {
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
    await getCategory()
    await getLength()
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
    @media screen and (min-width:300px) and (max-width:400px) {
        margin-top: 0;
    }

    margin-top: 25px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    .categoryPage {
        @media screen and (min-width:300px) and (max-width:400px) {
            padding: 0;
        }

        padding: 20px;
        position: relative;
        border-radius: 10px;
        border: 1px solid #fff;
        width: 60%;
        min-width: 375px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
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
                @media screen and (min-width:300px) and (max-width:400px) {
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

            @media screen and (min-width:300px) and (max-width:400px) {
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
                @media screen and (min-width:300px) and (max-width:400px) {
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
                margin-top: 20px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 10px;
            }
        }
    }
}
</style>