<template>
<el-scrollbar height="100vh">
    <div class="layout_container">
        <!-- 顶部 -->
        <NavBar></NavBar>
        <!-- 顶部 -->

        <!-- 内容区域 -->
        <router-view></router-view>
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
</script>

<style lang="less" scoped>

.layout_container{
    box-sizing: border-box;
    width: 100%;
    height: 100vh;
}
    
</style>
