<template>
    <div class="friendMe">
        <div class="img1">
            <img loading="lazy" src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/emo2.gif" alt="">
        </div>
        <div class="right">
            <iconsFriend></iconsFriend>
            <!-- 个人描述 -->
            <div class="description">
                <p>我轻度社恐（正在努力克服）,但或许我们有些共同的兴趣,或许我们可以成为志同道合的朋友</p>
            </div>
            <!-- 个人描述 -->
        </div>
    </div>
</template>

<script setup>
import iconsFriend from '../../../components/iconsFriend.vue';
</script>

<style lang="less" scoped>

.friendMe{
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    background: rgba(255,255, 255, 0.9);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    .right{
        float: right;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;      
        .description{
            display: flex;
            width: 100%;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            background-color: rgba(0, 0, 0, 0);
            // background-color: #fff;
            font-size: 2vh;
            font-weight: 700;
        }
    }
    .img1{
        width: 100%;
        float: left;
        img{
            border-radius: 15px;
            width: 100%;
        }
    }
}
    
</style>