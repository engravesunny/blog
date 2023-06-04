<template>
    <div class="me_page unselectable">
        <div class="top">
            <div class="text">
                关于我
            </div>
            <div class="nav_btn" v-if="!showMobile">
                <div class="btn" v-for="(item, index) in navList" :key="index" :class="{ active: curNav[index].active }"
                    :style="{
                        transform: `translateY(${-100 + curNav[index].index * 50}px)`, transition: `all
                ${time}s`
                    }" @mouseenter="handleEnter(index)" @mouseleave="handleLeave(index)" @click="changeNav(index)">
                    <span>{{ item }}</span>
                    <span class="dark">{{ item }}</span>
                    <span>{{ item }}</span>
                </div>
            </div>
        </div>
        <Header v-if="curNav[0].active" />
        <MainCon v-if="curNav[1].active" />
        <Footer v-if="curNav[2].active" />
        <div class="nav_btns" v-if="showMobile">
            <div class="mobileBtn" @click="changeNav(index)" v-for="(item, index) in 3" :key="item">
                <div class="iconfont" v-if="item === 1">&#xe600;</div>
                <div class="iconfont" v-if="item === 2">&#xe638;</div>
                <div class="iconfont" v-if="item === 3">&#xe639;</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from './components/header.vue';
import MainCon from './components/main.vue';
import Footer from './components/footer.vue';
import 'animate.css'

const navList = ['个人简介', '我的技能', '兴趣爱好']
const time = ref(0)

const curNav = reactive([
    {
        active: true,
        index: 0,
    },
    {
        active: false,
        index: 0,
    },
    {
        active: false,
        index: 0,
    }
])

let timer = [0, 0, 0]

const handleEnter = (index) => {
    time.value = 0.2
    if (curNav[index].index !== 0) {
        return
    }
    if (curNav[index].active) {
        return 0
    } else {
        if (timer[index]) {
            timer[index] = null
            curNav[index].index = 0
        }
        curNav[index].index = curNav[index].index + 1
    }
}

const handleLeave = (index) => {
    if (timer[index]) {
        return
    }
    if (curNav[index].index !== 1) {
        return
    }
    if (curNav[index].active) {
        return 0
    } else {
        curNav[index].index = curNav[index].index + 1
        timer[index] = setTimeout(() => {
            time.value = 0
            curNav[index].index = 0
            timer[index] = null
        }, 200)
    }
}

const changeNav = (index) => {
    curNav.map((item, ind) => {
        if (index !== ind) {
            item.index = 0
            item.active = false
        }
    })
    curNav[index].active = true
}

const showMobile = ref(false)

onMounted(() => {
    showMobile.value = window.innerWidth < 400
})

</script>

<style lang="less" scoped>
.animate_me {
    animation: fadeIn;
    animation-duration: 0.5s;
}

.me_page {
    @media screen and (min-width:300px) and (max-width:400px) {
        min-width: unset;
    }

    margin: 5px auto;
    max-width: 1000px;
    min-width: 1000px;
    width: 100vw;
    height: calc(100vh - 70px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    box-shadow: var(--box-shadow);
    border-radius: 20px;
    background-color: rgba(255, 255, 255, 0.9);
    overflow: hidden;

    .top {
        @media screen and (min-width: 300px) and (max-width: 500px) {
            height: 20vh;
            background-position: 0 -20px;
        }

        position: relative;
        width: 100%;
        height: 40vh;
        background-image: url(https://cdn.jsdelivr.net/gh/engravesunny/CDN/image/postImg/1.webp);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 0 -60px;

        .text {
            @media screen and (min-width: 300px) and (max-width: 500px) {
                font-size: 20px;
                left: 10px;
                bottom: 30px;
            }

            position: absolute;
            bottom: 10px;
            left: 10px;
            padding: 10px 30px;
            font-size: 30px;
            color: var(--text-color);
            background-color: #fff;
            border-radius: 10px;
            box-shadow: var(--box-shadow-s);
        }

        .nav_btn {
            height: 50px;
            display: flex;
            position: absolute;
            bottom: 10px;
            right: 10px;
            border-radius: 10px;
            background-color: #fff;
            box-shadow: var(--box-shadow-s);
            overflow: hidden;

            .btn {
                display: flex;
                flex-direction: column;
                cursor: pointer;

                .dark {
                    background-color: #333;
                    color: #fff;
                }

                span {
                    padding: 15px;
                    font-size: 16px;
                }
            }

            .active {
                transform: translateY(-50px) !important;
            }

        }
    }

    .nav_btns {
        display: flex;
        overflow: hidden;
        position: fixed;
        bottom: 100px;
        right: 5px;
        flex-direction: column;
        height: auto;

        .mobileBtn {
            display: flex;
            font-size: 16px;
            margin: 2px 0;
            padding: 5px;
            background-color: rgba(29, 117, 241, 0.2);
            border-radius: 5px;
            color: #fff;

            .iconfont {
                font-size: 20px !important;
            }
        }

        .mobileBtn:hover {
            background-color: rgba(29, 117, 241, 0.5);
        }
    }

    .mobileActive {
        background-color: #333;
        color: #fff;
    }

}
</style>