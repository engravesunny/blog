<template>
    <div v-if="chirlden.length" class="downSelect_container">
        <ul>
            <li v-for="item in chirlden" :key="item.name" @click="nextTo(item)">
                <span class="iconfont">{{ getFileIcon(item.name) }}</span> {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import getFileIcon from '../../../../../utils/icon'
import 'animate.css'
import PubSub from 'pubsub-js';

let nextTo = (item) => {
    PubSub.publish('nextTo', item)
    PubSub.publish('toTop')
}

const props = defineProps({
    chirlden: {
        type: Array,
        default: []
    }
})


</script>
<style lang="less" scoped>
.downSelect_container {
    position: absolute;
    top: 55px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 120px;
    transform: translateX(-10px);
    border-radius: 10px;
    animation: fadeIn;
    animation-duration: 0.5s;
    background-color: #fff;
    box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);

    li {
        min-width: 120px;
        max-width: 200px;
        line-height: 20px;
        transition: all 0.3s;
        color: #000;
        border-radius: 10px;
        padding: 10px 5px 10px 3px;
    }

    li:hover {
        transform: translateY(-1px);
        box-shadow: 2px 5px 8px 1px rgba(0, 0, 0, 0.2);
        background-color: #fff;
    }

    li:active {
        transition: unset;
        transform: translateY(0px);
        box-shadow: 0px 2px 8px 1px rgba(0, 0, 0, 0.1);
    }
}

.downSelect_container:hover {
    transition: box-shadow 1s;
    box-shadow: unset;
}
</style>