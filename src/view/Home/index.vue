<template>
    <div class="home_container unselectable">
        <!-- 顶部标题壁纸展示 -->
        <div class="top" style="background-image:url(https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/kiana.png)">
            <video
            @contextmenu.prevent=""
            class="animate_fadeIn"
            v-show="isShowVideo"
            autoplay 
            loop 
            muted 
            playsinline 
            webkit-playsinline 
            src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.2/video/kiana2.mp4"
            style="position:absolute;width:100%;height:100%;z-index:0;object-fit:cover;"
            @loadeddata="showVideo"
            ></video>
            <div class="title" style="z-index:1" @click="test">KeCatCat</div>
            <div class="word" style="z-index:1">
                {{text}} <span v-if="isShowFlash" class="flash animate_flash_fast"></span>
                </div>
            <div class="btn">
                <div class="iconfont animate_flash" @click="explore">&#xe60c;</div>
            </div>
        </div>
        <!-- 顶部标题壁纸展示 -->

        <el-card class="main_container">
            <div class="main_position">
                <el-card class="left"></el-card>
                <el-card class="right" body-style="padding:0;">

                    <!-- 个人描述等等 -->
                    <personnalAbout v-animate="'animate_fadeIn'"></personnalAbout>
                    <!-- 个人描述等等 -->

                    <!-- 认识我 -->
                    <friendMe v-animate="'animate_fadeIn'"></friendMe>
                    <!-- 认识我 -->

                    <!-- 文章分类，文章标签 -->
                    <articleDisplay v-animate="'animate_fadeIn'"></articleDisplay>
                    <!-- 文章分类，文章标签 -->

                    <!-- 最新文章展示 -->
                    <latestAr v-animate="'animate_fadeIn'"></latestAr>
                    <!-- 最新文章展示 -->
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { uploads,del } from '@/api/upload.js'
import personnalAbout from './components/personnalAbout.vue';
import friendMe from './components/friendMe.vue';
import articleDisplay from './components/article.vue';
import latestAr from './components/latestAr.vue';
import getWord from '@/api/randomWord.js'

let isShowFlash = ref(true)

// 展示首页视频
let isShowVideo = ref(false)
let showVideo = () => {
    isShowVideo.value = true
}

const props = defineProps({
    scroller:{
        type:Object,
        default:{}
    }
})

const explore = () => {
    const scrollTop = parseFloat(props.scroller.$el.children[2].children[0].style.transform.split('(')[1]);
    const to = window.innerHeight
    let move = (scrollTop/100)*innerHeight
    const increment = to / 100
    const timer = setInterval(()=>{
        props.scroller.setScrollTop(move)
        move += increment
        if (move >= to) {
            clearInterval(timer)
        }
    }, 3)
}


let upload = async(e) => {
    const file = e.target.files[0]

    const res = await uploads({
        dir_path:'./',
        file
    })
}

let delete1 = async() => {
    const res = await del({
        file_path:'./4a5b2f364f094c528987da529cda6611.jpg'
    })
}

let word = ref('')
let text = ref('')

const getwords = async() => {
    const {data} = await getWord()
    word.value = data.hitokoto + ' ' + '——' +  data.from
}

onMounted(async()=>{
    await getwords()
    let i = 0
    const timer = setInterval(() => {
        i++;
        text.value = word.value.slice(0,i)
        if(text.value === word.value){
            isShowFlash.value = false
            clearInterval(timer)
        }
    }, 200);

})

</script>

<style lang="less" scoped>

.input{
    width: 200px;
    height: 100px;
    background-color: #000;
}
.animate_flash{
    animation: flash;
    animation-duration: 4s;
    animation-iteration-count: infinite;
}
.animate_fadeIn{
    animation: fadeIn;
    animation-duration: 0.5s;
}
.animate_flash_fast{
    animation: flash;
    animation-duration: 1.2s;
    animation-iteration-count: infinite;
}

.home_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .top{
        position: relative;
        width: 100vw;
        min-width: 930px;
        height: 100vh;
        background-size: cover;
        background-position: center center;
        background-attachment: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
            font-size: 40px;
            color: #ffffff;
            font-weight: 700;
        }
        .word{
            position: relative;
            font-size: 20px;
            height: 100px;
            line-height: 100px;
            color: #fff;
            text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
            .flash{
                position: absolute;
                top: 42px;
                right:-5px;
                display: inline-block;
                width: 2px;
                height: 20px;
                background-color: #ffffff;
                box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
            }
        }
        .btn{
            position: absolute;
            bottom: 10px;
            .iconfont{
                color: #fff;
                font-size: 60px;
                font-weight: 700;
                cursor: pointer;
                z-index: 1;
                text-shadow: 2px 2px 4px rgb(0 0 0 / 15%);
            }
        }
    }
    .main_container{
        width: 100%;
        background: rgba(0, 0, 0, 0);
        text-align: center;
        display: flex;
        justify-content: center;
        border: none;
        box-shadow: none;
        .main_position{
            width: 80vw;
            display: flex;
            .left{
                flex: 1;
                background: rgba(0, 0, 0, 0);
                border: none;
                box-shadow: none;
            }
            .right{
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