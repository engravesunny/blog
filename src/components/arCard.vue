<template>
    <div @click="toArticle" v-animate="'animate_zoomIn'" class="card_container">
        <div class="top">
            <img loading="lazy" :src="`https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/${Math.floor(Math.random()*23)}.webp`" alt="">
        </div>
        <div class="bottom">
            <div class="bTop">
                <div class="left">
                    <div class="title shenglue">{{ postName }}</div>
                    <div class="publishTime iconfont">&#xe663;{{dateInfo}}</div>
                </div>
                <div class="right">
                    <div @click.stop="toCategory" class="category iconfont shenglue">&#xe811;{{ category }}</div>
                </div>
            </div>
            <div class="bBottom">
                <div @click.stop="toTag(item)" class="tag iconfont" v-for="item in tags" :key="item">&#xe62f; {{ item }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { getDirNames, getAllFileInfo } from '@/api/postApi.js'
const router = useRouter()
const props = defineProps({
    postName:{
        type:String,
        default:'文章标题'
    }
})
// 分类名
let category = ref('')
// 标签信息
let tags = reactive([])
// 日期信息
let dateInfo = ref('')

// 获取分类信息
let getCategory = async() => {
    const { data:categoryName } = await getDirNames({
        dir_path:'./posts/postVirtual/' + props.postName + '/category'
    })
    category.value = categoryName.data.dir_names[0]
}
// 获取标签信息
let getTag = async() => {
    tags.splice(0,tags.length)
    const { data:tagList } = await getDirNames({
        dir_path:'./posts/postVirtual/' + props.postName + '/tag'
    })
    tagList.data.dir_names.forEach(element => {
        tags.push(element)
    });
}
// 获取日期信息
let getDateInfo = async () => {
    const {data:date_info} = await getAllFileInfo({
        dir_path:'./posts/postVirtual/' + props.postName + '/'
    })
    dateInfo.value = date_info.data.files[0].mod_time
}
let timer = null
// 跳转
let toCategory = () => {
    router.push('/category')
    timer = setTimeout(() => {
        PubSub.publish('toCategory',category.value)
        clearTimeout(timer)
    }, 200);
}
let toTag = (item) => {
    router.push('/tag')
    timer = setTimeout(() => {
        PubSub.publish('toTag',item)
        clearTimeout(timer)
    }, 500);
}
let toArticle = () => {
    router.push({
        path:'/article',
        query:{
            postName:props.postName,
            date:dateInfo.value,
            tag:tags,
            category:category.value
        }
    })
}

onMounted(()=>{
    getCategory()
    getTag()
    getDateInfo()
})

</script>

<style lang="less" scoped>
    .animate_zoomIn{
        animation: zoomIn; 
        animation-duration: 1s; 
    }
    .card_container{
        width: 100%;
        min-width: 290px;
        padding: 20px;
        border-radius: 25px;
        background: rgba(255, 255, 255, 0.8);
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        transition: all 0.5s;
        cursor: pointer;
        .top{
            position: relative;
            border-radius: 20px;
            width: 100%;
            height: 180px;
            text-align: center;
            transition: all 0.5s;
            overflow: hidden;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                width: 100%;
                object-fit: cover;
                transition: width 0.5s;
            }
            img:hover{
                width: 120%;
            }
        }
        .bottom{
            margin: 10px 0;
            width: 100%;
            height: 110px;
            // background-color: pink;
            .bTop{
                width: 100%;
                height: 60%;
                padding: 5px 10px;
                border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);
                .left{
                    width: 65%;
                    float: left;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    .title{
                        text-align: start;
                        font-size: 18px;
                        font-weight: 700;
                        width: 100%;
                        height: 60%;
                        // background-color: black;
                    }
                    .publishTime{
                        text-align: start;
                        height: 30%;
                        padding: 5px;
                        line-height: 10px;
                        font-size: 12px;
                        font-weight: 700;
                        color: gray;
                        // background-color: gray;
                    }
                }
                .right{
                    width: 30%;
                    float: right;
                    height: 100%;
                    text-align: center;
                    .category{
                        line-height: 50px;
                        font-size: 15px;
                        font-weight: 700;
                        width: 100%;
                        height: 100%;
                        padding: 5px;
                        cursor: pointer;
                    }
                    .category:hover{
                        color: #989898;
                    }
                }
            }
            .bBottom{
                width: 100%;
                padding: 3px;
                display: flex;
                justify-content: flex-start;
                flex-wrap: wrap;
                .tag{
                    margin: 2px 5px;
                    padding: 0px 5px;
                    font-size: 14px;
                    line-height: 30px;
                    text-align: center;
                    color: #fff;
                    font-weight: 700;
                    height: 30px;
                    border-radius: 5px;
                    background-color: #000;
                    cursor: pointer;
                    transition: all 0.5s;
                }
                .tag:hover{
                    background-color: #fff;
                    color: #000;
                }
            }
        }
    }
    .card_container:hover{
        box-shadow: 5px 5px 20px 1px rgba(0, 0, 0, 0.2);
        transform: translate(0,-5%);
    }
</style>