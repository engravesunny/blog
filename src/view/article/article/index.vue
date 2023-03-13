<template>
    <div class="article_container line-numbers match-braces">
        <article ref="article" class="article">
            <div class="markdown-body" v-html="html"></div>
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
import { getPost } from '@/api/post'

let showRightNav = ref(true)

let html = ref('')

onMounted(()=>{
    const {data} = getPost().then(res=>{
        const converter =new showdown.Converter();
        const htmlOutput =converter.makeHtml(res.data);
        html.value = htmlOutput
        
    }).then(()=>{
        const pres = document.querySelectorAll('pre')
        pres.forEach(pre=>{
            pre.setAttribute('data-prismjs-copy','复制')
            pre.setAttribute('data-prismjs-copy-success','复制成功!')
        })
    }).then(()=>{
        Prism.highlightAll();
    }).catch(error=>{
        console.log(error);
    })
})

</script>

<style lang="less" scoped>

    .article_container{
        margin-top: 75px;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        .article{
            position: relative;
            border-radius: 25px;
            width: 60%;
            padding: 40px;
            background: rgba(123, 123, 123, 0.5);
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
            display: flex;
            .markdown-body{
                margin-right: 40px;
                justify-content: space-between;
                width: 100%;
                padding: 30px;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.5);
            }
        }
    }
</style>