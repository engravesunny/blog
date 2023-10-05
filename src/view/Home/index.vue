<template>
    <div class="home_container unselectable">
        <!-- 顶部标题壁纸展示 -->
        <!-- <div class="top" ref="topDom">
            <div class="title" style="z-index:1" @click="test">KeCatCat</div>
            <div class="word" style="z-index:1">
                {{ text }} <span v-if="isShowFlash" class="flash animate_flash_fast"></span>
            </div>
            <div class="btn">
                <div class="iconfont animate_flash" @click="explore">&#xe60c;</div>
            </div>
            <wave></wave>
        </div> -->
        <!-- 顶部标题壁纸展示 -->
        <el-card class="main_container" :body-style="{ padding: '70px 0' }">
            <div class="main_position">
                <div class="left" :style="{ width: `${leftSize}%` }">
                    <div class="leftTitle">
                        <textBox :author="textBoxContent.author" :text="textBoxContent.text"></textBox>
                    </div>
                    <left-list></left-list>
                </div>
                <div v-if="showRightSideBar" class="right" body-style="padding:0;">

                    <!-- 个人描述等等 -->
                    <personnalAbout></personnalAbout>
                    <!-- 个人描述等等 -->

                    <!-- 认识我 -->
                    <friendMe></friendMe>
                    <!-- 认识我 -->

                    <!-- 文章分类，文章标签 -->
                    <articleDisplay></articleDisplay>
                    <!-- 文章分类，文章标签 -->

                    <!-- 最新文章展示 -->
                    <latestAr :arList="rightArList"></latestAr>
                    <!-- 最新文章展示 -->
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import leftList from './components/leftList.vue'
import textBox from './components/textBox.vue'
import figlet from 'figlet'
import standard from 'figlet/importable-fonts/Standard.js'
import PubSub from 'pubsub-js'
import personnalAbout from './components/personnalAbout.vue';
import friendMe from './components/friendMe.vue';
import articleDisplay from './components/article.vue';
import latestAr from './components/latestAr.vue';
import getWord from '@/api/randomWord.js'
import { getLatestPostInfo } from '../../utils/latestPosts';


// 每日一言后闪烁条
let isShowFlash = ref(true)

// 左侧文章卡片列表
let leftArList = reactive([])

// 右侧文章卡片列表
let rightArList = reactive([])

// 是否显示右侧栏
let showRightSideBar = ref(false)
// 首页左侧文章卡片区域所占比例
let leftSize = ref(75)
// 首页文章卡片所占比例
let arCardSize = ref(33)

// topDom
const topDom = ref(null);

// 展示首页视频
let isShowVideo = ref(false)
let showVideo = () => {
    isShowVideo.value = true
}

const props = defineProps({
    scroller: {
        type: Object,
        default: {}
    }
})


// 首页上方向下箭头功能
const explore = () => {
    const scrollTop = parseFloat(document.documentElement.scrollTop);
    const to = window.innerHeight
    let move = (scrollTop / 100) * innerHeight
    const increment = to / 100
    const timer = setInterval(() => {
        document.documentElement.scrollTop = move;
        move += increment
        if (move >= to) {
            clearInterval(timer)
        }
    }, 3)
}

// 滚动指定距离有过程
const scrollTo = (toThere) => {
    const scrollTop = parseFloat(document.documentElement.scrollTop);
    let move = (scrollTop / 100) * window.innerHeight
    const increment = Math.abs(toThere - move) / 25
    const timer = setInterval(() => {
        if (move < toThere) {
            document.documentElement.scrollTop = move;
            move += increment
            if (move >= toThere) {
                clearInterval(timer)
            }
        } else {
            document.documentElement.scrollTop = move;
            move -= increment
            if (move <= toThere) {
                clearInterval(timer)
            }
        }
    }, 20)
}

// 滚动到指定位置无过程
const scrollToFast = (toThere) => {
    document.documentElement.scrollTop = toThere;
}
// 每日一言文字
let word = ref('')
let text = ref('')
let textBoxContent = ref({
    text: '',
    author: ''
})
// 获取每日一言
const getwords = async () => {
    const { data } = await getWord()
    word.value = data.hitokoto + ' ' + '——' + data.from
    textBoxContent.value = {
        text: data.hitokoto,
        author: data.from
    }
}

