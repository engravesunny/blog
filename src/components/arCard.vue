<template>
    <div @click="toArticle" class="card_container">
        <div class="top">
            <img v-if="loading" :src="`${baseURL}/image/loading.gif`">
            <img v-show="!loading" @load="handleLoad" loading="lazy"
                :src="`${baseURL}/image/${Math.floor(Math.random() * 23)}.webp`" alt="">
        </div>
        <div class="bottom">
            <div class="bTop">
                <div class="left">
                    <div class="title shenglue">{{ postName }}</div>
                    <div class="publishTime iconfont">&#xe663;{{ dateInfo }}</div>
                </div>
                <div class="right">
                    <div @click.stop="toCategory" class="category iconfont shenglue">&#xe811;{{ category }}</div>
                </div>
            </div>
            <div class="bBottom">
                <div @click.stop="toTag(item)" class="tag iconfont" v-for="item in tags" :key="item">&#xe62f; {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { baseURL } from '../constant'
import toPath from '../utils/toPath';
import { getPostInfo } from '../utils/getPostInfo';


const loading = ref(true)
const handleLoad = () => {
    loading.value = false
}

const router = useRouter()
const props = defineProps({
    postName: {
        type: String,
        default: '文章标题'
    }
})

// const addClass = (el: HTMLElement) => {
//     const { top } = el.getBoundingClientRect()
//     const h = window.innerHeight
//     if (top < h) {
//         if (el.className.indexOf(binding.value) === -1) {
//             // 初次还未绑定过，则新增类名(注意：下面单引号中间是一个空格！！！)
//             el.className = `${binding.value} ${el.className}`
//         }
//         if (binding.arg === 'once') {
//             // 如果指令参数是 'once'，则只触发一次
//             window.removeEventListener('scroll', addClass)
//         }
//     }
// }

// 分类名
let category = ref('')
// 标签信息
let tags = reactive<string[]>([])
// 日期信息
let dateInfo = ref('')
let timer = null
// 跳转
let toCategory = () => {
    toPath('/category', category.value)
}
let toTag = (item: string) => {
    toPath('/tag', item)
}
let toArticle = () => {
    router.push({
        path: '/article',
        query: {
            postName: props.postName,
            date: dateInfo.value,
            tag: tags,
            category: category.value
        }
    })
}
const init = async () => {
    const info = await getPostInfo(props.postName)

    category.value = info.category
    info.tag.map(item => {
        tags.push(item)
    })
    dateInfo.value = info.date
}

onMounted(() => {
    init()
})

</script>

<style lang="less" scoped>
.animate_zoomIn {
    animation: zoomIn;
    animation-duration: 1s;
}

.card_container {
    width: 100%;
    min-width: 290px;
    padding: 15px;
    border-radius: 15px;
    box-sizing: border-box;
    background: var(--background-transparent);
    border: var(--box-border);
    transition: all 0.5s;
    cursor: pointer;

    .top {
        position: relative;
        border-radius: 10px;
        width: 100%;
        height: 180px;
        text-align: center;
        transition: all 0.5s;
        overflow: hidden;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s;
        }

        img:hover {
            transform: scale(1.2);
        }
    }

    .bottom {
        margin: 10px 0;
        width: 100%;
        height: 110px;

        // background-color: pink;
        .bTop {
            width: 100%;
            height: 60%;
            padding: 5px 10px;
            border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);

            .left {
                width: 65%;
                float: left;
                height: 100%;
                display: flex;
                flex-direction: column;

                .title {
                    text-align: start;
                    font-size: 18px;
                    font-weight: 700;
                    width: 100%;
                    height: 60%;
                    // background-color: black;
                }

                .publishTime {
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

            .right {
                width: 30%;
                float: right;
                height: 100%;
                text-align: center;

                .category {
                    line-height: 50px;
                    font-size: 15px;
                    font-weight: 700;
                    width: 100%;
                    height: 100%;
                    padding: 5px;
                    cursor: pointer;
                }

                .category:hover {
                    color: #989898;
                }
            }
        }

        .bBottom {
            width: 100%;
            padding: 3px;
            display: flex;
            justify-content: flex-start;
            flex-wrap: wrap;

            .tag {
                margin: 2px 5px;
                padding: 0px 5px;
                font-size: 14px;
                line-height: 30px;
                text-align: center;
                color: #fff;
                font-weight: 700;
                height: 30px;
                border-radius: 5px;
                background-color: #000;
                cursor: pointer;
                transition: all 0.5s;
            }

            .tag:hover {
                background-color: #fff;
                color: #000;
            }
        }
    }
}

.card_container:hover {
    box-shadow: 5px 5px 20px 1px rgba(0, 0, 0, 0.2);
    border: var(--box-border-active);
    background: var(--background-hover);
}
</style>