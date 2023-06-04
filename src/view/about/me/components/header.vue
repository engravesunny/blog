<template>
    <el-scrollbar v-if="!showWitch">
        <div class="header">

            <!-- // avatar 头像 name 名，introduce 介绍， adress 地址， edu 大学， professional 专业， Show off 炫技， motto 座右铭 -->
            <!-- // character 性格， -->
            <div class="top animate_down">
                <div class="left">
                    <div class="avatar">
                        <img class="animateImg" src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/avatar.jpg"
                            alt="">
                    </div>
                </div>
                <div class="right">
                    <div class="name">刻猫猫</div>
                    <div class="frind">QQ:<span class="qq">3170557037</span><span> | </span> 微信:<span
                            class="wechat">Abandon-bin200211</span></div>
                    <div class="adress">
                        <span>现居江苏徐州</span>
                        <span> | </span>
                        <span>来自山东</span>
                    </div>
                </div>
            </div>
            <div class="main_card  animate_left">
                <div class="introduce">
                    <div class="windows">
                        <p>你好啊👋，我是一个来自山东的02年25届大二学生，喜欢做前端开发，嗯，算是个快乐的码农吧！（又菜又爱码😁）这个博客是我完全自己写得🥳（主要是框架改不明白🤯），主要是想记录一下自己的学习和生活经历吧😁，其中还穿插了许多类似相册，音乐，导航等其他出博客文章以外的内容🧐
                            啊，正想知道在等个十年之后回到这个博客的时候会是什么心情啊🤩（不过也得坚持到那时候啊😂）</p>
                    </div>
                    <div class="mobile">
                        <p>你好啊👋，我是一个来自山东的02年25届大二学生，喜欢做前端开发，嗯，算是个快乐的码农吧！（又菜又爱码😁）</p>
                    </div>
                </div>
                <div class="emoji">
                    <img :src="baseURL + '/image/haha.gif'" alt="">
                </div>
            </div>
            <div class="bottom">
                <div class="left  animate_left">
                    <div class="img_card">
                        <span class="text">
                            console.log("Hello,World!")
                        </span>
                        <div class="mobile">
                            <p>console.log</p>
                            <p>("Hello,World!")</p>
                        </div>
                    </div>
                    <div class="edu">
                        <div class="birth">
                            <div class="small">生于</div>
                            <div class="big " style="color:rgb(123, 150, 32)">
                                2002
                                <span class="iconfont" style="font-size: 24px;">&#xe64a; </span>
                            </div>
                        </div>
                        <div class="professional">
                            <div class="small">中国矿业大学</div>
                            <div class="big " style="color:rgb(58, 58, 141)">
                                计算机科学与技术
                                <span class="iconfont" style="font-size: 24px;">
                                    &#xe63a;
                                </span>

                            </div>
                        </div>
                        <div class="work">
                            <div class="small">职业</div>
                            <div class="big " style="color:red">
                                大二学生
                                <span class="iconfont" style="font-size: 24px;">&#xe63b; </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right animate_right">
                    <div class="motto">
                        <p>心有所向，</p>
                        <p>日复一日，</p>
                        <p>必有精进！</p>
                        <div class="tag ">
                            <span class="iconfont icon">&#xe62a;</span> 座右铭
                        </div>
                    </div>
                    <div class="btn" @click="play">
                        <span v-if="playing" class="iconfont icon">&#xe63c;</span>
                        <span v-else class="iconfont icon">&#xe87c;</span>
                    </div>
                </div>
            </div>

        </div>
    </el-scrollbar>
    <div class="header" v-if="showWitch">

        <!-- // avatar 头像 name 名，introduce 介绍， adress 地址， edu 大学， professional 专业， Show off 炫技， motto 座右铭 -->
        <!-- // character 性格， -->
        <div class="top animate_down">
            <div class="left">
                <div class="avatar">
                    <img class="animateImg" src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/avatar.jpg" alt="">
                </div>
            </div>
            <div class="right">
                <div class="name">刻猫猫</div>
                <div class="frind">QQ:<span class="qq">3170557037</span><span> | </span> 微信:<span
                        class="wechat">Abandon-bin200211</span></div>
                <div class="adress">
                    <span>现居江苏徐州</span>
                    <span> | </span>
                    <span>来自山东</span>
                </div>
            </div>
        </div>
        <div class="main_card  animate_left">
            <div class="introduce">
                <div class="windows">
                    <p>你好啊👋，我是一个来自山东的02年25届大二学生，喜欢做前端开发，嗯，算是个快乐的码农吧！（又菜又爱码😁）这个博客是我完全自己写得🥳（主要是框架改不明白🤯），主要是想记录一下自己的学习和生活经历吧😁，其中还穿插了许多类似相册，音乐，导航等其他出博客文章以外的内容🧐
                        啊，正想知道在等个十年之后回到这个博客的时候会是什么心情啊🤩（不过也得坚持到那时候啊😂）</p>
                </div>
                <div class="mobile">
                    <p>你好啊👋，我是一个来自山东的02年25届大二学生，喜欢做前端开发，嗯，算是个快乐的码农吧！（又菜又爱码😁）</p>
                </div>
            </div>
            <div class="emoji">
                <img :src="baseURL + '/image/haha.gif'" alt="">
            </div>
        </div>
        <div class="bottom">
            <div class="left  animate_left">
                <div class="img_card">
                    <span class="text">
                        console.log("Hello,World!")
                    </span>
                    <div class="mobile">
                        <p>console.log</p>
                        <p>("Hello,World!")</p>
                    </div>
                </div>
                <div class="edu">
                    <div class="birth">
                        <div class="small">生于</div>
                        <div class="big " style="color:rgb(123, 150, 32)">
                            2002
                            <span class="iconfont" style="font-size: 24px;">&#xe64a; </span>
                        </div>
                    </div>
                    <div class="professional">
                        <div class="small">中国矿业大学</div>
                        <div class="big " style="color:rgb(58, 58, 141)">
                            计算机科学与技术
                            <span class="iconfont" style="font-size: 24px;">
                                &#xe63a;
                            </span>

                        </div>
                    </div>
                    <div class="work">
                        <div class="small">职业</div>
                        <div class="big " style="color:red">
                            大二学生
                            <span class="iconfont" style="font-size: 24px;">&#xe63b; </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right animate_right">
                <div class="motto">
                    <p>心有所向，</p>
                    <p>日复一日，</p>
                    <p>必有精进！</p>
                    <div class="tag ">
                        <span class="iconfont icon">&#xe62a;</span> 座右铭
                    </div>
                </div>
                <div class="btn" @click="play">
                    <span v-if="playing" class="iconfont icon">&#xe63c;</span>
                    <span v-else class="iconfont icon">&#xe87c;</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { baseURL } from '../../../../constant/index'