let getPosts = async () => {
    // 获取文章
    leftArList.splice(0, leftArList.length)
    rightArList.splice(0, rightArList.length)
    const latestPostInfo = await getLatestPostInfo()
    latestPostInfo.map(item => {
        leftArList.push(item)
    })
    for (let i = 0; i < 5; i++) {
        rightArList.push(latestPostInfo[i])
    }
}
// 页面大小改变函数
const changeSizes = (size) => {
    if (size <= 1500) {
        arCardSize.value = 48
        if (size <= 1100) {
            showRightSideBar.value = false
            leftSize.value = 99
            if (size <= 840) {
                arCardSize.value = 99
            } else {
                arCardSize.value = 48
            }
        } else {
            showRightSideBar.value = true
            leftSize.value = 75
        }
    } else {
        leftSize.value = 75
        showRightSideBar.value = true
        arCardSize.value = 33
    }
}
// figlet初始化
const figLetInit = () => {
    figlet.parseFont("Standard", standard);

    figlet.text(
        "KeMaoMao",
        {
            font: "Standard",
        },
        function (err, data) {
            console.log('\x1b[35;40m%s\x1b[0m', data);
        }
    );
}
// 每日一言初始化
const topWordInit = async () => {
    await getwords();
    let i = 0;
    const timer = setInterval(() => {
        i++;
        text.value = word.value.slice(0, i)
        if (text.value === word.value) {
            isShowFlash.value = false
            clearInterval(timer)
        }
    }, 200);
}
// 窗口监听
const listenWindowChange = () => {
    let mountedSize = document.body.clientWidth
    changeSizes(mountedSize)
    // 网页大小改变时监听
    PubSub.subscribe('homeSizeChange', (a, size) => {
        changeSizes(size)
    })
    PubSub.subscribe('scrollTo', (a, top) => {
        scrollTo(top);
    })
    PubSub.subscribe('scrollToFast', (a, to) => {
        scrollToFast(to);
    })
}



onMounted(async () => {
    figLetInit();
    await topWordInit();
    listenWindowChange();
    await getPosts();
})

</script>

<style lang="less" scoped>
.input {
    width: 200px;
    height: 100px;
    background-color: #000;
}

.animate_flash {
    animation: flash;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}

.animate_fadeIn {
    animation: fadeIn;
    animation-duration: 1s;
}

.animate_flash_fast {
    animation: flash;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
}

.home_container {
    margin-top: -55px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    .top {
        position: relative;
        width: 100vw;
        min-width: 375px;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .title {
            text-shadow: 1px 1px 3px rgb(255 255 255 / 30%);
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 40px;
            color: #ffffff;
            font-weight: 700;
            line-height: 1.5;
        }

        .word {
            @media screen and (min-width:300px) and (max-width:600px) {
                padding: 10px;
                text-align: center;
                margin-top: 10px;
                line-height: 50px;
                font-size: 16px;
            }

            position: relative;
            font-size: 20px;
            height: 100px;
            line-height: 100px;
            color: #fff;
            text-shadow: 2px 2px 4px rgb(0 0 0 / 15%);

            .flash {
                @media screen and (min-width:300px) and (max-width:600px) {
                    top: 24px;
                }

                position: absolute;
                top: 42px;
                right: -5px;
                display: inline-block;
                width: 2px;
                height: 20px;
                background-color: #ffffff;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            }
        }

        .btn {
            position: absolute;
            bottom: 55px;

            .iconfont {
                color: #fff;
                font-size: 60px;
                font-weight: 700;
                cursor: pointer;
                z-index: 1;
                text-shadow: 2px 2px 4px rgb(0 0 0 / 15%);
            }
        }

    }

    .top::before {
        content: '';
        position: absolute;
        top: 0;
        width: 100%;
        height: 100vh;
        filter: blur(3px);
        animation: animate_blur;
        animation-duration: 0.5s;
        background-image: url(https://www.kecat.top/post/55min.webp);
        background-size: cover;
        background-position: center 10;
        background-attachment: fixed;
    }

    .main_container {
        width: 100%;
        background: rgba(0, 0, 0, 0);
        text-align: center;
        display: flex;
        justify-content: center;
        border: none;
        box-shadow: none;

        .main_position {
            @media screen and (min-width:300px) and (max-width:1000px) {
                width: 100vw;
                align-items: center;
                justify-content: center;
            }

            width: 90vw;
            display: flex;
            align-items: flex-start;

            .left {

                @media screen and (min-width:300px) and (max-width:600px) {
                    padding: 0;
                }

                width: 75%;
                display: flex;
                flex-direction: column;
                padding: 0 20px;


                .leftTitle {
                    width: 100%;
                    background-color: var(--background-transparent);
                    padding: 5px 10px;
                    margin-bottom: 10px;
                    border-radius: 10px;
                }
            }

            .right {
                width: 25%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: rgba(0, 0, 0, 0);
                border: none;
                border-radius: 0;
                overflow: visible;
                box-shadow: none;
            }
        }
    }
}
</style>