<template>
    <div class="navbar_container unselectable" :style="{
        transform: `translate(0,-${isFloded}%)`,
        background: `rgba(255,255,255,0.${isOpacity})`,
        color: `${color}`
    }">

        <!-- logo -->
        <div class="logo">
            <div class="logo_img">
                <img src="https://www.kecat.top/other/logo.png" alt="">
            </div>
            <div class="logo_name">刻猫猫的笔记本</div>
        </div>
        <!-- logo -->

        <!-- 操作按钮 -->
        <div class="controls">
            <div v-if="!showHam" @mouseenter="showDownSelect(item)" @mouseleave="closeDownSelect(item)" ref="btn"
                class="btn" v-for="item in controls" :key="item.path" @click="nextToIt(item)">
                <span class="iconfont">{{ getFileIcon(item.name) }}</span>
                {{ item.name }}
                <span v-if="item.children" class="iconfont">&#xe60c;</span>
                <downSelect v-if="alive.name === item.name" :chirlden="item.children"></downSelect>
            </div>
            <div class="input_box">

            </div>
            <!-- 面包菜单 -->
            <div v-if="showHam" @click="openMenu" class="btn ham_box iconfont">&#xe606;</div>
            <!-- 面包菜单 -->
            <!-- 菜单侧边栏 -->
            <div class="mark" @click="openMenu" :style="{ background: `rgba(0,0,0,${mark})`, width: `${markw}vw` }"></div>
            <div class="menu_side" :style="{ transform: `translate(-${isOpenMenu}px)` }">
                <menu-sidebar :controls="controls" v-if="showHam"></menu-sidebar>
            </div>
            <!-- 菜单侧边栏 -->
        </div>
        <!-- 操作按钮 -->

    </div>
</template>

<script setup>
import getFileIcon from '../../../../utils/icon';
import { reactive } from 'vue';
import downSelect from './components/downSelect.vue';
import menuSidebar from './components/menuSidebar.vue';
import PubSub from 'pubsub-js'

const router = useRouter()

const emit = defineEmits(['explore'])

let nextToIt = (item) => {
    if (item.path) {
        if (item.path === '/music') {
            const a = document.createElement('a')
            a.href = 'http://kecat.top:3333'
            document.body.appendChild(a)
            a.setAttribute('target', '_blank');
            a.click()
        } else {
            router.push(item.path)
        }

    } else if (item.url) {
        window.location.replace(item.url)
    } else {
        return
    }
}

const porps = defineProps({
    isOpacity: {
        type: Number,
        default: 0
    },
    isFloded: {
        type: Number,
        default: 0
    },
    color: {
        type: String,
        default: '#fff'
    }
})

let alive = reactive({
    name: ''
})

let showHam = ref(false)
// 菜单隐藏栏控制
let isShowMark = ref(false)
// 遮罩层
let mark = ref(0)
let markw = ref(0)
let isOpenMenu = ref(0)
let openMenu = () => {
    if (isOpenMenu.value) {
        isOpenMenu.value = 0
        isShowMark.value = false
        mark.value = 0
        markw.value = 0
    } else {
        isOpenMenu.value = 300
        isShowMark.value = true
        mark.value = 0.7
        markw.value = 100
    }
}


