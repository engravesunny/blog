<template>
    <!-- github，qq，微信，邮箱等等 -->
    <div class="btn">
        <div class="email iconfont"><a href="https://outlook.live.com/" target="_blank">&#xe908;</a></div>
        <div class="qq iconfont"><a href="http://wpa.qq.com/msgrd?v=3&uin=3170557037&site=qq&menu=yes" target="_blank">&#xe882;</a></div>
        <div class="wechat iconfont"><a href="" target="_blank">&#xe883;</a></div>
        <div class="github iconfont"><a href="https://github.com/engravesunny?tab=repositories" target="_blank">&#xe885;</a></div>
        <div class="netease-cloud-music iconfont"><a href="https://music.163.com/#/user/home?id=427854158" target="_blank">&#xe753;</a></div>
        <div class="bilibili iconfont"><a href="https://space.bilibili.com/244375982/dynamic" target="_blank">&#xe62c;</a></div>
    </div>
    <!-- github，qq，微信，邮箱等等 -->
</template>

<script setup>

</script>

<style lang="less" scoped>
    .btn{
            width: 240px;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .email,.netease-cloud-music,.qq,.wechat,.github,.bilibili{
                border-radius: 15px;
                box-sizing: border-box;
                margin: 10px;
                width: 50px;
                height: 50px;
                text-align: center;
                line-height: 50px;
                font-size: 40px;
                color: #000;
                background-color: skyblue;
                cursor: pointer;
            }
            .bilibili{
                line-height: 45px;
            }
            .bilibili a{
                font-size: 33px;
                color: #f14767;
            }
            .qq a{
                color: #4cafe9;
            }
            .wechat a{
                color:#4cbf00;
            }
            .netease-cloud-music a{
                color: #e72d2c;
            }
        }
</style>