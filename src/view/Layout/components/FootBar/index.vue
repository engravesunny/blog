<template>
    <div class="footBar_container">
        <div class="top">
            <div class="left">
                <div class="title shenglue">刻猫猫的笔记本</div>
            </div>
            <div class="right">
                <div class="item kecat  shenglue"><a target="_blank" href="http://kecat.top/">KECAT.TOP</a></div>
                <div class="item qq shenglue"><a target="_blank"
                        href="http://wpa.qq.com/msgrd?v=3&uin=3170557037&site=qq&menu=yes">QQ:3170557037</a></div>
                <div class="item email shenglue"><a href="https://outlook.live.com/">hutao-keqing@outlook.com</a></div>
            </div>
        </div>
        <div class="bottom">
            <div class="mes1">Copyright © 2023 刻猫猫的笔记本</div>
            <div class="mes2">
                <img src="../../../../assets/img/icp.webp" alt="">
                <a href="https://beian.miit.gov.cn/" _blank>鲁ICP备2023003074号</a>
            </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.footBar_container {
    @media screen and (min-width:300px) and (max-width:500px) {
        height: 120px;
    }

    margin-top: 15px;
    width: 100%;
    height: 252px;
    background-color: rgba(0, 0, 0, 0.801);
    display: flex;
    flex-direction: column;

    .top {
        @media screen and (min-width:300px) and (max-width:500px) {
            height: 60px;
        }

        width: 100%;
        height: 150px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);

        .left {
            @media screen and (min-width:300px) and (max-width:500px) {
                line-height: 60px;
            }

            float: left;
            width: 30%;
            height: 100%;
            border-right: 1px solid rgba(255, 255, 255, 0.5);
            text-align: center;
            line-height: 150px;

            .title {
                @media screen and (min-width:300px) and (max-width:500px) {
                    font-size: 14px;
                }

                font-size: 25px;
                color: rgba(255, 255, 255, 0.7);
            }
        }

        .right {
            width: 65%;
            height: 100%;
            float: right;
            display: flex;
            justify-content: space-around;
            align-items: center;

            .kecat {
                @media screen and (min-width:300px) and (max-width:500px) {
                    display: none;
                }
            }

            .qq {
                @media screen and (min-width:300px) and (max-width:500px) {
                    font-size: 16px;
                }
            }

            .email {
                @media screen and (min-width:300px) and (max-width:500px) {
                    display: none;
                }
            }

            .item {
                @media screen and (min-width:300px) and (max-width:500px) {
                    font-size: 16px;
                }

                font-size: 20px;
                color: rgba(255, 255, 255, 0.9);

                a {
                    color: rgba(255, 255, 255, 0.9);
                }
            }
        }
    }

    .bottom {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        color: rgba(255, 255, 255, 0.7);

        .mes1 {
            font-size: 14px;
        }

        .mes2 {
            img {
                width: 14px;
                margin-top: 2px;
                margin-right: 2px;
                vertical-align: middle;
            }

            cursor: pointer;
            color: rgba(255, 255, 255, 0.7);

            a {
                color: rgba(255, 255, 255, 0.7);
                font-size: 12px;
            }
        }

        a:hover {
            color: rgba(255, 255, 255, 0.3);
        }
    }
}
</style>