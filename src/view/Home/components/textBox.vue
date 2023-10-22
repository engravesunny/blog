<template>
    <div class="textBox">
        <div class="text shenglue" :title="text"><span class="iconfont">{{ getIcon('评论') }}</span>{{ text }}</div>
        <div class="author"> {{ "——" + author }}</div>
    </div>
</template>

<script setup lang="ts">
import getIcon from '@/utils/icon'

defineProps({
    text: {
        type: String,
        default: '这是一句话'
    },
    author: {
        type: String,
        default: '作者'
    }
})

</script>

<style lang="less" scoped>
.textBox {
    width: 100%;
    display: flex;
    font-size: 15px;
    font-weight: 700;
    justify-content: space-between;

    .text {
        flex: 1;
        text-align: left;
    }

    .iconfont {
        font-size: 18px;
        margin-right: 5px;
    }
}
</style>