import 'animate.css'

const playing = ref(false)

const play = () => {
    playing.value = !playing.value
    const audios = document.querySelectorAll('audio')
    if (audios.length) {
        if (!playing.value) {
            audios[0].pause()
        } else {
            audios[0].play()
        }
    } else {
        const audio = document.createElement('audio')
        audio.src = 'http://kecat.top/audio/%E5%88%BB%E6%99%B4%E8%AF%AD%E9%9F%B3_%E7%9F%AD.mp3'
        audio.volume = 0.4
        audio.style = 'display:none;'
        audio.loop = false
        audio.onended = () => {
            playing.value = false
        }
        document.body.appendChild(audio)
        // 音乐就绪
        audio.playing = () => {
            ElMessage('当前网络较差，请稍后重试')
        }
        let timer = null
        timer = setTimeout(() => {
            ElMessage('正在缓冲，请耐心等待')
        }, 3000);
        audio.oncanplaythrough = () => {
            audio.play();
            clearTimeout(timer)
            timer = null
            audio.oncanplaythrough = null
        }
    }
}
const showWitch = ref(false)
onMounted(() => {
    const audios = document.querySelectorAll('audio')
    if (audios.length) {
        if (audios.length > 1) {
            audios.length = 1
        }
        playing.value = !audios[0].paused
    }
    showWitch.value = window.innerWidth < 400
})

