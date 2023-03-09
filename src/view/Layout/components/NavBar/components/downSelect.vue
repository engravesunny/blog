<template>
    <div  v-if="chirlden.length" class="downSelect_container">
        <ul>
            <li v-for="item in chirlden" :key="item.name">
                <span class="iconfont">{{ getFileIcon(item.name) }}</span> {{ item.name }}
            </li>
        </ul>
    </div>
</template>

<script setup>
import getFileIcon from '../../../../../utils/icon'

import 'animate.css'

const props = defineProps({
    chirlden:{
        type:Array,
        default:[]
    }
})

onMounted(()=>{
    
})


</script>
<style lang="less" scoped>

.downSelect_container{
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    overflow: hidden;
    animation: fadeIn; /* referring directly to the animation's @keyframe declaration */
    animation-duration: 0.5s; /* don't forget to set a duration! */
    box-shadow: 1px 1px 10px 2px rgba(255, 255, 255, 0.1);
    li{
        transition: all 0.5s;
    }
    li:hover{
    background: rgba(255, 255, 255, 0.5);

    }
}
</style>