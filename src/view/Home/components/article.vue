<template>
    <div class="article">
        <div class="title">
            <div class="tag">文章标签</div>
            <div class="category">文章分类</div>
        </div>
        <div class="display">
            <div class="tag_art">
            </div>
            <div class="category_art"></div>
        </div>
    </div>
</template>

<script setup>

</script>


<style lang="less" scoped>

.article{
    margin: 20px 0;
    width: 100%;
    padding: 20px;
    background: rgba(255,255, 255, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    .title{
        width: 100%;
        background: rgba(255,255, 255, 0.5);
        border-radius: 25px;
        padding: 20px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        margin-bottom: 20px;
        .tag{
            float: left;
            width: 49%;
            font-size: 22px;
            border-right: 3px solid gray;
        }
        .category{
            float: right;
            width: 50%;
            font-size: 22px;
        }
    }
    .display{
        width: 100%;
        background: rgba(255,255, 255, 0.5);
        border-radius: 25px;
        padding: 20px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    }
}
    
</style>