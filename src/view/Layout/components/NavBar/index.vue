<template>
    <div class="navbar_container unselectable">
        
        <!-- logo -->
        <div class="logo">
            <div class="logo_img">
                <img src="../../../../assets/img/logo.png" alt="">
            </div>
            <div class="logo_name">刻猫猫的笔记本</div>
        </div>
        <!-- logo -->

        <!-- 操作按钮 -->
        <div class="controls">
            <div 
            v-if="!showHam" 
            @mouseenter="showDownSelect(item)" 
            @mouseleave="closeDownSelect(item)" 
            ref="btn" 
            class="btn" 
            v-for="item in controls" 
            :key="item.path">
                {{ item.name }}
                <span v-if="item.children" class="iconfont">&#xe60c;</span>
                <span v-if="item.path === '/home'" class="iconfont">&#xe622;</span>
                <downSelect v-if="alive.name===item.name" :chirlden="item.children"></downSelect>
                <!-- <downSelect :chirlden="item.children"></downSelect> -->
            </div>
            <div class="input_box">

            </div>
            <!-- 面包菜单 -->
            <div v-if="showHam" class="btn ham_box iconfont">&#xe606;</div>
            <!-- 面包菜单 -->
        </div>
        <!-- 操作按钮 -->

    </div>
</template>

<script setup>
import { reactive } from 'vue';
import downSelect from './components/downSelect.vue';
let showHam = ref(false) 

let alive = reactive({
    name:''
})

let controls = reactive(
    [
    {
        name:'首页',
        path:'/home'
    },
    {
        name:'文章',
        children:[
            {
                name:'分类',
                path:'/category'
            },
            {
                name:'标签',
                path:'/tag'
            },
            {
                name:"归档",
                path:'/archive'
            }
        ]
    },
    {
        name:"导航",
        children:[
            {
                name:'常用网站',
                path:'commonWeb'
            },{
                name:'个人导航',
                path:'/privateWeb'
            }
        ]
    },
    {
        name:'媒体',
        children:[
            {
                name:'相册',
                path:'/album'
            },{
                name:'视频',
                path:'/video'
            },{
                name:'音乐',
                path:'/music'
            }
        ]
    },
    {
        name:'实验室',
        children:[
           {
                name:'暂无内容'
           }
        ]
    },
    {
        name:'关于',
        path:'/about'
    }
]
)
let timer = ref(null);

const showFn = () => {
    window.onresize = () => {
        if(document.body.clientWidth < 1000) {
            showHam.value = true
        } else {
             showHam.value = false
        }
    }
}

const showDownSelect = (item) => {
    timer.value = setTimeout(()=>{
        if(item.name !== '首页'){
            alive.name = item.name
        }
        clearTimeout(timer)
        timer.value = null
    },500)
}

const closeDownSelect = (item) => {
    if(timer.value){
        clearTimeout(timer.value)
        timer.value = null
    }
    alive.name = ''
}


onMounted(()=>{
    if(document.body.clientWidth<1000){
        showHam.value = true
    }
    showFn()
})


</script>

<style lang="less" scoped>
.navbar_container{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 55px;
    // background-color: pink;
    background: rgba(255,255,255,0.3);
    border-bottom:1px solid rgba(0, 0, 0, 0.1);
    .logo{
        float: left;
        width: 250px;
        height: 100%;
        // background-color: #fff;
        display: flex;
        align-items: center;
        .logo_img{
            img{
                width: 75px;
                height: 75px;
            }
        }
        .logo_name{
            font-size: 25px;
            font-weight: 700;
        }
    }
    .controls{
        padding: 0 10px;
        float: right;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        // background-color: #fff;
        .btn{
            margin: 0 5px;
            width: 90px;
            height: 55px;
            font-size: 16px;
            text-align: center;
            line-height: 55px;
            cursor: pointer;
            border-radius: 10px;
            transition: all 0.5s;
        }
        .btn:hover{
            background-color: rgba(255,255,255,0.5);
        }
        .ham_box{
            font-size: 20px;
        }
    }
}
</style>