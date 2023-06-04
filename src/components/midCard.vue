<template>
    <div class="mid_card" ref="dom">
        <div class="left" @click="toArticle()">
            <img v-if="!loading" ref="imgDom" :src="`${baseURL}/image/loading.gif`"
                :data-src="`${postImgUrl}/${postInfo.postImg}`" alt="postImg" />
        </div>
        <div class="main">
            <div class="top" @click="toArticle">
                <div class="title shenglue2">{{ postName }}</div>
            </div>
            <div class="bottom">
                <div class="category" @click="toCategory(postInfo.category)">
                    <span class="iconfont icon">&#xe811;</span> {{ postInfo.category }}
                </div>
                <div class="tags">
                    <div class="tag" v-for="item in postInfo.tag" :key="item" @click="toTag(item)">
                        <span class="iconfont icon">&#xe62f;</span>{{ item }}
                    </div>
                </div>
            </div>
        </div>
        <div class="right">
            <div class="top">
                <div class="index">
                    <h1>{{ index + 1 }}</h1>
                </div>
            </div>
            <div class="bottom">
                <div class="date"> <span class="icon iconfont">&#xe662;</span> {{ postInfo.date }}</div>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import toPath from "../utils/toPath";
import { postImgUrl, baseURL } from "../constant";
import { getPostInfo } from "../utils/getPostInfo";
const props = defineProps({
    postName: {
        type: String,
        default: "文章标题",
    },
    index: {
        type: Number,
        default: 1,
    },
});
const router = useRouter()

// 跳转
let toCategory = (item: string) => {
    toPath('/category', item)
}
let toTag = (item: string) => {
    toPath('/tag', item)
}
let toArticle = () => {
    router.push({
        path: '/article',
        query: {
            postName: postInfo.name,
            date: postInfo.date,
            tag: postInfo.tag,
            category: postInfo.category
        }
    })
}


const loading = ref(true)

const emits = defineEmits(['loadFinish'])

const postInfo = reactive({
    name: "",
    tag: [''],
    category: "",
    date: "",
    postImg: '0.webp'
});

const init = async () => {
    loading.value = true
    const info = await getPostInfo(props.postName);
    emits('loadFinish')
    postInfo.category = info.category;
    postInfo.date = info.date.slice(0, 10);
    postInfo.name = info.name;
    postInfo.tag = info.tag;
    postInfo.postImg = info.postImg
    loading.value = false
}

const dom = ref<Element>()
const imgDom = ref<HTMLImageElement>()

const handleLoad = () => {
    (imgDom.value as HTMLImageElement).src = (imgDom.value as HTMLImageElement).dataset.src as string
    (imgDom.value as HTMLImageElement).classList.add('animate_show')
}

const handleLazy = () => {
    const intersectionObserver = new IntersectionObserver((changes) => {
        changes.forEach((item, index) => {
            if (item.intersectionRatio > 0) {
                intersectionObserver.unobserve(item.target)
                handleLoad()
            }
        })
    })
    intersectionObserver.observe(dom.value as Element)
}

onBeforeMount(async () => {
    await init()
})

onMounted(() => {
    handleLazy()
});
</script>
  
<style lang="less" scoped>
.mid_card {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        min-height: unset;
        position: relative;
        padding: 5px;
    }

    width: 100%;

    display: flex;
    padding: 10px;
    border-radius: 10px;

    .left {
        @media screen and (min-width: 300px) and (max-width: 500px) {
            width: 100px;
            height: 100px;
        }

        width: 160px;
        overflow: hidden;
        border-radius: 5px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            cursor: pointer;
            transition: transform 0.5s;
        }

        img:hover {
            transform: scale(1.1);
        }
    }

    .main {
        @media screen and (min-width: 300px) and (max-width: 500px) {
            margin-left: 10px;
            width: 55%;
        }

        margin-left: 10px;
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .icon {
            font-size: 14px;
            margin-right: 3px;
        }

        .top {
            padding-top: 2px;
            width: 100%;
            cursor: pointer;

            @media screen and (min-width: 300px) and (max-width: 500px) {
                height: 100%;
            }

            .title {
                width: 100%;
                font-size: 18px;
                font-weight: 700;
                transition: all 0.5s;
            }

            .title:hover {
                transform: translateX(5px);
                color: gray;

            }
        }

        .bottom {
            padding-bottom: 5px;
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            font-weight: 700;

            @media screen and (min-width: 300px) and (max-width: 500px) {
                display: none;
            }

            .category {

                cursor: pointer;
                margin-bottom: 3px;
            }

            .tags {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .tag {
                    cursor: pointer;
                    margin-right: 5px;
                    display: flex;
                    align-items: center;
                }
            }
        }
    }

    .right {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top {
            .index {
                @media screen and (min-width: 300px) and (max-width: 500px) {
                    margin-top: 20px;
                }

                opacity: 0.5;
                font-size: 18px;
                text-align: right;
                font-style: italic;
            }
        }

        .bottom {
            width: 100%;

            .date {
                @media screen and (min-width: 300px) and (max-width: 500px) {
                    width: 120px;
                    position: absolute;
                    bottom: 5px;
                    right: 0px;
                }

                text-align: right;
                font-size: 14px;
                font-weight: 700;
                color: var(--dark-gray);

                .icon {
                    margin-right: 1px;
                    font-size: 16px;
                }
            }
        }
    }
}
</style>
