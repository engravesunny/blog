<template>
    <div class="container" @wheel.stop.prevent @click="handleClose" v-if="showDisplay">
        <div class="box">
            <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    callbacks?: Function[],
    showDisplay: boolean
}>()
const emits = defineEmits(['updateShowDisplay'])
const handleClose = () => {
    emits('updateShowDisplay')
}
</script>

<style lang="less" scoped>
.container {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
}

.box {
    padding: 50px;
}
</style>