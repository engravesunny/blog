<template>
    <section class="bigCard" ref="dom">
        <div class="card-item-img" @click="toArticle" :class="{ right: right, left: !right }">
            <img ref="imgDom" src="https://www.kecat.top/other/loading.gif"
                :data-src="`${postImgUrl}/${postImg.split('.')[0] + 'min.webp'}`" alt="">
        </div>
        <div class="card-item-info">
            <div class="post-title" @click="toArticle">{{ title }}</div>
            <div class="date"><span class="iconfont" style="color: blue;">&#xe663;</span>{{ date }}</div>
            <div class="info">
                <span class="iconfont" style="color: green">&#xe811;</span>
                <span class="category" @click="toCategory">{{ category }}</span>
                <span class="iconfont" style="color: red;">&#xe62f;</span>
                <span class="tag" v-for="tag in tags" :key="tag" @click="toTag(tag)">
                    {{ tag }}
                </span>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { postImgUrl } from '@/constant';
import toPath from '@/utils/toPath';
const router = useRouter();
// 跳转
let toCategory = () => {
    toPath('/category', props.category)
}
let toTag = (item: string) => {
    toPath('/tag', item)
}
let toArticle = () => {
    PubSub.publish('toTop');
    router.push({
        path: '/article',
        query: {
            postName: props.title,
            date: props.date,
            tag: props.tags,
            category: props.category
        }
    })
}

const dom = ref<HTMLElement>();
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

onMounted(() => {
    handleLazy();
})



const props = defineProps({
    right: {
        type: Boolean,
        default: true
    },
    title: {
        type: String,
        default: "文章标题"
    },
    date: {
        type: String,
        default: "2023-8-15"
    },
    category: {
        type: String,
        default: "分类"
    },
    tags: {
        type: Array<string>,
        default: ["标签", "标签"]
    },
    postImg: {
        type: String,
        default: "77.webp"
    }
})

</script>

<style lang="less" scoped>
.bigCard {
    border-radius: 18px;
    margin-top: 14px;
    width: 100%;
    height: 200px;
    display: flex;
    align-items: center;
    border: 2px solid rgba(0, 255, 255, .6);
    font-size: 14.5px;
    font-weight: 700;
    background: rgba(255, 255, 255, .67);
    will-change: transform;

    .left {
        padding: 7px 0 7px 7px;
    }

    .right {
        padding: 7px 7px 7px 0px;
        order: 1;
    }

    .card-item-img {
        cursor: pointer;
        width: 44%;
        height: 200px;

        img {
            border-radius: 12px;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .card-item-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 25px;

        .post-title {
            @media screen and (max-width:600px) {
                font-size: 20px;
            }

            font-size: 25px;
            transition: all .5s;

            &:hover {
                color: #49b1f5;
            }
        }

        .post-title,
        .category,
        .tag {
            cursor: pointer;
        }

        .iconfont {
            font-size: 16px;

            &.iconfont {
                margin-left: 5px;
            }

            &::after {
                content: "";
                display: inline-block;
                width: 5px;
                height: 10px;
            }
        }

        .date {
            font-size: 14px;
            color: #858585;
        }

        span {
            line-height: 1.5em;
            font-size: 14px;
            color: #858585;
        }

        .tag:not(:last-child) {
            &::after {
                content: "·";
                font-size: 25px;
                margin: -8px;
                vertical-align: middle;
            }
        }
    }
}
</style>