onBeforeUnmount(() => {
    const audios = document.querySelectorAll('audio')
    audios.forEach(audio => {
        audio.remove()
    })
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

.animateImg:hover {
    display: inline-block;
    animation: rubberBand;
    animation-duration: 1s;
}

@keyframes bganimate {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.header {
    @media screen and (min-width:300px) and (max-width:400px) {
        padding: 10px;
    }

    width: 100%;
    height: 80%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .top {
        width: 100%;
        display: flex;

        .left {
            width: 15%;

            .avatar {
                img {
                    width: 100%;
                    max-width: 100px;
                    border-radius: 50%;
                    vertical-align: middle;
                }
            }
        }

        .right {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .name {
                @media screen and (min-width: 300px) and (max-width: 500px) {
                    font-size: 18px;
                }

                font-size: 30px;
            }

            .frind {
                margin: 5px 0;
                font-size: 14px;

                .qq,
                .wechat {
                    user-select: all;
                }
            }

            .adress {
                font-size: 14px;
            }
        }
    }

    .main_card {
        @media screen and (min-width:300px) and (max-width:400px) {
            padding: 10px 5px;
            margin-top: 10px;
        }

        margin-top: 20px;
        padding: 15px 10px;
        width: 100%;
        border-radius: 10px;
        box-shadow: var(--box-shadow-s);
        display: flex;

        .introduce {
            @media screen and (min-width:300px) and (max-width:400px) {
                width: 100%;
            }

            width: 90%;
            font-size: 18px;

            p {
                text-indent: 2em;
                line-height: 30px;
            }

            .windows {
                @media screen and (min-width:300px) and (max-width:400px) {
                    display: none;
                }
            }

            .mobile {
                display: none;

                @media screen and (min-width:300px) and (max-width:400px) {
                    display: inline-block;
                    font-size: 14px;
                }
            }
        }

        .emoji {
            @media screen and (min-width:300px) and (max-width:400px) {
                display: none;
            }

            img {
                border-radius: 10px;
                margin: 0 10px;
                width: 150px;
            }
        }
    }

    .bottom {
        @media screen and (min-width:300px) and (max-width:400px) {
            margin-top: 10px;

        }

        max-height: 250px;
        margin-top: 20px;
        flex: 1;
        width: 100%;
        display: flex;
        justify-content: space-between;

        .right {
            @media screen and (min-width:300px) and (max-width:400px) {
                height: 48%;
            }

            position: relative;

            width: 39%;
            height: 100%;
            box-shadow: var(--box-shadow-s);
            border-radius: 10px;
            background-image: url(http://kecat.top/images/may/49.webp);
            background-size: cover;
            overflow: hidden;

            .btn {
                @media screen and (min-width:300px) and (max-width:400px) {
                    width: 30px;
                    height: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    box-sizing: border-box;
                    top: 5px;
                    right: 5px;
                }

                position: absolute;
                top: 10px;
                right: 10px;
                padding: 10px;
                text-align: center;
                background-color: #fff;
                box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
                border-radius: 50%;
                cursor: pointer;
                transition: unset;

                .icon {
                    @media screen and (min-width:300px) and (max-width:400px) {
                        font-size: 12px;
                    }
                }
            }

            .btn:active {
                @media screen and (min-width:300px) and (max-width:400px) {
                    transform: scale(0.5);
                }

                transform: scale(0.9);
                box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
            }

            .motto {
                @media screen and (min-width:300px) and (max-width:400px) {
                    font-size: 22px;
                    padding: 5px;
                }

                position: relative;
                height: 100%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 20px;
                font-size: 50px;
                background-color: rgba(255, 255, 255, 0.8);
                color: #3f8eef;
                text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
                transition: opacity 0.6s;

                .tag {
                    @media screen and (min-width: 300px) and (max-width: 500px) {
                        transform: scale(0.5);
                        bottom: -8px;
                        right: -20px;
                    }

                    padding: 10px 15px;
                    position: absolute;
                    bottom: 10px;
                    right: 10px;
                    font-size: 18px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 20px;
                    text-shadow: unset !important;

                    .icon {
                        font-size: 18px;
                        color: #2877de;
                        font-weight: 700;
                    }
                }


            }

            .motto:hover {
                opacity: 0;
            }
        }

        .left {
            width: 59%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .img_card {

                width: 100%;
                height: 48%;
                box-shadow: var(--box-shadow-s);
                border-radius: 10px;
                font-size: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(100deg, rgba(105, 107, 240, 0.9) 40%, #53cee6 60%);
                background-size: 200%;
                animation: bganimate 5s ease infinite;
                overflow: hidden;

                .text,
                .mobile {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 100%;
                    height: 100%;
                    color: #333;
                    mix-blend-mode: screen;
                    background-color: rgba(255, 255, 255, 0.8);
                }

                .mobile {
                    display: none;

                    @media screen and (min-width:300px) and (max-width:400px) {
                        display: flex;
                        flex-direction: column;
                        font-size: 25px;
                    }
                }

                .text {
                    @media screen and (min-width:300px) and (max-width:400px) {
                        display: none;
                    }
                }

            }

            .edu {
                @media screen and (min-width:300px) and (max-width:400px) {
                    width: 169%;
                }

                width: 100%;
                height: 48%;
                padding: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: var(--box-shadow-s);
                border-radius: 10px;

                .birth,
                .professional,
                .work {
                    margin: 10px;
                    text-align: left;
                    display: flex;
                    flex-direction: column;

                    .small {
                        @media screen and (min-width:300px) and (max-width:400px) {
                            font-size: 12px;
                        }

                        font-size: 14px;
                        font-weight: 100;
                        color: gray;
                    }

                    .big {
                        @media screen and (min-width:300px) and (max-width:400px) {
                            font-size: 16px;
                        }

                        font-size: 22px;
                        font-weight: 700;
                    }
                }
            }

        }
    }
}
</style>