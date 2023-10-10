<template>
    <div class="search" :style="{ transform: `scale(${scale})` }">
        <div class="search-container" :style="{ opacity }">
            <div class=" search-header">
                <div class="search-header-title">
                    <div class="search-header-title-left">本地搜索</div>
                    <div class="search-header-title-right">
                        <div class="search-header-title-right-close">
                            <span @click="closeBtn" class="iconfont text">&#xe60a;</span>
                        </div>
                    </div>
                </div>
                <div class="search-header-input">
                    <input type="search" v-model="searchText" placeholder="搜索文章">
                </div>
            </div>
            <div class="search-body">
                <ul class="search-result">
                    <div class="search-result-item" v-for="item in postList" :key="item.name">
                        <span class="search-result-item-title" @click="toArticle(item)">
                            {{ item.name }}
                        </span>
                        <div class="search-result-item-info">
                            <span class="category" @click="toCategory(item.category)"><span class="iconfont"
                                    style="color: red;">&#xe811;</span>{{
                                        item.category
                                    }}</span>
                            <span class="iconfont" style="color: red;">&#xe62f;</span>
                            <span class="tags">
                                <span class="tag" v-for="tagItem in item.tag" :key="tagItem" @click="toTag(tagItem)">
                                    {{ tagItem }}
                                </span>
                            </span>
                        </div>
                    </div>
                </ul>
            </div>
        </div>
    </div>
    <div :style="{ opacity }" v-if="isShowMask" @wheel.stop.prevent @click="closeBtn" class="search-mask fadeIn">
    </div>
</template>

<script setup lang="ts">
import toPath from "@/utils/toPath";
import { post } from "@/store/post";
const postStore = post();
import "animate.css"
import PubSub from 'pubsub-js';
import { PostSingle } from '../../../../types/index';

const router = useRouter();

let searchText = ref('')
let props = defineProps<{
    scale: number,
    opacity: number,
}>();
let isShowMask = ref(false)
let closeBtn = () => {
    searchText.value = "";
    PubSub.publish('closeSearchBox')
}

let postList = computed(() => {
    return postStore.postInfo.filter(post => {
        return post.name.includes(searchText.value) ||
            post.category.includes(searchText.value) ||
            post.tag.some(item => item.includes(searchText.value)) ||
            post.date.includes(searchText.value)
    })
})

watch(() => props.opacity, () => {
    if (isShowMask.value) {
        setTimeout(() => {
            isShowMask.value = !isShowMask.value
        }, 300);
    } else {
        isShowMask.value = !isShowMask.value
    }
})

// 跳转
let toCategory = (category: string) => {
    closeBtn();
    toPath('/category', category)
}
let toTag = (item: string) => {
    closeBtn();
    toPath('/tag', item)
}
let toArticle = (item: PostSingle) => {
    closeBtn();
    PubSub.publish('toTop');
    router.push({
        path: '/article',
        query: {
            postName: item.name,
            date: item.date,
            tag: item.tag,
            category: item.category
        }
    })
}

</script>

<style lang="less" scoped>
.fadeIn {
    animation: fadeIn;
    animation-duration: .3s;
}

.search {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transition: transform 0.6s;
    z-index: 1001;

    &-container {
        @media screen and (max-width: 750px) {
            width: 100vw;
            height: 100vh;
            border-radius: unset;

        }

        padding: 20px;
        border-radius: 20px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        min-height: 500px;
        background-color: rgba(255, 255, 255, .9);
        display: flex;
        flex-direction: column;
        transition: opacity .2s;

    }

    &-header {
        width: 100%;
        display: flex;
        flex-direction: column;

        &-title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            font-weight: 700;
            color: rgb(73, 177, 245);

            &-left {
                font-size: 20px;
            }

            &-right {
                .text {
                    font-size: 20px;
                    cursor: pointer;
                }
            }
        }

        &-input {
            padding: 20px 0;
            width: 100%;
            height: 30px;
            display: flex;
            align-items: center;

            input {
                width: 100%;
                padding: 5px 15px;
                font-size: 14px;
                border: 1px solid rgb(73, 177, 245);
                border-radius: 30px;
            }
        }
    }

    &-body {
        flex: 1;
    }

    &-result {
        @media screen and (max-width: 750px) {
            height: calc(100vh - 150px);
        }

        margin-top: 10px;
        width: 100%;
        height: 400px;
        display: flex;
        flex-direction: column;
        overflow: auto;
        gap: 10px;

        &-item {
            @media screen and (max-width: 750px) {
                height: calc(100vh - 150px);
            }

            padding: 20px;
            position: relative;
            width: 100%;
            min-height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            transition: all .3s;

            &-title {
                @media screen and (max-width: 600px) {
                    font-size: 16px;
                }

                font-size: 18px;
                cursor: pointer;
            }

            &:hover {
                color: rgba(240, 99, 196, 0.9);

                &::before {
                    transition: all .3s;
                    background-color: rgba(240, 99, 196, 0.9);
                }
            }

            &::before {
                content: "";
                width: 10px;
                height: 10px;
                position: absolute;
                left: 0;
                top: 50%;
                transform: translate(0, -50%);
                border-radius: 100%;
                border: 1px solid rgb(73, 177, 245);
            }
        }
    }

    &-mask {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        background-color: rgba(0, 0, 0, 0.5);
        transition: opacity 0.3s;
    }
}



.search-result-item-info {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    align-content: center;

    span {
        line-height: 1.5em;
        font-size: 14px;
        color: #858585;
        cursor: pointer;
    }

    @media screen and (max-width:500px) {
        max-width: 200px;
    }

    .tags {
        word-wrap: break-word;
    }
}

.tag:not(:last-child) {
    &::after {
        content: "·";
        font-size: 25px;
        margin: -8px;
        vertical-align: middle;
    }
}
</style>