<template>
    <div v-animate="'animate_zoomIn'" class="card_container">
        <div class="top">
            <img loading="lazy" src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/18.jpg" alt="">
        </div>
        <div class="bottom">
            <div class="bTop">
                <div class="left">
                    <div class="title">文章标题</div>
                    <div class="publishTime iconfont">&#xe663;几月几日</div>
                </div>
                <div class="right">
                    <div class="category iconfont">&#xe811;分类</div>
                </div>
            </div>
            <div class="bBottom">
                <div class="tag iconfont">&#xe62f; 标签</div>
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .animate_zoomIn{
        animation: zoomIn; 
        animation-duration: 1s; 
    }
    .card_container{
        margin: 20px;
        width: 100%;
        padding: 20px;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        transition: all 0.5s;
        .top{
            position: relative;
            border-radius: 20px;
            width: 100%;
            height: 180px;
            text-align: center;
            transition: all 0.5s;
            overflow: hidden;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                transition: width 0.5s;
            }
            img:hover{
                width: 120%;
            }
        }
        .bottom{
            margin: 10px 0;
            width: 100%;
            height: 100px;
            // background-color: pink;
            .bTop{
                width: 100%;
                height: 60%;
                padding: 5px 10px;
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
                    text-align: center;
                    .category{
                        line-height: 50px;
                        font-size: 16px;
                        width: 100%;
                        height: 100%;
                        padding: 5px;
                        cursor: pointer;
                    }
                    .category:hover{
                        color: rgba(0, 0, 0, 0.7);
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