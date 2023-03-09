<template>
    <div class="home_container unselectable">
        <!-- 顶部标题壁纸展示 -->
        <div class="top">
            <div class="title">致敬还在写博客的我们</div>
            <div class="btn">
                <el-button>EXPLORE</el-button>
            </div>
            <div class="word">每日一言</div>
        </div>
        <!-- 顶部标题壁纸展示 -->

        <el-card class="main_container">
            <div class="main_position">
                <el-card class="main" style="width: 100%;" body-style="width:95%">
                    
                    <!-- 个人描述等等 -->
                    <personnalAbout></personnalAbout>
                    <!-- 个人描述等等 -->

                    <!-- 文章分类，文章标签 -->
                    <div class="article">
                        <div class="title">
                            <div class="tag"></div>
                            <div class="category"></div>
                        </div>
                        <div class="display">
                            <div class="tag_art"></div>
                            <div class="category_art"></div>
                        </div>
                    </div>
                    <!-- 文章分类，文章标签 -->

                    <!-- 最新文章展示 -->
                    <div class="latestArt">

                    </div>
                    <!-- 最新文章展示 -->
                </el-card>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import personnalAbout from './components/personnalAbout.vue';
</script>

<style lang="less" scoped>

.home_container{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .top{
        width: 100vw;
        min-width: 930px;
        height: 100vh;
        background-color: pink;
        background-image: url(../../assets/img/风景1.jpg);
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .title{
            font-size: 50px;
            height: 200px;
            color: #fff;
        }
        .el-button{
            width: 200px;
            height: 70px;
            font-size: 20px;
            color: #fff;
            background: rgba(0, 0, 0, 0);
            border: 3px solid rgb(239, 124, 124);
            transition: all 0.5s;
        }
        .el-button:hover{
            background-color: rgb(239, 124, 124);
        }
        .word{
            font-size: 20px;
            height: 100px;
            line-height: 100px;
            color: #fff;
        }
    }
    .main_container{
        width: 100%;
        border: none;
        border-radius: 0%;
        background: rgba(208, 142, 217, 0.5);
        text-align: center;
        display: flex;
        justify-content: center;
        .main_position{
            width: 75vw;
            .main{
                display: flex;
                min-width: 700px;
                justify-content: center;
                align-items: flex-start;
                background: rgba(255,255, 255, 0.2);
            }
        }
    }
}
</style>