<template>
    <div class="mid_card">
        <div class="left">
            <img src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/4.webp" alt="postImg" />
        </div>
        <div class="main">
            <div class="top">
                <div class="title shenglue">{{ postInfo.name }}</div>
            </div>
            <div class="bottom">
                <div class="category">
                    <span class="iconfont icon">&#xe811;</span> {{ postInfo.category }}
                </div>
                <div class="tags">
                    <div class="tag" v-for="item in postInfo.tag" :key="item">
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
                <div class="date">{{ postInfo.date }}</div>
            </div>
        </div>
    </div>
</template>
  
<script setup>
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

const emits = defineEmits(['loadFinish'])

const postInfo = reactive({
    name: "",
    tag: [],
    category: "",
    date: "",
});

const init = async () => {
    const info = await getPostInfo(props.postName);
    console.log(1);
    emits('loadFinish')
    postInfo.category = info.category;
    postInfo.date = info.date;
    postInfo.name = info.name;
    postInfo.tag = info.tag;
}

onBeforeMount(() => {
    init()
});
</script>
  
<style lang="less" scoped>
.mid_card {
    width: 70%;
    min-height: 100px;
    display: flex;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.3);
    background-color: rgba(255, 255, 255, 0.3);

    .left {
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
        margin-left: 10px;
        width: 50%;
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

            .title {
                width: 100%;
                font-size: 18px;
                font-weight: 700;
            }
        }

        .bottom {
            padding-bottom: 5px;
            width: 100%;
            display: flex;
            flex-direction: column;
            font-size: 14px;
            font-weight: 700;

            .category {
                margin-bottom: 3px;
            }

            .tags {
                display: flex;
                justify-content: flex-start;
                align-items: center;

                .tag {
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
                opacity: 0.5;
                font-size: 18px;
                text-align: right;
                font-style: italic;
            }
        }

        .bottom {
            .date {
                text-align: right;
                font-size: 14px;
                font-weight: 700;
                color: var(--dark-gray);
            }
        }
    }
}
</style>
