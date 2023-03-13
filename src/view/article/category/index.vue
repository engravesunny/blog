<template>
    <div class="categoryPage_container unselectable">
        <div class="categoryPage">
            <div class="top">
                <!-- 分类标题 -->
                <div class="title"><h1>Post Categories</h1></div>

                <div class="category_card_container">
                    <!-- 分类卡片 -->
                    <div class="category_card">分类</div>

                </div>

            </div>

            <div class="article_list_display">
                <!-- 返回按钮 -->
                <div class="over">
                    <div class="back">返回</div>
                </div>
                <!-- 具体分类列表展示 -->
                <div class="article_list">
                    <articleList></articleList>
                </div>

            </div>

        </div>

    </div>
</template>

<script setup>
import articleList from '../../../components/articleList.vue';

</script>

<style lang="less" scoped>
    .categoryPage_container{
        margin-top: 75px;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        .categoryPage{
            padding: 20px;
            position: relative;
            border-radius: 10px;
            border: 1px solid #fff;
            width: 60%;
            background: rgba(255, 255, 255, 0.5);
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
            display: flex;
            flex-direction: column;
            .top{
                width: 100%;
                display: flex;
                flex-direction: column;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 25px;
                padding: 20px;
                align-items: center;
                .title{
                    font-size: 2em;
                    margin: 0 0 30px 0;
                }
                .category_card_container{
                    width: 100%;
                    display: flex;
                    flex: 1;
                    justify-content: flex-start;
                    align-items: center;
                    .category_card{
                        margin: 10px;
                        border-radius: 10px;
                        padding: 10px 20px;
                        height: 50px;
                        text-align: center;
                        line-height: 30px;
                        font-size: 16px;
                        font-weight: 700;
                        background-color: #fff;
                    }
                }
            }
        }
    }
</style>