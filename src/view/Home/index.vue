<template>
    <div class="home_container unselectable">
        <!-- 顶部标题壁纸展示 -->
        <div class="top" style="background-image:url(https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/kiana.png)">
            <video
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
            <div class="word" style="z-index:1">每日一言</div>
            <div class="btn">
                <div class="iconfont animate_flash" @click="explore">&#xe60c;</div>
            </div>
        </div>
        <!-- 顶部标题壁纸展示 -->

        <el-card class="main_container">
            <div class="main_position">
                <el-card class="main" style="width: 100%;" body-style="width:95%">
                    
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
                    <latestAr></latestAr>
                    <!-- 最新文章展示 -->

                    <input type="file" class="input" @change="upload($event)">
                    <button @click="delete1">删除</button>
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
    console.log(props.scroller);
    const scrollTop = parseFloat(props.scroller.$el.children[2].children[0].style.transform.split('(')[1]);
    const to = window.innerHeight
    let move = (scrollTop/100)*innerHeight
    console.log(move);
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
    console.log(e);
    console.log(e.target.files[0]);
    const file = e.target.files[0]

    const res = await uploads({
        dir_path:'./',
        file
    })
    console.log(res);
}

let delete1 = async() => {
    const res = await del({
        file_path:'./4a5b2f364f094c528987da529cda6611.jpg'
    })
    console.log(res);
}

onMounted(()=>{
    
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
    animation-duration: 2s;
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
        background-color: pink;
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
        }
        .word{
            font-size: 20px;
            height: 100px;
            line-height: 100px;
            color: #fff;
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
        border: none;
        border-radius: 0%;
        background: rgba(208, 142, 217, 0);
        text-align: center;
        display: flex;
        justify-content: center;
        .main_position{
            width: 75vw;
            .main{
                display: flex;
                flex-direction: column;
                min-width: 700px;
                justify-content: center;
                align-items: center;
                background: rgba(255,255, 255, 0.5);
                border-radius: 10px;
            }
        }
    }
}
</style>