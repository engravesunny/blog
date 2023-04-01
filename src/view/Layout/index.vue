<template>
<el-scrollbar ref="scroller" height="100vh" @scroll="topFlodFn">
    <div class="layout_container">
        <!-- 顶部 -->
        <NavBar :is-floded="isFloded" :is-opacity="isOpacity"></NavBar>
        <!-- 顶部 -->

        <!-- 内容区域 -->
        <router-view :scroller="scroller"></router-view>
        <!-- 内容区域 -->

        <!-- 底部 -->
        <FootBar></FootBar>
        <!-- 底部 -->
    </div>

</el-scrollbar>
</template>

<script setup>
import NavBar from './components/NavBar/index.vue'
import FootBar from './components/FootBar/index.vue'
import PubSub from 'pubsub-js'
// 滚动条
let scroller = ref(null)

// 顶部导航栏显示与隐藏及透明度变化
// 最开始不隐藏且透明
let isFloded = ref(0)
let isOpacity = ref(0)
let curScrollY = ref(0)
let timer = null
// 控制顶部栏折叠函数
let topFlodFn = (e) => {
    if (!timer) {
        timer = setTimeout(() => {
            if(e.scrollTop > curScrollY.value){
                // 向下滚动，隐藏导航栏
                isFloded.value = 100
                curScrollY.value = e.scrollTop
            } else {
                // 向上滑，显示导航栏
                isFloded.value = 0
                curScrollY.value = e.scrollTop
            }
            timer = null;
        }, 100);
    }
    if(e.scrollTop === 0){
        isOpacity.value = 0
    } else {
        isOpacity.value = 3
    }
}

onMounted(()=>{
    
})

</script>

<style lang="less" scoped>

.layout_container{
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
}
    
</style>
