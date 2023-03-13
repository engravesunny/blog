<template>
    <div class="card_container">
        <div class="top"></div>
        <div class="bottom">
            <div class="bTop">
                <div class="left">
                    <div class="title">文章标题</div>
                    <div class="publishTime iconfont">&#xe663;几月几日</div>
                </div>
                <div class="right">
                    <div class="category">分类</div>
                </div>
            </div>
            <div class="bBottom">
                <div class="tag">标签</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .card_container{
        margin: 10px;
        width: 100%;
        padding: 20px;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.7);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        transition: all 0.5s;
        .top{
            border-radius: 20px;
            width: 100%;
            height: 150px;
            background-image: url(https://pic.imgdb.cn/item/640b284df144a010072e04dd.jpg);
            background-size: 100%;
            background-position:center center;
            transition: all 0.5s;
        }
        .top:hover{
            background-size: 120%;
        }
        .bottom{
            width: 100%;
            height: 80px;
            // background-color: pink;
            .bTop{
                width: 100%;
                height: 60%;
                padding: 5px;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
                .left{
                    width: 65%;
                    float: left;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .title{
                        text-align: start;
                        font-size: 18px;
                        font-weight: 700;
                        width: 100%;
                        height: 60%;
                        // background-color: black;
                    }
                    .publishTime{
                        text-align: start;
                        height: 30%;
                        padding: 5px;
                        line-height: 10px;
                        font-size: 12px;
                        font-weight: 700;
                        color: gray;
                        // background-color: gray;
                    }
                }
                .right{
                    width: 30%;
                    float: right;
                    height: 100%;
                    .category{
                        line-height: 50px;
                        font-size: 16px;
                        width: 100%;
                        height: 100%;
                        padding: 5px;
                        // background-color: skyblue;
                    }
                }
            }
            .bBottom{
                height: 35%;
                width: 100%;
                padding: 5px;
                .tag{
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;
                    width: 60px;
                    height: 30px;
                    border-radius: 5px;
                    background-color: #000;
                    cursor: pointer;
                    transition: all 0.5s;
                }
                .tag:hover{
                    background-color: #fff;
                    color: #000;
                }
            }
        }
    }
    .card_container:hover{
        box-shadow: 5px 5px 20px 1px rgba(0, 0, 0, 0.2);
        transform: translate(0,-5%);
    }
</style>