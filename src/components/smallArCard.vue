<template>
    <div class="smallArCard_container" @click="toArticle">
        <div class="left">
            <img loading="lazy" :src="`${baseURL}/image/${Math.floor(Math.random()*23)}.webp`" alt="">
        </div>
        <div class="right">
            <div class="top">
                <div class="title"><p>{{ postName }}</p></div>
            </div>
            <div class="bottom">
                <div class="date iconfont">&#xe663; {{ dateInfo }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { baseURL } from '../constant';
import { getAllFileInfo, getDirNames } from '../api/postApi';
const router = useRouter()
let dateInfo = ref('')

let tagInfo = reactive([])

const props = defineProps({
    postName:{
        type:String,
        default:'文章标题'
    }
})
// 获取日期信息
let getDateInfo = async (val) => {
    tagInfo.splice(0,tagInfo.length)
    const {data:tag_info} = await getDirNames({
        dir_path:'./posts/postVirtual/' + val.postName + '/tag'
    })
    tag_info.data.dir_names.forEach(item => {
        tagInfo.push(item)
    });
}
// 获取标签信息
let getTagInfo = async(val) => {
    const {data:date_info} = await getAllFileInfo({
        dir_path:'./posts/postVirtual/' + val.postName + '/'
    })
    dateInfo.value = date_info.data.files[0].mod_time
}
let toArticle = () => {
    router.push({
        path:'/article',
        query:{
            postName:props.postName,
            date:dateInfo.value,
            tag:tagInfo
        }
    })
}
watch(()=>props,(val)=>{
    getDateInfo(val)
    getTagInfo(val)
},{
    deep:true,
    immediate:true
})

</script>

<style lang="less" scoped>
    .smallArCard_container{
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        transition: transform 0.3s;
        cursor: pointer;
        .left{
            position: relative;
            width: 30%;
            height: 80px;
            padding: 10px;
            text-align: center;
            overflow: hidden;
            img{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                border-radius: 5px;
                height: 100%;
                transition: height 0.5s;
            }
            img:hover{
                height: 120%;
            }
        }
        .right{
            width: 70%;
            .top{
                width: 100%;
                height: 70%;
                .title{
                    width: 100%;
                    font-size: 16px;
                    font-weight: 700;
                    text-align: left;
                    padding: 5px;
                    p{
                        display: -webkit-box;
                        overflow: hidden;
                        word-wrap: break-word;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        text-overflow: ellipsis;
                    }
                }
            }
            .bottom{
                width: 100%;
                height: 30%;
                .date{
                    text-align: left;
                    padding: 3px;
                    font-size: 14px;
                    color: gray;
                }
            }
        }
    }
    .smallArCard_container:hover{
        box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.2);
        transform: translate(0,-5px);
    }
</style>