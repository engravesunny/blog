<template>
    <div class="miniCard">
        <div class="top">
            <img :src="`${postImgUrl}/${postInfo.postImg}`" alt="">
        </div>
        <div class="bottom">{{ postInfo.name }}</div>
    </div>
</template>

<script setup lang="ts">
import { postImgUrl } from '@/constant';
defineProps({
    postInfo: {
        type: Object,
        default: {
            name: "postpostpostpostpostpostpostpostpostpostpostpostpostpostpostpostpostpost",
            postImg: "31.webp"
        }
    }
})
</script>

<style lang="less" scoped>
.miniCard {
    box-sizing: border-box;
    width: 200px;
    height: 166px;
    border: var(--minicard-border);
    flex-shrink: 0;
    margin-left: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background: linear-gradient(to right, #72e8ff, #a9e3f8);

    .top {
        width: 100%;
        height: 70%;

        img {
            width: 100%;
            height: 100%;
        }
    }

    .bottom {
        width: 100%;
        height: 48px;
        line-height: 24px;
        font-size: 15px;
        font-weight: 700;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-break: break-all;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
}
</style>