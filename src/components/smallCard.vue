<template>
    <div class="category_card_container">
        <!-- 分类卡片 -->
        <div class="category_card" :class="{active:active}" :style="{backgroundColor:`${color[Math.floor(Math.random()*7)]}`}">{{name}} <span v-if="num">{{ ' ' + num }}</span></div>
    </div>
</template>

<script setup>

const props = defineProps({
    name:{
        type:String,
        default:'小卡片'
    },
    num:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        default:false
    }
})

let color = reactive([
    'rgb(249, 235, 234)',
    'rgb(245, 238, 248)',
    'rgb(213, 245, 227)',
    'rgb(232, 248, 245)',
    'rgb(254, 249, 231)',
    'rgb(248, 249, 249)',
    'rgb(130, 224, 170)'
])

</script>

<style lang="less" scoped>
.category_card_container{
    .category_card{
        margin: 10px;
        border-radius: 10px;
        padding: 10px 20px;
        height: 50px;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        font-weight: 700;
        box-shadow: 1px 1px 10px 1px rgba(0, 0, 0, 0.1);
        transition: all 0.5s;
        cursor: pointer;
    }
    .category_card:hover{
        color: #fff;
        font-weight: 800;
        background-color: rgb(44, 173, 69) !important;
    }
    .active{
        color: #fff;
        font-weight: 800;
        background-color: rgb(44, 173, 69) !important;
    }
}
</style>