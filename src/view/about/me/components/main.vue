<template>
    <div v-if="!showWitch" class="stack">
        <div class="top animate_down">
            <div class="title">技术栈</div>
        </div>
        <div class="main">
            <div class="left animate_left">
                <p>
                    1.精通使用<span class="strong">H5+CSS3</span>对页面进行布局(成功的页面仔)
                </p>
                <p>
                    2.熟悉使用原生 <span class="strong">JavaScript</span> 、<span class="strong">ES6</span>、<span
                        class="strong">Ajax</span>、
                    <span class="strong">Node.js</span>，熟练使用<span class="strong">axios</span>、熟悉<span
                        class="strong">Promise</span>
                </p>
                <p>
                    3.熟练使用<span class="strong">Vue全家桶</span>及其周边生态进行搭建项目，有相关项目经验，了解
                    <span class="strong">React</span> 语法，了解<span class="strong">redux</span>
                </p>
                <p>
                    4.熟练使用 <span class="strong"> Element-plus、Vant</span> 等组件库
                </p>
                <p>
                    5.熟悉
                    <span class="strong">Webpack、Vite、Rollup、esbuild</span>
                    等等打包工具
                </p>
                <p>6.熟练编写前端标准代码，熟悉浏览器兼容问题解决(IE10以下另当别论)</p>
                <p>7.熟悉 <span class="strong">git操作</span> ，有团队合作经验</p>
            </div>
            <div class="right animate_right">
                <img src="https://bu.dusays.com/2023/04/09/643291fe62647.jpg" alt="" />
            </div>
        </div>
        <div class="about">
            <div class="top animate_down">
                <div class="title">我的人格</div>
            </div>
            <div class="main">
                <div class="left animate_left">
                    <img src="https://www.16personalities.com/static/images/personality-types/headers/diplomats_Advocate_INFJ_personality_header.svg"
                        alt="提倡者">
                </div>
                <div class="right animate_right">
                    <div class="text">
                        <div class="title">性格</div>
                        <div class="name">提倡者</div>
                        <div class="en_name">INFJ-A / INFJ-T</div>
                    </div>
                    <img src="https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/d063646e97392638e07da24ce6b8c3cb_3567507076955258130.png"
                        alt="刻晴">
                    <div class="link">
                        在 <span><a href="https://www.16personalities.com/" target="_blank">16personalities</a></span> 了解更多关于
                        <span><a href="https://www.16personalities.com/ch/infj-%E4%BA%BA%E6%A0%BC"
                                target="_blank">提倡者</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="showWitch" class="mobile">
        <div class="top animate_down">
            <div class="title">技术栈</div>
        </div>
        <div class="main">
            <div class="right animate_right">
                <img src="https://bu.dusays.com/2023/04/09/643291fe62647.jpg" alt="" />
            </div>
            <div class="left animate_left">
                <p>
                    1.精通使用<span class="strong">H5+CSS3</span>对页面进行布局(成功的页面仔)
                </p>
                <p>
                    2.熟悉使用原生 <span class="strong">JavaScript</span> 、<span class="strong">ES6</span>、<span
                        class="strong">Ajax</span>、
                    <span class="strong">Node.js</span>，熟练使用<span class="strong">axios</span>、熟悉<span
                        class="strong">Promise</span>
                </p>
                <p>
                    3.熟练使用<span class="strong">Vue全家桶</span>及其周边生态进行搭建项目，有相关项目经验，了解
                    <span class="strong">React</span> 语法，了解<span class="strong">redux</span>
                </p>
                <p>
                    4.熟练使用 <span class="strong"> Element-plus、Vant</span> 等组件库
                </p>
                <p>
                    5.熟悉
                    <span class="strong">Webpack、Vite、Rollup、esbuild</span>
                    等等打包工具
                </p>
                <p>6.熟练编写前端标准代码，熟悉浏览器兼容问题解决(IE10以下另当别论)</p>
                <p>7.熟悉 <span class="strong">git操作</span> ，有团队合作经验</p>
            </div>
        </div>
        <div class="about">
            <div class="top animate_down">
                <div class="title">我的人格</div>
            </div>
            <div class="main">
                <div class="left animate_left">
                    <img src="https://www.16personalities.com/static/images/personality-types/headers/diplomats_Advocate_INFJ_personality_header.svg"
                        alt="提倡者">
                </div>
                <div class="right animate_right">
                    <div class="text">
                        <div class="title">性格</div>
                        <div class="name">提倡者</div>
                        <div class="en_name">INFJ-A / INFJ-T</div>
                    </div>
                    <img src="https://webstatic.mihoyo.com/upload/contentweb/2022/07/04/d063646e97392638e07da24ce6b8c3cb_3567507076955258130.png"
                        alt="刻晴">
                    <div class="link">
                        在 <span><a href="https://www.16personalities.com/" target="_blank">16personalities</a></span>
                        了解更多关于
                        <span><a href="https://www.16personalities.com/ch/infj-%E4%BA%BA%E6%A0%BC"
                                target="_blank">提倡者</a></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script setup>

