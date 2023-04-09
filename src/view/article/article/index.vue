<template>
    <div class="article_container line-numbers match-braces">

        <article ref="article" :style="{width:`${defaultWidth}%`}" class="article">
            <div class="top">
                <div class="title iconfont">&#xe634; {{ postName }}</div>
                <div class="bottom">
                    <div class="date iconfont">&#xe663; {{ date }}</div>
                    <div class="tagList iconfont">
                        <div class="tag shenglue iconfont" v-for="item in tagList" :key="item">&#xe62f; {{ item }}</div>
                    </div>
                </div>
            </div>
            <div v-loading="loading" class="markdown-body" v-html="html"></div>
            <rightNav v-if="showRightNav"></rightNav>
        </article>
        <placeOrder v-if="showRightNav"></placeOrder>
    </div>
</template>

<script setup>
import rightNav from '../../../components/rightNav.vue'
import placeOrder from './components/placeOrder.vue';
import 'github-markdown-css'
import Prism from 'prismjs';
import showdown from 'showdown';
import getPost from '@/api/post'

let loading = ref(false)

let showRightNav = ref(true)

let defaultWidth = ref(55)

let html = ref('')

let postName = ref('文章标题')
let date = ref('')
let tagList = reactive([])

const route = useRoute()

onMounted(()=>{
    
    if(document.body.clientWidth<1000){
        defaultWidth.value = 80
        showRightNav.value = false
    }
    PubSub.subscribe('closeSide',()=>{
        defaultWidth.value = 80
        showRightNav.value = false
    })
    PubSub.subscribe('openSide',()=>{
        defaultWidth.value = 55
        showRightNav.value = true
    })
})

watch(()=>route,(val)=>{
    if(val.path==='/article'){
        loading.value = true
        tagList.splice(0,tagList.length)
        postName = val.query.postName
        date = val.query.date
        if(val?.query?.tag?.forEach){
            val?.query?.tag?.forEach(item=>{
                tagList.push(item)
            })
        } else {
            tagList.push(val?.query?.tag)
        }
        getPost(encodeURIComponent(val.query.postName+'.md')).then(res=>{
            const converter =new showdown.Converter();
            const htmlOutput =converter.makeHtml(res.data);
            html.value = htmlOutput
        }).then(()=>{
            const pres = document.querySelectorAll('pre')
            pres.forEach(pre=>{
                pre.setAttribute('data-prismjs-copy','复制')
                pre.setAttribute('data-prismjs-copy-success','复制成功!')
            })
            loading.value = false
        }).then(()=>{
            Prism.highlightAll();
            PubSub.publish('getHead')
            loading.value = false
        }).catch(error=>{
            loading.value = false
            console.log(error);
            
        })
    }
},{
    deep:true,
    immediate:true
})

</script>

<style lang="less" scoped>

    .article_container{
        margin-top: 75px;
        position: relative;
        width: 100%;
        min-height: 900px;
        display: flex;
        justify-content: center;
        .article{
            position: relative;
            border-radius: 25px;
            width: 50%;
            min-width: 375px;
            padding: 40px;
            background: rgba(123, 123, 123, 0.5);
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
            .top{
                border-radius: 10px;
                margin: 0 0 20px 0;
                width: 100%;
                height: 100px;
                background: rgba(255, 255, 255, 0.9);
                display: flex;
                flex-direction: column;
                .title{
                    padding: 20px;
                    height: 50%;
                    font-size: 25px;
                    font-weight: 700;
                }
                .bottom{
                    display: flex;
                    justify-content: space-between;
                    width: 100%;
                    flex: 1;
                    align-items: center;
                    padding: 0 20px;
                    .date{
                        font-size: 14px;
                        color: gray;
                        width: 200px;
                    }
                    .tagList{
                        flex: 1;
                        display: flex;
                        justify-content: flex-end;
                        .tag{
                            padding: 3px 5px;
                            background-color: #000;
                            color: #fff;
                            margin: 0 5px;
                            border-radius: 5px;
                            font-weight: 700;
                            transition: all 0.5s;
                            cursor: pointer;
                        }
                        .tag:hover{
                            color: #000;
                            background-color: #fff;
                        }
                    }
                }
            }
            .markdown-body{
                margin-right: 40px;
                justify-content: space-between;
                width: 100%;
                padding: 30px;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.9);
            }
        }
    }
</style>