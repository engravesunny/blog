<template>
    <photo @click="open(index)" v-for="(item, index) in photos" :key="item" :src="`${imgBaseURL}${ablum}/${item}`" />
</template>

<script setup>
import photo from './photo.vue';
import { imgBaseURL } from '../../../../constant';

const emit = defineEmits(['openImg'])

const props = defineProps({
    photos: {
        type: Array,
        default: []
    },
    ablum: {
        type: String,
        default: ''
    }
})
const open = (index) => {
    emit('openImg', index)
}

</script>

<style lang="less" scoped>
::-webkit-scrollbar {
    width: 1px;
    height: 1px;
}

.slower {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.12px) scale(1.3) translateX(0) translateY(-8vh) !important;

}

.slower1 {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.25px) scale(1.35) translateX(0) translateY(2vh) !important;
}

.slower-down {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.1px) scale(1) translateX(0) translateY(16vh) !important;
}

.faster {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.05px) scale(1.1) translateX(0) translateY(15vh) !important;
}

.faster1 {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(.05px) scale(1.4) translateX(0) translateY(10vh) !important;
}

.fastest {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(.22px) scale(0.7) translateX(-10vh) translateY(-15vh) !important;
}

.vertical {
    @media screen and (min-width: 300px) and (max-width: 400px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.1px) scale(1.6) translateX(0) translateY(-3vh) !important;
}</style>