let controls = reactive(
    [
        {
            name: '首页',
            path: '/home'
        },
        {
            name: '文章',
            children: [
                {
                    name: '分类',
                    path: '/category'
                },
                {
                    name: '标签',
                    path: '/tag'
                },
                {
                    name: "归档",
                    path: '/archive'
                }
            ]
        },
        {
            name: '媒体',
            children: [
                {
                    name: '相册',
                    path: '/photo'
                }, {
                    name: '视频',
                    path: '/video'
                }, {
                    name: '音乐',
                    path: '/music'
                }
            ]
        },
        {
            name: '实验室',
            children: [
                {
                    name: '网盘plus',
                    url: 'https://kecat.top/cloudDisk'
                },
                {
                    name: '后台管理项目',
                    url: 'http://kecat.top:1314'
                },
                {
                    name: "手势识别demo",
                    url: 'http://kecat.top:1234'
                },
                {
                    name: "考勤记录项目",
                    url: 'http://kecat.top:8080/'
                },
                {
                    name: '进制转换demo',
                    url: "https://kecat.top/bin2dec"
                },
                {
                    name: "border-radius-preview",
                    url: "http://kecat.top/border-radius-preview"
                }
            ]
        },
        {
            name: '关于',
            children: [
                {
                    name: '评论',
                    path: '/comment'
                }, {
                    name: '友链',
                    path: '/friend'
                }, {
                    name: '网站统计',
                    path: '/statistical'
                }, {
                    name: '关于我',
                    path: '/me'
                }
            ]
        }
    ]
)
let timer = ref(null);

let windowSizeChange = (size) => {
    if (size < 1500) {
        if (size < 1250) {
            if (size < 1000) {
                showHam.value = true
            } else {
                showHam.value = false
                isOpenMenu.value = 0
                isShowMark.value = false
                mark.value = 0
                markw.value = 0
            }
            PubSub.publish('closeSide')
        } else {
            PubSub.publish('openSide')
            showHam.value = false
            isOpenMenu.value = 0
            isShowMark.value = false
            mark.value = 0
            markw.value = 0
        }
        PubSub.publish('homeSizeChange', size)
    } else {
        PubSub.publish('openSide')
        PubSub.publish('homeSizeChange', size)
        showHam.value = false
        isOpenMenu.value = 0
        isShowMark.value = false
        mark.value = 0
        markw.value = 0
    }
}

const showFn = () => {
    timer.value = null;
    window.onresize = () => {
        if (timer.value) {
            clearTimeout(timer);
        }
        timer.value = setTimeout(() => {
            const size = document.body.clientWidth;
            windowSizeChange(size);
            timer.value = null;
        }, 200); // 限制事件触发的最小间隔为200ms
    };
}

const showDownSelect = (item) => {
    timer.value = setTimeout(() => {
        if (item.name !== '首页') {
            alive.name = item.name
        }
        clearTimeout(timer)
        timer.value = null
    }, 100)
}

const closeDownSelect = (item) => {
    if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
    }
    alive.name = ''
}

onMounted(() => {
    if (document.body.clientWidth < 1000) {
        showHam.value = true
    }
    showFn()
    PubSub.subscribe('nextTo', (a, item) => {
        nextToIt(item)
    })
    PubSub.subscribe('closeMenuSideBar', () => {
        openMenu()
    })
})

</script>

<style lang="less" scoped>
.mark {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    transition: all 0.5s;
}

.menu_side {
    position: fixed;
    top: 0;
    right: -300px;
    transition: all 0.5s;
}

.navbar_container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-width: 375px;
    height: 55px;
    // background-color: pink;
    z-index: 999;
    background: rgba(255, 255, 255, 0.3);
    transition: all 0.5s;

    .logo {
        float: left;
        width: 250px;
        height: 100%;
        // background-color: #fff;
        display: flex;
        align-items: center;

        .logo_img {
            img {
                width: 75px;
                height: 75px;
            }
        }

        .logo_name {
            font-size: 25px;
            font-weight: 500;
            text-shadow: 2px 2px 4px rgb(0 0 0 / 15%);
        }
    }

    .controls {
        padding: 0 10px;
        float: right;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;

        // background-color: #fff;
        .btn {
            position: relative;
            margin: 0 5px;
            width: 90px;
            height: 55px;
            font-size: 16px;
            font-weight: 500;
            text-align: center;
            line-height: 55px;
            cursor: pointer;
            border-radius: 10px;
            transition: all 0.5s;
            text-shadow: 2px 2px 4px rgb(0 0 0 / 15%);
        }

        .btn:hover {
            background-color: rgba(255, 255, 255, 0.5);
        }

        .ham_box {
            font-size: 20px;
        }
    }
}
</style>