<template>
    <!-- 个人描述等等 -->
    <div class="personAbout">
        <aboutMe></aboutMe>
        <!-- <div class="right">
            <p>
                很多人曾问我，搭建这么一个博客有何作用？只是为了在像宇宙般浩瀚的互联网上留下一点属于自己的足迹？确实，我是抱着这么一种心态来搭建这个博客的，也许不会有多少人进入到这个博客，也许这个博客不会传播多少有用的知识，但是我还是想在这片浩瀚之地，划出属于自己的一块乌托邦之地。写完一篇文章，部署后再自己反复观看，我觉得这是一种很愉悦的事情。在不知不觉中，你就会写下很多篇博文，可能只是记录生活，亦或者是教程，但这些都是美好的回忆，在五年十年后，再回过头来看这些自己曾经留下的足迹，这也是一件美好的事情。希望屏幕前的你，能从这个地方，收获到什么吧！
            </p>
        </div> -->
    </div>
    <!-- 个人描述等等 -->
</template>

<script setup>
import aboutMe from '../../../components/aboutMe.vue';
</script>

<style lang="less" scoped>
    .personAbout{
            border-radius: 25px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            background: rgba(255,255, 255, 0.9);
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
            .left{
                width: 100%;
            }
            .right{
                margin-left: 20px;
                float: right;
                width: 100%;
                display: flex;
                align-items: center;
                background-color: rgba(0, 0, 0, 0);
                // background-color: #fff;
                font-size: 2vh;
                font-weight: 700;
            }
        }
</style>