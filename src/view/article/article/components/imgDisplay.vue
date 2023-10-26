<template>
    <div class="imgContainer" @wheel.stop.prevent @mouseup.stop="handleImgClose">
        <img @mousedown.stop="hanldeImgDragMove"
            :style="{ transform: `scale(${imgScale}) translate(${imgTranslateX}px, ${imgTranslateY}px)` }"
            @wheel.stop.prevent="handleImgWheel" :src="displayImgSrc" :alt="displayImgAlt">
    </div>
</template>

<script setup lang="ts">
import * as _ from 'lodash'

defineProps<{
    displayImgAlt: string,
    displayImgSrc: string,
}>()
const emits = defineEmits(['closeImgDisplay']);

const imgScale = ref(0.9);
const imgTranslateX = ref(0);
const imgTranslateY = ref(0);

const handleImgWheel = (e: WheelEvent) => {
    const wheelMove = e.deltaY;
    imgScale.value -= wheelMove / 500
    imgScale.value = imgScale.value < 0.3 ? 0.3 : imgScale.value
}
const hanldeImgDragMove = (e: MouseEvent) => {
    let target = e.target as HTMLImageElement;
    let initX = e.pageX / imgScale.value - imgTranslateX.value;
    let initY = e.pageY / imgScale.value - imgTranslateY.value;

    const hanldeImgMove = (moveEl: MouseEvent) => {
        let curX = moveEl.pageX / imgScale.value;
        let curY = moveEl.pageY / imgScale.value;
        let moveX = curX - initX;
        let moveY = curY - initY;
        imgTranslateX.value = moveX;
        imgTranslateY.value = moveY;
    }
    const handleImgMoveOver = (e: MouseEvent) => {
        e.stopPropagation();
        target.removeEventListener('mousemove', listenMoveFn);
        target.removeEventListener('mouseup', handleImgMoveOver)
    }
    const listenMoveFn = _.throttle(hanldeImgMove, 100);
    target.addEventListener('mousemove', listenMoveFn)
    target.addEventListener('mouseup', handleImgMoveOver);
}
const handleImgClose = () => {
    imgTranslateX.value = 0;
    imgTranslateY.value = 0;
    emits('closeImgDisplay');
}
</script>

<style lang="less" scoped>
.imgContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;

    img {
        border-radius: 5px;
        height: 100%;
        object-fit: contain;
        transition: transform 0.2s;
    }
}
</style>