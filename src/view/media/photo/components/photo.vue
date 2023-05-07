<template>
    <div ref="img" class="image fade_in" style="display: flex;flex-direction: column;">
        <!-- 加载中提示 -->
        <img v-if="loading" :src="`${baseURL}/image/loading.gif`">
        <img v-show="!loading" :src="src" @load="onload">
        <div v-if="title" class="title">
            {{ title }}
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import 'animate.css'
import { baseURL } from '../../../../constant';
const loading = ref(true)
const styleEnum = [
    'slower',
    'slower1',
    'slower-down',
    'faster',
    'faster1',
    'fastest',
    'vertical',
]

const img = ref()
const handleInit = () => {
    const randomNum = Math.floor(Math.random() * 7)
    img.value?.classList.add(styleEnum[randomNum])
}
const props = defineProps({
    title: {
        type: String,
        default: ''
    },
    src: {
        type: String,
        default: ''
    },
    album: {
        type: String,
        default: ''
    }
})
const onload = () => {
    loading.value = false
}
onMounted(() => {
    handleInit()
})
</script>

<style lang="less" scoped>
.fade_in {
    animation: fadeIn;
    animation-duration: 0.5s;
}

.image {
    margin: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform-origin: 50% 50%;
    transform: rotate(90deg) translateZ(.1px) scale(1.1) translateX(0) translateY(2vh);
    z-index: -1;
    cursor: pointer;

    .title {
        margin: 10px 10px;
        padding: 5px 10px;
        background-color: rgba(255, 255, 255, 0.9);
        min-width: 100px;
        font-size: 18px;
        border-radius: 5px;
        color: #333;
        text-align: center;
    }

    img {
        border: 10px solid #fff;
        max-width: 45vh;
        max-height: 50vh;
        min-width: 200px;
        min-height: 100px;
        transition: .5s;
    }

    img:hover {
        box-shadow: 0 10px 30px #86c4f7;
        transform: scale(1.05);
    }
}

.image:hover {
    z-index: 1;
}
</style>