<template>
    <el-scrollbar style="height: 80%;">
        <div class="footer">
            <div class="head">
                <div class="head-left animate_left">
                    <div class="head-left-top">
                        <img src="https://genshin-card.himiku.com/17/215950717.png" alt="原神资料">
                        <div class="btn">
                            <a href="https://ys.mihoyo.com/main/" target="_blank">
                                <span class="iconfont icon">&#xe639;</span>
                                游戏
                            </a>
                        </div>
                    </div>
                    <div class="head-left-bottom">
                        <img src="https://count.himiku.com/get/@kecat?theme=gelbooru" alt="访问计数">
                        <div class="btn">
                            <a href="https://count.himiku.com/" target="_blank">
                                <span class="iconfont icon">&#xe62d;</span>
                                访问计数
                            </a>
                        </div>
                    </div>
                </div>
                <div class="head-right animate_right">
                    <img src="http://kecat.top/images/may/47.webp" alt="86-不存在的战区">
                    <div class="btn">
                        <a href="https://omofun.in/vod/detail/2021520175.html" target="_blank">
                            <span class="iconfont icon">&#xe603;</span>
                            追番
                        </a>
                    </div>
                </div>
            </div>
            <div class="foot">
                <div class="foot-left animate_left">
                    <img :src="songImgUrl" alt="">
                    <div class="play_btn " @click="playSong">
                        <span v-if="playing" class="iconfont paused">&#xe87a;</span>
                        <span v-else class="iconfont playing">&#xe87c;</span>
                    </div>
                    <div class="btn">
                        <a href="http://kecat.top/music" target="_blank">
                            <span class="iconfont icon">&#xe7db;</span>
                            听歌
                        </a>
                    </div>
                </div>
                <div class="foot-right animate_right">
                    <img src="http://kecat.top/images/may/48.webp" alt="三体">
                    <div class="btn">
                        <a href="https://movie.douban.com/subject/26647087/" target="_blank">
                            <span class="iconfont icon">&#xe656;</span>
                            追剧
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </el-scrollbar>
</template>

<script setup>
import { getSong, getUrl } from '../../../../api/song';

const songUrl = ref('')
const songName = ref('')
const songImgUrl = ref('')
const searchWord = ref('Million Days (Acoustic)')
const playing = ref(false)

const getSongInfo = async () => {
    try {
        const { data: songData } = await getSong({
            keywords: searchWord.value
        })
        const song = songData.result.songs[0]
        const { data: songUrlInfo } = await getUrl({
            id: song.id
        })
        setSongInfo(songUrlInfo.data[0].url, song.name, song.al.picUrl)
    } catch (error) {
        throw (new Error(error))
    }
}

const setSongInfo = (url, name, imgurl) => {
    songUrl.value = url
    songName.value = name
    songImgUrl.value = imgurl
}

const playSong = () => {
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
        audio.src = songUrl.value
        audio.volume = 0.5
        audio.style = 'display:none;'
        audio.loop = true
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

onMounted(() => {
    getSongInfo()
    const audios = document.querySelectorAll('audio')
    if (audios.length) {
        playing.value = !audios[0].paused
    }
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

.footer {
    width: 100%;

    img {
        transition: transform 0.5s;
    }

    img:hover {
        transform: scale(1.1);
    }

    @media screen and (min-width:300px) and (max-width:400px) {
        padding: 10px;
    }

    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px;

    .btn {
        @media screen and (min-width:300px) and (max-width:400px) {
            padding: 3px 7px;
            bottom: 2px;
            right: 2px;

        }

        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 5px;
        right: 5px;
        padding: 10px 15px;
        background-color: rgba(255, 255, 255, 0.1);
        border-radius: 20px;
        box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: background 0.3s;
        transition: transform 0.3s;
        transform: scale(0.9);

        a {
            @media screen and (min-width:300px) and (max-width:400px) {
                font-size: 12px;
            }

            width: 100%;
            height: 100%;
            font-size: 14px;
            mix-blend-mode: darken;
        }

        .icon {
            @media screen and (min-width:300px) and (max-width:400px) {
                font-size: 12px;
            }

            font-size: 16px;
            color: #0818fb;
        }
    }

    .btn:hover {
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
        transform: scale(1);
    }

    .btn:active {
        transform: scale(0.95);
        box-shadow: unset;
    }

    .head {
        width: 100%;
        display: flex;
        justify-content: space-between;

        .head-left {
            width: 68%;
            display: flex;
            flex-direction: column;

            .head-left-bottom,
            .head-left-top {
                @media screen and (min-width:300px) and (max-width:400px) {
                    min-height: 100px;
                }

                min-height: 210px;
                max-height: 250px;
                position: relative;
                width: 100%;
                border-radius: 10px;
                box-shadow: var(--box-shadow);
                overflow: hidden;

                img {
                    width: 100%;
                }
            }

            .head-left-top {
                img {
                    width: 100%;
                    height: 100%;
                    object-fit: over;
                }
            }

            .head-left-bottom {
                flex: 1;
                margin-top: 10px;
                padding: 10px;
                display: flex;
                justify-content: flex-start;

                img {
                    width: 80%;
                }
            }

        }

        .head-right {
            position: relative;
            flex: 1;
            margin-left: 20px;
            border-radius: 10px;
            box-shadow: var(--box-shadow);
            overflow: hidden;
            max-height: 500px;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
    }

    .foot {
        width: 100%;
        margin-top: 15px;
        display: flex;
        justify-content: space-between;

        .foot-left,
        .foot-right {
            position: relative;
            width: 30%;
            box-shadow: var(--box-shadow);
            min-height: 210px;
            max-height: 250px;
            border-radius: 10px;
            overflow: hidden;
        }

        .foot-right {
            width: 68%;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }

        .foot-left {
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            .play_btn {
                width: 40px;
                height: 40px;
                box-sizing: border-box;
                text-align: center;
                line-height: 40px;
                position: absolute;
                bottom: 10px;
                left: 10px;
                background-color: rgba(255, 255, 255, 0.8);
                border-radius: 50%;
                cursor: pointer;
                transition: transform 0.3s;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: box-shadow 0.3s;

                .paused,
                .playing {

                    font-size: 18px;
                }

                .playing {
                    margin-left: 3px;
                }
            }

            .play_btn:hover {
                transform: scale(1.1);
                box-shadow: 1px 1px 5px 2px rgba(0, 0, 0, 0.1);
            }

            .play_btn:active {
                transform: scale(1.05);
                box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.1);
                background: rgba(255, 255, 255, 0.2);
            }
        }
    }
}
</style>