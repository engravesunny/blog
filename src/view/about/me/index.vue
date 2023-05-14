<template>
    <div class="me_page unselectable">
        <div class="top">
            <div class="text">
                关于我
            </div>
            <div class="nav_btn">
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
    </div>
</template>

<script setup>
import Header from './components/header.vue';
import MainCon from './components/main.vue';
import Footer from './components/footer.vue';
import 'animate.css'

const navList = ['个人简介', '技术栈', '兴趣爱好']
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

const timer = null

const handleEnter = (index) => {
    time.value = 0.2
    if (timer) {
        return
    }
    if (curNav[index].active) {
        return 0
    } else {
        curNav[index].index = curNav[index].index + 1
    }
}

const handleLeave = (index) => {
    if (timer) return
    if (curNav[index].active) {
        return 0
    } else {
        curNav[index].index = curNav[index].index + 1
        timer = setTimeout(() => {
            time.value = 0
            curNav[index].index = 0
            timer = null
        }, 100)
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
</script>

<style lang="less" scoped>
.animate_me {
    animation: fadeIn;
    animation-duration: 0.5s;
}

.me_page {
    margin: 5px auto;
    max-width: 1000px;
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
        position: relative;
        width: 100%;
        height: 20vh;
        background-image: url(https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/6.webp);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: 0 -50px;

        .text {
            @media screen and (min-width: 300px) and (max-width: 400px) {
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
            @media screen and (min-width:300px) and (max-width:400px) {
                display: none;
            }

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

}
</style>