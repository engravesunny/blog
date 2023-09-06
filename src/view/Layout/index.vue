<template>
    <div v-if="route.path !== '/photo'" height="100vh">
        <div class="layout_container">
            <!-- 顶部 -->
            <NavBar :color="color" :is-floded="isFloded" :is-opacity="isOpacity"></NavBar>
            <!-- 顶部 -->

            <!-- 内容区域 -->
            <router-view ref="scroller"></router-view>
            <!-- 内容区域 -->

            <!-- 底部 -->
            <FootBar></FootBar>
            <!-- 底部 -->
        </div>
        <div v-if="showToTop" @click="toTop" class="toTop iconfont unselectable">&#xe610;</div>

    </div>
    <div v-else class="layout_container photo-overflow">
        <!-- 顶部 -->
        <NavBar :is-floded="isFloded" :is-opacity="isOpacity"></NavBar>
        <!-- 顶部 -->

        <!-- 内容区域 -->
        <router-view></router-view>
        <!-- 内容区域 -->

        <!-- 底部 -->
        <FootBar></FootBar>
        <!-- 底部 -->
    </div>
    <!-- <div v-if="showToTop" @click="toTop" class="toTop iconfont unselectable">&#xe610;</div> -->
</template>

<script setup>
import NavBar from './components/NavBar/index.vue'
import FootBar from './components/FootBar/index.vue'
import { onMounted } from 'vue';
import PubSub from 'pubsub-js';
const route = useRoute()
// 滚动条
let scroller = ref(null)
let showToTop = ref(false)
// 顶部导航栏显示与隐藏及透明度变化
// 最开始不隐藏且透明
let color = ref('#fff')
let isFloded = ref(0)
let isOpacity = ref(0)
let curScrollY = ref(0)
let timer = null
// 控制顶部栏折叠函数
let topFlodFn = (e) => {
    if (!timer) {
        timer = setTimeout(() => {
            const el = document.documentElement
            if (el.scrollTop <= 100) {
                isOpacity.value = 0
                color.value = '#fff'
            } else {
                isOpacity.value = 9
                color.value = '#333'
            }
            if (el.scrollTop > curScrollY.value) {
                // 向下滚动，隐藏导航栏
                isFloded.value = 100
                curScrollY.value = el.scrollTop
                showToTop.value = false
            } else {
                // 向上滑，显示导航栏
                isFloded.value = 0
                curScrollY.value = el.scrollTop
                showToTop.value = true
            }
            timer = null;
        }, 100);
    }
}

let toTop = () => {
    window.scrollTo(0, 0)
}

onMounted(() => {
    PubSub.subscribe('toTop', () => {
        toTop()
    })
    document.addEventListener('mousewheel', topFlodFn);
})

</script>

<style lang="less" scoped>
.photo-overflow {
    overflow: hidden;
}

.layout_container {
    padding-top: 55px;
    box-sizing: border-box;
    width: 100%;
    height: 100vh
}

.toTop {
    @media screen and (min-width:300px) and (max-width:600px) {
        font-size: 20px;
        padding: 7px;
        border-radius: 5px;
    }

    position: fixed;
    bottom: 10px;
    right: 10px;
    padding: 10px;
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    font-size: 30px;
    font-weight: 900;
    box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
    transition: all 0.5s;
}

.toTop:hover {
    box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
    transform: translate(0, -3px);
}
</style>
