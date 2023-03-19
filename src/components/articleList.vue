<template>
    <div class="articleList">
        <ul>
            <li :style="{width:`${liWidth}%`}" v-for="item in articleList" :key="item">
                <arCard :postName="item"></arCard>
            </li>
        </ul>
    </div>
</template>

<script setup>
import arCard from './arCard.vue';

const props = defineProps({
    articleList:{
        type:Array,
        default:[]
    }
})

let liWidth = ref(45)

onMounted(()=>{
    if(document.body.clientWidth<=1000){
        liWidth.value=95
    }
    PubSub.subscribe('articleListSizeChange',(a,size)=>{
        if(size<=1000){
            liWidth.value=95
        } else {
            liWidth.value = 45
        }
    })
})

</script>

<style lang="less" scoped>
    .articleList{
        width: 100%;
        padding: 30px;
        ul{
            width: 100%;
            li{
                display: inline-block;
                margin: 10px;
                width: 45%;
            }
        }
    }
</style>