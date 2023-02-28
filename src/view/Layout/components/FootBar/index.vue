<template>
    <div class="footBar_container unselectable">
        <div class="top">
            <div class="left">
                <div class="title">待写入</div>
            </div>
            <div class="right">
                <div class="item">待写入</div>
                <div class="item">待写入</div>
                <div class="item">待写入</div>
            </div>
        </div>
        <div class="bottom">
            <div class="mes1">Copyright © 2023 刻猫猫的笔记本</div>
            <div class="mes2">
                <img src="../../../../assets/img/icp.png" alt="">
                <a href="https://beian.miit.gov.cn/" _blank>鲁ICP备XXXXXXXX号</a>
                </div>
        </div>
    </div>
</template>


<style lang="less" scoped>
.footBar_container{
    width: 100%;
    height: 252px;
    background-color: rgba(0, 0, 0,0.5);
    display: flex;
    flex-direction: column;
    .top{
        width: 100%;
        height: 150px;
        border-bottom: 1px solid rgba(255, 255, 255,0.5);
        .left{
            float: left;
            width: 30%;
            height: 100%;
            border-right: 1px solid rgba(255, 255, 255,0.5);
            text-align: center;
            line-height: 150px;
            .title{
                font-size: 30px;
                color: rgba(255, 255, 255,0.7);
            }
        }
        .right{
            width: 65%;
            height: 100%;
            float: right;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .item{
                font-size: 30px;
                color: rgba(255, 255, 255,0.7);
            }
        }
    }
    .bottom{
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        align-items: center;
        color: rgba(255, 255, 255,0.7);
        .mes2{
            margin: 5px 0;
            cursor: pointer;
            color: rgba(255, 255, 255,0.7);
            a{
                color: rgba(255, 255, 255,0.7);
            }
        }
        a:hover{
            color: rgba(255, 255, 255,0.3);
        }
    }
}
    
</style>