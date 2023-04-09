<template>
    <div class="rightNav">
        <el-scrollbar height="90vh">
            <articleDir :articleDir="headings" v-if="showArticleDir"></articleDir>
            <aboutMe></aboutMe>
            <div class="icons">
                <iconsFriend></iconsFriend>
            </div>
            <latestAr :arList="rightArList"></latestAr>
            <div class="articleDir">
                <div class="title">公告</div>
                <div class="dir">
                    
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import articleDir from './articleDir.vue';
import latestAr from '@/view/Home/components/latestAr.vue';
import aboutMe from './aboutMe.vue'
import iconsFriend from './iconsFriend.vue';
import { getDirNames } from '@/api/postApi.js'
const route = useRoute()
let showArticleDir = ref(false)
let rightArList = reactive([])
let getPosts = async() => {
    // 获取文章
    const { data:arList } = await getDirNames({
        dir_path:"./posts/postVirtual"
    })
    for(let i = 0;i < 5;i++){
        rightArList.push(arList.data.dir_names[arList.data.dir_names.length - i - 1])
    }
}

let headings = reactive([])

let updateArticleDir = () => {
    headings.splice(0,headings.length)
    const headingTags = document.querySelectorAll("h1, h2");

    // 初始化最后一级标题的变量
    let lastLevelHeadings = [];

    // 遍历所有的标题标签
    for (let i = 0; i < headingTags.length; i++) {
        const headingTag = headingTags[i];
        let top = headingTag.offsetTop;
        // 根据标题的级别确定标题的深度
        const level = parseInt(headingTag.tagName.replace("H", ""));
        const title = headingTag.textContent;

        // 生成目录结构，包括标题内容和链接
        const heading = {
            id: `heading-${i}`,
            title,
            level,
            top,
            children: []
        }
        // 如果标题的级别比前一个标题的级别高，则将前一个标题的 children 更新为当前标题
        if (level > lastLevelHeadings[lastLevelHeadings.length - 1]?.level) {
        lastLevelHeadings[lastLevelHeadings.length - 1].children.push(heading);
        } else {
        // 否则找到当前标题的上一级标题，并将其作为当前标题的 parent
        while (lastLevelHeadings.length > 0 && level <= lastLevelHeadings[lastLevelHeadings.length - 1].level) {
            lastLevelHeadings.pop();
        }

        if (lastLevelHeadings.length > 0) {
            lastLevelHeadings[lastLevelHeadings.length - 1].children.push(heading);
        } else {
            headings.push(heading);
        }
        }

        lastLevelHeadings.push(heading);
    }
}

onMounted(()=>{
    getPosts()
    PubSub.subscribe('getHead',()=>{
        updateArticleDir()
    })
})

watch(()=>route,(val)=>{
    if(val.path==='/article'){
        showArticleDir.value = true
    }
},{
    deep:true,
    immediate:true
})
</script>

<style lang="less" scoped>
    .rightNav{
        position: fixed;
        top: 75px;
        right: 9vw;
        width: 20vw;
        height: 65vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 25px;
        overflow: hidden;
        box-shadow: 8px 8px 20px 1px rgba(0, 0, 0, 0.1);
        z-index: 1;
        .left{
            width: 100%;
            border-right: 0;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 25px;
            margin: 10px 0;
            margin-top: 0;
        }
        .icons{
            width: 100%;
            display:flex;
            justify-content: center;
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 25px;
            margin: 10px 0;
            padding: 10px;
        }
        .articleDir{
            margin: 10px 0;
            width: 100%;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 20px;
            border-radius: 25px;
            .title{
                text-align: center;
                width: 100%;
                height: 50px;
                font-size: 20px;
                font-weight: 700;
            }
            .dir{
                width: 100%;
                height: 500px;
            }
        }
    }
</style>