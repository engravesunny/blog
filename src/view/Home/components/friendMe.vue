<template>
    <div class="friendMe">
        <div class="left">
            <div class="img1">
                <img loading="eager" src="http://kecat.top/img/emo2.gif" alt="">
            </div>
            <div class="img2">
                <img src="../../../assets/img/emo1.gif" alt="">
            </div>
        </div>
        <div class="right">
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
            <!-- 个人描述 -->
            <div class="description">
                <p>我轻度社恐（正在努力克服）,但或许我们有些共同的兴趣,或许我们可以成为志同道合的朋友</p>
            </div>
            <!-- 个人描述 -->
        </div>
    </div>
</template>

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