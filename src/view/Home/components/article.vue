<template>
    <div class="article">
        <div class="title">
            <div class="tag shenglue iconfont" :class="{active:showWhat === 'tag'}" @click="showTag">&#xe62f; 文章标签</div>
            <div class="category shenglue iconfont" :class="{active:showWhat === 'category'}" @click="showCategory">&#xe811; 文章分类</div>
            <div class="strip" :style="{transform:`translate(${stripTranslateX}%)`}"></div>
        </div>
        <div class="display">
            <div v-if="showWhat==='tag'" class="category_art">
                <smallCard @click="toTag(item)" v-for="item in tagList" :key="item" :name="item"></smallCard>
            </div>
            <div v-if="showWhat==='category'" class="category_art">
                <smallCard @click="toCategory(item)" v-for="item in categoryList" :key="item" :name="item"></smallCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import smallCard from '../../../components/smallCard.vue';
import { getDirNames } from '../../../api/postApi';
let stripTranslateX = ref(300)

let showWhat = ref('category')

const router = useRouter()

let timer = null

let toTag = (name) => {
    router.push('/tag')
    timer = setTimeout(() => {
        PubSub.publish('toTag',name)
        clearTimeout(timer)
    }, 500);
}
let toCategory = (name) => {
    router.push('/category')
    timer = setTimeout(() => {
        PubSub.publish('toCategory',name)
        clearTimeout(timer)
    }, 200);
}

let showTag = () => {
    stripTranslateX.value = 75
    showWhat.value = 'tag'
}
let showCategory = () => {
    stripTranslateX.value = 300
    showWhat.value = 'category'
}

let categoryList = reactive([]) 
let tagList = reactive([])

let getInfo = async() => {
    categoryList.splice(0,categoryList.length)
    tagList.splice(0,tagList.length)
    const { data:category } = await getDirNames({
        dir_path:'./posts/category'
    })
    category.data.dir_names.forEach(item => {
        categoryList.push(item)
    });
    const { data:tags } = await getDirNames({
        dir_path:'./posts/tag'
    })
    tags.data.dir_names.forEach(item => {
        tagList.push(item)
    });
}

onMounted(()=>{
    getInfo()
})

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
        .category_art{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    }
}
    
</style>