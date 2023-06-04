<template>
    <div class="mark">
        <div class="dailog unselectable">
            <div class="top">
                <div class="title">{{ ablum }}</div>
                <div class="close iconfont" @click="close">&#xe60a;</div>
            </div>
            <div v-if="currentIndex > 0" class="left iconfont" @click="changeImg('pre')">&#xe658;</div>
            <div v-if="currentIndex < length - 1" class="right iconfont" @click="changeImg('next')">&#xe659;</div>
            <img :src="src" alt="相册图片">
            <div class="page-num">{{ (currentIndex + 1) + ' / ' + length }}</div>
        </div>
    </div>
</template>

<script setup>
import pubsub from 'pubsub-js'

const props = defineProps({
    src: {
        type: String,
        default: 'http://kecat.top/images/sese/175.webp'
    },
    ablum: {
        type: String,
        default: '标题'
    },
    length: {
        type: Number,
        default: 0
    },
    currentIndex: {
        type: Number,
        default: 0
    }
})

const emit = defineEmits(['closeImg', 'changeIndex'])
const close = () => {
    emit('closeImg')
}

const changeImg = (to) => {
    if (to === 'pre') {
        emit('changeIndex', props.currentIndex - 1)
        pubsub.publish('openImg', { index: props.currentIndex - 1 })
    } else {
        emit('changeIndex', props.currentIndex + 1)
        pubsub.publish('openImg', { index: props.currentIndex + 1 })
    }
}

</script>

<style lang="less" scoped>
.mark {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    width: 100vw;
    height: 100vh;
    z-index: 999;
}

.dailog {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        height: 80vh;
    }

    position: fixed;
    top: 70px;
    left: 50%;
    box-sizing: border-box;
    transform: translate(-50%);
    width: 85vw;
    height: 90vh;
    background-color: rgba(255, 255, 255, 1);
    z-index: 999;
    border-radius: 15px;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    padding: 60px 0 40px 0;
    overflow: hidden;

    img {
        width: 100%;
        object-fit: contain;
    }

    .top {
        position: fixed;
        top: 0px;
        width: 100%;
        height: 50px;
        background-color: #aca3a3;
        box-shadow: 1px 1px 20px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;

        .title {
            font-size: 18px;
            color: #fff;
        }

        .close {
            font-size: 22px;
            cursor: pointer;
            color: #333;
            font-weight: 700;
        }

        .close:hover {
            color: aliceblue;
        }
    }

    .page-num {
        position: fixed;
        bottom: 3px;
        padding: 5px 40px;
        background-color: #333;
        border-radius: 20px;
        color: #fff;
        font-size: 13px;
    }

    .right,
    .left {
        @media screen and (min-width: 300px) and (max-width: 500px) {
            font-size: 25px;
            border: 1px solid rgba(0, 0, 0, 0.2);
            padding: 10px;
            right: 5px;
        }

        position: fixed;
        right: 20px;
        top: 40%;
        font-size: 40px;
        padding: 20px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        transition: box-shadow 0.2s;
        color: #fff;
        mix-blend-mode: difference;
    }

    .left {
        @media screen and (min-width: 300px) and (max-width: 500px) {
            left: 5px;
        }

        left: 20px;
        right: unset;
    }

    .left:hover,
    .right:hover {
        box-shadow: 1px 1px 10px 2px rgba(236, 20, 20, 0.7);
    }

    .left:active,
    .right:active {
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0);
    }
}
</style>
