<template>
    <div class="article">
        <div class="title">
            <div class="tag iconfont" :class="{active:showWhat === 'tag'}" @click="showTag">&#xe62f; 文章标签</div>
            <div class="category iconfont" :class="{active:showWhat === 'category'}" @click="showCategory">&#xe811; 文章分类</div>
            <div class="strip" :style="{transform:`translate(${stripTranslateX}%)`}"></div>
        </div>
        <div class="display">
            <div v-if="showWhat==='tag'" class="tag_art">
                <tagList></tagList>
            </div>
            <div v-if="showWhat==='category'" class="category_art">
                <smallCard></smallCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import tagList from '../../article/tag/components/tagList.vue';
import smallCard from '../../../components/smallCard.vue';

let stripTranslateX = ref(310)

let showWhat = ref('category')

let showTag = () => {
    stripTranslateX.value = 65
    showWhat.value = 'tag'
}
let showCategory = () => {
    stripTranslateX.value = 310
    showWhat.value = 'category'
}


</script>


<style lang="less" scoped>

.article{
    margin: 20px 0;
    width: 100%;
    background: rgba(255,255, 255, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;
    .title{
        position: relative;
        width: 100%;
        background: rgba(255,255, 255, 0.9);
        border-radius: 25px;
        padding: 20px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        .strip{
            width: 20%;
            height: 6px;
            background-color: rgb(142, 133, 122);
            position: absolute;
            bottom: 0;
            transition: transform 0.3s;
        }
        .tag{
            float: left;
            width: 49%;
            font-size: 22px;
            border-right: 3px solid gray;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.5s;
        }
        .category{
            float: right;
            width: 50%;
            font-size: 22px;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.5s;
        }
        .tag:hover,.category:hove{
            color: rgb(142, 133, 122);
        }
        .active{
            color: rgb(142, 133, 122);
        }
    }
    .display{
        width: 100%;
        background: rgba(255,255, 255, 0.9);
        border-radius: 25px;
        padding: 20px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    }
}
    
</style>