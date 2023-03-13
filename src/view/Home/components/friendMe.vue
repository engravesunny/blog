<template>
    <div class="friendMe">
        <div class="left">
            <div class="img1">
                <img loading="lazy" src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/emo2.gif" alt="">
            </div>
            <div class="img2">
                <img loading="lazy" src="https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/emo1.gif" alt="">
            </div>
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
    background: rgba(255,255, 255, 0.5);
    display: flex;
    justify-content: space-between;
    border-radius: 25px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    .right{
        float: right;
        width: 25%;
        min-width: 255px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-left: 30px;
        border-left: 2px solid rgba(0, 0, 0, 0.5);
        .description{
            display: flex;
            width: 220px;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            background-color: rgba(0, 0, 0, 0);
            // background-color: #fff;
            font-size: 2vh;
            font-weight: 700;
        }
    }
    .left{
        width: 70%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        float: left;
        background-color: rgba(0, 0, 0, 0);
        // background-color: #fff;
        padding-right: 10px;
        .img1{
            width: 60%;
            float: left;
            img{
                border-radius: 15px;
                width: 100%;
            }
        }
        .img2{
            width: 33.5%;
            float: right;
            img{
                border-radius: 15px;
                width: 100%;
            }
        }
    }
}
    
</style>