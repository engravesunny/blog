<template>
    <div class="left" :class="{ box_border: route.path !== '/home' }">
        <div class="avatar">
            <img @click="toMe" class="animateImg" src="https://www.kecat.top/other/logo.png" alt="">
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
            <a href="https://github.com/engravesunny" target="_blank">
                <el-button type="primary" class="button">
                    GITHUB
                </el-button>
            </a>
        </div>
    </div>
</template>

<script setup>
import 'animate.css'
import { post } from '@/store/post'
import { category } from '@/store/category'
import { tag } from '@/store/tag';
const route = useRoute()
const router = useRouter()
const postStore = post();
const postInfo = postStore.$state;
const categoryInfo = category().$state;
const tagInfo = tag().$state;

let arNum = ref(postInfo.postInfo.length)
let caNum = ref(categoryInfo.categoryInfo.length)
let tagNum = ref(tagInfo.tagInfo.length)
const toMe = () => {
    router.push('/me')
}
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
            width: 140px;
            height: 140px;
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