const showWitch = ref(false)

onMounted(() => {
    showWitch.value = window.innerWidth < 400
})

</script>

<style lang="less" scoped>
.animate_down {
    animation: fadeInDown;
    animation-duration: 0.5s;
}

.animate_left {
    animation: fadeInLeft;
    animation-duration: 0.5s;
}

.animate_right {
    animation: fadeInRight;
    animation-duration: 0.5s;
}

.stack,
.mobile {

    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 10px 10px;

    .top {
        width: 100%;
        height: 10%;
        padding: 5px 10px;
        border-radius: 10px;
        display: flex;
        align-items: center;

        .title {
            font-size: 30px;
        }
    }

    .main {

        font-size: 16px;
        font-weight: 100;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .left {

            padding: 20px;
            width: 68%;
            height: 100%;
            display: flex;
            flex-direction: column;
            border-radius: 10px;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);

            p {
                line-height: 25px;

                .strong {
                    padding: 1px 3px;
                    border-radius: 5px;
                    background-color: rgb(97, 197, 255);
                }
            }
        }

        .right {
            width: 30%;
            box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
            border-radius: 10px;
            overflow: hidden;
            position: relative;

            img {
                position: absolute;
                top: 0;
                left: 50%;
                height: 100%;
                transform: translate(-50%);
                object-fit: cover;
                transition: transform 0.5s;
            }

            img:hover {
                transform: scale(1.1) translate(-45%);
            }
        }
    }

    .about {
        margin-top: 10px;
        width: 100%;
        flex: 1;
        border-radius: 10px;
        display: flex;
        flex-direction: column;

        .top {
            width: 100%;
            padding: 20px 0 35px 0;

            .title {
                font-size: 30px;
            }
        }

        .main {
            width: 100%;
            flex: 1;
            display: flex;
            justify-content: space-between;

            .left {
                position: relative;
                width: 30%;
                padding: 0;
                overflow: hidden;

                img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    transform: translate(-40%);
                    height: 100%;
                    transition: transform 0.5s;
                }

                img:hover {
                    transform: scale(1.05) translate(-50%);
                }
            }

            .right {
                box-sizing: border-box;
                position: relative;
                width: 68%;
                background: linear-gradient(100deg, rgba(236, 16, 214, 0.6) 40%, rgba(43, 156, 236, 0.8) 60%);

                img {
                    position: absolute;
                    top: unset;
                    left: unset;
                    right: -10%;
                    bottom: 20px;
                    height: 80%;
                    transform: unset;
                    transition: transform 1s;
                }

                .text {
                    position: absolute;
                    top: 20px;
                    left: 20px;
                    display: flex;
                    flex-direction: column;
                    line-height: 30px;

                    .title {
                        font-size: 16px;
                    }

                    .name,
                    .en_name {
                        line-height: 40px;
                        font-size: 30px;
                    }

                    .en_name {
                        font-weight: 700;
                        color: #ffffff;
                        mix-blend-mode: screen;
                    }
                }

                .link {
                    position: absolute;
                    bottom: 20px;
                    left: 20px;

                    a {
                        color: #e3e3e3;
                        mix-blend-mode: screen;
                        text-decoration: underline;
                    }
                }
            }

            .right:hover {

                img {
                    transform: rotate(-5deg);
                }
            }
        }
    }
}

.mobile {
    overflow-y: auto;
    padding: 5px;

    .top {
        .title {
            font-size: 18px;
        }
    }

    .main {
        flex-direction: column;

        .left {
            width: auto;
            height: auto;
            padding: 10px;

            p {
                line-height: 22px;
                font-size: 14px;
            }
        }

        .right {
            width: 100%;
            height: 100px;
            margin-bottom: 10px;
        }
    }

    .about {
        margin-top: 0;

        .top {
            padding: 20px 10px;

            .title {
                font-size: 18px;
            }
        }

        .main {
            .left {
                display: none;
            }

            .right {
                width: 100%;
                height: 150px;

                .text {
                    top: 10px;
                    left: 10px;

                    .title {
                        font-size: 14px;
                    }

                    .name,
                    .en_name {
                        font-size: 22px;
                        line-height: 25px;
                    }


                }

                .link {
                    left: 10px;
                    bottom: 10px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>