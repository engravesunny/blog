<template>
    <div>
        <div class="container unselectable">
            <div class="Page" :style="{ width: `${defaultWidth}%` }">
                <div class="top box_border">
                    <!-- 分类标题 -->
                    <div class="title">
                        <h1>Post Archive</h1>
                    </div>
                    <div class="dateBox" v-loading="!dateInfo.length">
                        <archiveEcahrts v-if="dateInfo.length" :dateInfo="dateInfo"></archiveEcahrts>
                    </div>
                </div>
                <!-- 文章卡片列表 -->
                <div v-if="true" class="article_list_display">
                    <!-- 具体分类列表展示 -->
                    <div class="article_list box_border">
                        <midCard></midCard>
                        <midCard></midCard>
                    </div>
                </div>

            </div>
            <rightNav v-if="showRightNav"></rightNav>
            <!-- <placeOrder v-if="showRightNav"></placeOrder> -->
        </div>
    </div>
</template>

<script setup>
import midCard from '../../../components/midCard.vue';
import archiveEcahrts from './components/archiveEcahrts.vue';
import rightNav from '../../../components/rightNav.vue';
import { getDirNames } from '../../../api/postApi';
import { getArchivePosts } from '../../../utils/getArchiveInfo'

let showRightNav = ref(true)
let defaultWidth = ref(55)

const dateList = reactive([])
const dateInfo = reactive([])

const getDateList = async () => {
    dateList.splice(0, dateList.length)
    const { data: dateListInfo } = await getDirNames({
        dir_path: './posts/date'
    })
    dateListInfo.data.dir_names.forEach(item => {
        dateList.push(item);
    })
}

onBeforeMount(async () => {
    await getDateList()
    dateList.map(async item => {
        const year = item.split('-')[0]
        const month = item.split('-')[1]
        const posts = await getArchivePosts(year, month)
        dateInfo.push({
            date: item,
            value: posts.length
        })
    })
})

onMounted(() => {
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
            padding: 0px;
        }

        padding: 20px;
        position: relative;
        border-radius: 10px;
        border: 1px solid #fff;
        width: 60%;
        min-width: 375px;
        min-height: 900px;
        background: rgba(255, 255, 255, 0.5);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
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

            .title {
                @media screen and (min-width:300px) and (max-width:400px) {
                    font-size: 20px;
                }

                font-size: 30px;
                margin: 0 0 30px 0;
            }

            .dateBox {
                width: 100%;
                min-height: 100px;
                border-radius: 10px;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
            }
        }

        .article_list_display {
            width: 100%;

            .over {
                margin-left: 40px;
                margin-top: 40px;
                width: 100%;
                height: 60px;

                .title {
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
                padding: 20px;
                width: 100%;
                background-color: rgba(255, 255, 255, 0.5);
                border-radius: 10px;
                display: flex;
                justify-content: space-around;
            }
        }
    }
}
</style>