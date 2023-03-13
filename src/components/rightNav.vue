<template>
    <div class="rightNav">
        <el-scrollbar height="90vh">
            <aboutMe></aboutMe>
            <div class="icons">
                <iconsFriend></iconsFriend>
            </div>
            <div class="articleDir">
                <div class="title">文章目录</div>
                <div class="dir">
                    <ul><li></li></ul>
                </div>
            </div>
            <div class="articleDir">
                <div class="title">最新文章</div>
                <div class="dir">
                    <ul><li></li></ul>
                </div>
            </div>
            <div class="articleDir">
                <div class="title">公告</div>
                <div class="dir">
                    <ul><li></li></ul>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import aboutMe from './aboutMe.vue'
import iconsFriend from './iconsFriend.vue';

</script>

<style lang="less" scoped>
    .rightNav{
        position: fixed;
        top: 75px;
        right: 9vw;
        width: 20vw;
        height: 65vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 8px 8px 20px 1px rgba(0, 0, 0, 0.1);
        z-index: 1;
        .left{
            width: 100%;
            border-right: 0;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 25px;
            margin: 10px 0;
            margin-top: 0;
        }
        .icons{
            width: 100%;
            display:flex;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 25px;
            margin: 10px 0;
            padding: 10px;
        }
        .articleDir{
            margin: 10px 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 25px;
            .title{
                text-align: center;
                width: 100%;
                height: 50px;
                font-size: 20px;
                font-weight: 700;
            }
            .dir{
                width: 100%;
                height: 500px;
            }
        }
    }
</style>