<template>
    <div class="mark">
        <div class="dailog unselectable">
            <div class="top">
                <div class="title">标题</div>
                <div class="close iconfont" @click="close">&#xe60a;</div>
            </div>
            <div class="left iconfont">&#xe658;</div>
            <div class="right iconfont">&#xe659;</div>
            <img src="http://kecat.top/images/sese/175.webp" alt="">
        </div>
    </div>
</template>

<script setup>

const emit = defineEmits(['closeImg'])
const close = () => {
    emit('closeImg')
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
    position: fixed;
    top: 70px;
    left: 50%;
    transform: translate(-50%);
    width: 85vw;
    height: 90vh;
    background-color: rgba(255, 255, 255, 1);
    z-index: 999;
    border-radius: 15px;
    box-shadow: 2px 2px 10px 1px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: center;
    padding: 60px 0 10px 0;
    overflow: hidden;

    img {
        width: auto;
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

    .left {
        position: fixed;
        left: 20px;
        top: 40%;
        font-size: 40px;
        padding: 20px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
    }

    .right {
        position: fixed;
        right: 20px;
        top: 40%;
        font-size: 40px;
        padding: 20px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
    }

    .left {
        position: fixed;
        left: 20px;
        top: 40%;
        font-size: 40px;
        padding: 20px;
        border-radius: 50%;
        background-color: #fff;
        text-align: center;
        cursor: pointer;
    }

    .left:hover,
    .right:hover {
        background-color: #e2e0e0;
    }
}
</style>