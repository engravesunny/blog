<template>
    <!-- github，qq，微信，邮箱等等 -->
    <div class="btn">
        <div class="email iconfont"><a href="https://outlook.live.com/" target="_blank" class="iconfont email_text">&#xe908;</a></div>
        <div class="qq iconfont"><a href="http://wpa.qq.com/msgrd?v=3&uin=3170557037&site=qq&menu=yes" target="_blank" class="iconfont qq_text">&#xe882;</a></div>
        <div class="wechat iconfont"><a href="" target="_blank" class="iconfont wechat_text">&#xe883;</a></div>
        <div class="github iconfont"><a href="https://github.com/engravesunny?tab=repositories" target="_blank" class="iconfont github_text">&#xe885;</a></div>
        <div class="netease-cloud-music iconfont"><a href="https://music.163.com/#/user/home?id=427854158" target="_blank" class="iconfont netease-cloud-music_text">&#xe753;</a></div>
        <div class="bilibili iconfont"><a href="https://space.bilibili.com/244375982/dynamic" target="_blank" class="iconfont bilibili_text">&#xe62c;</a></div>
    </div>
    <!-- github，qq，微信，邮箱等等 -->
</template>

<script setup>

</script>

<style lang="less" scoped>
    .animate_flash_fast{
        animation: flash;
        animation-duration: 1.2s;
        animation-iteration-count: infinite;
    }
    .btn{
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            margin-bottom: 10px;
            .email,.netease-cloud-music,.qq,.wechat,.github,.bilibili{
                .email_text,.netease-cloud-music_text,.qq_text,.wechat_text,.github_text,.bilibili_text{
                    font-size: 50px;
                }
                border-radius: 15px;
                box-sizing: border-box;
                margin: 5px;
                width: 90px;
                height: 80px;
                text-align: center;
                line-height: 80px;
                font-size: 50px;
                color: #000;
                background-color: skyblue;
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                cursor: pointer;
            }
            .email:hover,.netease-cloud-music:hover,.qq:hover,.wechat:hover,.github:hover,.bilibili:hover{
                box-shadow:  0 0 12px 3px rgba(0, 0, 0, 0.2);
            }
            .bilibili{
                line-height: 75px;
            }
            .bilibili a{
                font-size: 40px;
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