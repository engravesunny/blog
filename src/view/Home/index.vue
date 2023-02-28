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

        <!-- 个人描述等等 -->
        <!-- 个人描述等等 -->

        <!-- 文章分类，文章标签 -->
        <!-- 文章分类，文章标签 -->

        <!-- 最新文章展示 -->
        <!-- 最新文章展示 -->
    </div>
</template>

<style lang="less" scoped>

.home_container{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .top{
        width: 100vw;
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
}
</style>