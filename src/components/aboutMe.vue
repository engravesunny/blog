<template>
    <div class="left" :class="{ box_border: route.path !== '/home' }">
        <div class="avatar">
            <img @click="toMe" class="animateImg" src="https://gcore.jsdelivr.net/gh/engravesunny/CDN/image/avatar.jpg"
                alt="">
        </div>
        <div class="nav">
            <div class="article">
                <div>文章</div>
                <div>{{ arNum }}</div>
            </div>
            <div class="tag">
                <div>标签</div>
                <div>{{ tagNum }}</div>
            </div>
            <div class="category">
                <div>分类</div>
                <div>{{ caNum }}</div>
            </div>
        </div>
        <div class="btn">
            <a href="https://github.com/engravesunny?tab=repositories" target="_blank">
                <el-button type="primary" class="button">
                    GITHUB
                </el-button>
            </a>
        </div>
    </div>
</template>

<script setup>
import 'animate.css'
import { getDirNames } from '../api/postApi.js'
import { useRoute } from 'vue-router';
const route = useRoute()
const router = useRouter()
let arNum = ref(0)
let caNum = ref(0)
let tagNum = ref(0)
const toMe = () => {
    router.push('/me')
}
onMounted(async () => {
    if (!localStorage.getItem('ABOUT_ME')) {
        const { data: ar } = await getDirNames({
            dir_path: './posts/postVirtual'
        })
        arNum.value = ar.data.dir_names.length
        const { data: ca } = await getDirNames({
            dir_path: './posts/category'
        })
        caNum.value = ca.data.dir_names.length
        const { data: tag } = await getDirNames({
            dir_path: './posts/tag'
        })
        tagNum.value = tag.data.dir_names.length
        localStorage.setItem('ABOUT_ME', JSON.stringify({ arNum: arNum.value, caNum: caNum.value, tagNum: tagNum.value }))
    } else {
        const about_me = JSON.parse(localStorage.getItem('ABOUT_ME'))
        arNum.value = about_me.arNum
        caNum.value = about_me.caNum
        tagNum.value = about_me.tagNum
    }

})
</script>

<style lang="less" scoped>
.animateImg:hover {
    display: inline-block;
    animation: rubberBand;
    animation-duration: 1s;
}

.animateImg:active {
    transform: scale(0.9);
}

.left {
    width: 24%;

    .avatar {
        width: 100%;
        height: 120px;
        line-height: 120px;
        text-align: center;

        // background-color: skyblue;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            cursor: pointer;
        }
    }


    .nav {
        width: 100%;
        height: 55px;
        display: flex;
        justify-content: center;
        align-items: center;

        // background-color: pink;
        .article,
        .category {
            text-align: center;
            margin: 0 15px;
            font-size: 16px;
            font-weight: 700;
        }

        .tag {
            text-align: center;
            border-left: 1px solid #000;
            border-right: 1px solid #000;
            padding: 0 15px;
            font-size: 16px;
            font-weight: 700;
        }
    }

    .btn {
        text-align: center;
        margin: 10px 0;
        width: 100%;
        height: 40px;

        // background-color: rgb(238, 138, 138);
        .button {
            font-size: 16px;
            border-radius: 20px;
            font-weight: 700;
            border: none;
            width: 80%;
            height: 100%;
            color: #fff;
            background-color: #0665ff;
        }

        .button:hover {
            box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.3);
        }

        .button:active {
            box-shadow: unset;
        }
    }
}
</style>