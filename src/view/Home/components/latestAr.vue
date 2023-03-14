<template>
    <div class="latestArt">
        <div class="title">最新文章</div>
        <div class="articles">
            <div class="card">
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
                <div class="ar_item">最新文章</div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
    .latestArt{
        margin: 20px 0;
        width: 100%;
        
        display: flex;
        flex-direction: column;
        .title{
            font-size: 30px;
            padding: 20px;
            background: rgba(255,255, 255, 0.9);
            border-radius: 25px;
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        }
        .articles{
            width: 100%;
            display: flex;
            .card{
                width: 100%;
                border-radius: 25px;
                display: flex;
                flex-direction: column;
                align-items: center;
                .ar_item{
                    margin: 5px 0;
                    border-radius: 10px;
                    width: 98%;
                    font-size: 20px;
                    padding: 10px 0;
                    background: rgba(255,255, 255, 0.9);
                    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
                    cursor: pointer;
                }
            }
        }
    }
</style>