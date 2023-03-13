<template>
    <div class="left">
        <div class="avatar">
            <img src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/avatar.jpg" alt="">
        </div>
        <div class="nav">
            <div class="article">
                <div>文章</div>
                <div>12</div>
            </div>
            <div class="tag">
                <div>标签</div>
                <div>12</div>
            </div>
            <div class="category">
                <div>分类</div>
                <div>12</div>
            </div>
        </div>
        <div class="btn">
            <a href="https://github.com/engravesunny?tab=repositories" target="_blank">
                <el-button type="primary" class="button">
                    GITHUB
                </el-button>
            </a>
        </div>
    </div>
</template>

<style lang="less" scoped>
.left{
    float: left;
    width: 24%;
    background-color: rgba(0, 0, 0, 0);
    // background-color: #fff;
    padding-right: 10px;
    border-right: 2px solid rgba(0, 0, 0, 0.5);
    .avatar{
    width: 100%;
    height: 120px;
    line-height: 120px;
    text-align: center;
    // background-color: skyblue;
        img{
            width: 100px;
            height: 100px;
            border-radius: 50%;
        }
    }
    .nav{
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;
        // background-color: pink;
        .article,.category{
            text-align: center;
            margin:0 15px;
            font-size: 16px;
        }
        .tag{
            text-align: center;
            border-left: 1px solid #000;
            border-right: 1px solid #000;
            padding:0 15px;
            font-size: 16px;
        }
    }
    .btn{
        text-align: center;
        margin: 10px 0;
        width: 100%;
        height: 40px;
        // background-color: rgb(238, 138, 138);
        .button{
            font-size: 16px;
            border-radius: 20px;
            font-weight: 700;
            border: none;
            width: 80%;
            height: 100%;
            a{
                color: #fff;
            }
        }
    }
}

    
</style>