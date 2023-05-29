<template>
    <div>
        <div class="container unselectable">
            <div class="Page" :style="{ width: `${defaultWidth}%` }">
                <div class="top box_border">
                    <!-- 分类标题 -->
                    <div class="title">
                        <h1>Post Archive</h1>
                    </div>
                    <div class="dateBox" v-loading="archiveLoading">
                        <archiveEcahrts v-if="!archiveLoading" :dateInfo="dateInfo"></archiveEcahrts>
                    </div>
                </div>
                <!-- 文章卡片列表 -->
                <div v-loading="postLoading" class="article_list_display">
                    <!-- 具体分类列表展示 -->
                    <div v-show="!postLoading" class="date_list box_border">
                        <div class="date_item" v-for="item in postInfo" :key="item.date">
                            <div class="date_title">
                                <h1>{{ item.date }}</h1>
                            </div>
                            <div class="card" v-for="(post, index) in item.posts" :key="post">
                                <midCard @loadFinish="loaded" :postName="post" :index="index"></midCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <rightNav v-if="showRightNav"></rightNav>
            <!-- <placeOrder v-if="showRightNav"><aceOrder> -->
        </div>
    </div>
</template>
  
<script setup>
import midCard from "../../../components/midCard.vue";
import archiveEcahrts from "./components/archiveEcahrts.vue";
import rightNav from "../../../components/rightNav.vue";
import { getDirNames } from "../../../api/postApi";
import { getArchivePosts } from "../../../utils/getArchiveInfo";

let showRightNav = ref(true);
let defaultWidth = ref(55);

const dateList = reactive([]);
const dateInfo = reactive([]);


const archiveLoading = ref(true);
const postLoading = ref(true)

const loaded = () => {
    console.log(1);
    postLoading.value = false
}

const getDateList = async () => {
    dateList.splice(0, dateList.length);
    const { data: dateListInfo } = await getDirNames({
        dir_path: "./posts/date",
    });
    dateListInfo.data.dir_names.forEach((item) => {
        dateList.push(item);
    });
};

const getArchivePost = async (date) => {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const posts = await getArchivePosts(year, month);
    return {
        date: date,
        value: posts.length,
    };
};

const postInfo = reactive([]);
const getPostInfo = async (date) => {
    const year = date.split("-")[0];
    const month = date.split("-")[1];
    const posts = await getArchivePosts(year, month);
    return {
        date: year + "." + month,
        posts: posts,
    };
};


const loadingArchiveInfo = async () => {
    const promises = dateList.map((item) => getArchivePost(item));
    for await (let res of promises) {
        dateInfo.push(res);
    }
    archiveLoading.value = false;
};

const loadingPostInfo = async () => {
    const promises = dateList.map((item) => getPostInfo(item));
    for await (let res of promises) {
        postInfo.unshift(res);
    }
    console.log(postInfo);
};

const init = async () => {
    await getDateList();
    await loadingArchiveInfo();
    await loadingPostInfo();
};

onBeforeMount(async () => {
    await init();
});

onMounted(() => {
    if (document.body.clientWidth < 1000) {
        defaultWidth.value = 80;
        showRightNav.value = false;
    }
    PubSub.subscribe("closeSide", () => {
        defaultWidth.value = 80;
        showRightNav.value = false;
    });
    PubSub.subscribe("openSide", () => {
        defaultWidth.value = 55;
        showRightNav.value = true;
    });
});
</script>

<style lang="less" scoped>
.container {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        margin-top: 5px;
    }

    margin-top: 25px;
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;

    .Page {
        @media screen and (min-width: 300px) and (max-width: 400px) {
            padding: 0px;
        }

        position: relative;
        width: 60%;
        min-width: 375px;
        min-height: 900px;
        display: flex;
        flex-direction: column;

        .top {
            width: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            padding: 10px;
            align-items: center;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
            min-height: 250px;

            .title {
                @media screen and (min-width: 300px) and (max-width: 400px) {
                    font-size: 20px;
                }

                font-size: 30px;
                margin: 0 0 30px 0;
            }

            .dateBox {
                width: 100%;
                min-height: 200px;
                border-radius: 10px;
                display: flex;
                justify-content: flex-start;
                overflow: hidden;
            }
        }

        .article_list_display {
            width: 100%;
            min-height: 200px;
            margin-top: 20px;
            border-radius: 10px;
            overflow: hidden;

            .date_list {
                padding: 20px;
                padding-top: 40px;
                padding-left: 30px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 10px;
                display: flex;
                justify-content: space-around;
                flex-direction: column;

                .date_item {
                    padding-top: 25px;
                    padding-bottom: 25px;
                    position: relative;
                    width: 100%;
                    border-left: var(--border-left);

                    .date_title {
                        padding-left: 20px;
                        position: absolute;
                        top: -15px;
                        left: 0;
                        font-style: italic;
                        color: #333;
                    }

                    .date_title::before {
                        content: "";
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        left: -7px;
                        top: 5px;
                        background-color: #fff;
                        border-radius: 50%;
                    }

                    .date_title::after {
                        content: "";
                        border: var(--box-border-active);
                        width: 10px;
                        height: 10px;
                        position: absolute;
                        border-radius: 50%;
                        left: -10px;
                        top: 2px;
                    }

                    .card {
                        position: relative;
                        margin: 20px 0;
                        width: 100%;
                        padding-left: 10px;
                    }

                    .card::after {
                        content: "";
                        border: var(--box-border-active);
                        width: 6px;
                        height: 6px;
                        position: absolute;
                        border-radius: 50%;
                        left: -8px;
                        top: 50%;
                        background-color: #fff;
                        transform: translateY(-100%);
                    }
                }
            }

            .date_list:hover {
                transition: all 0.5s;
                background-color: rgba(255, 255, 255, 0.9);
            }
        }
    }
}
</style>
