<template>
    <div class="container unselectable">
        <div class="Page"  :style="{width:`${defaultWidth}%`}">
            <div class="top">
                <!-- 分类标题 -->
                <div class="title"><h1>Post Tags</h1></div>
                <smallCard></smallCard>
            </div>

            <!-- 标签概览列表 -->
            <div class="tagList">
                <tagList></tagList>
            </div>

            <!-- 文章卡片列表 -->
            <div v-if="false" class="article_list_display">
                <!-- 具体分类列表展示 -->
                <div class="article_list">
                    <!-- 返回按钮 -->
                    <div class="over">
                        <div class="back iconfont">&#xe60b; 返回</div>
                    </div>
                    <articleList></articleList>
                </div>
            </div>
            <rightNav v-if="showRightNav"></rightNav>
        </div>
        <placeOrder v-if="showRightNav"></placeOrder>
    </div>
</template>

<script setup>
import smallCard from '../../../components/smallCard.vue'
import tagList from './components/tagList.vue'
import placeOrder from '../article/components/placeOrder.vue';
let showRightNav = ref(true)

let defaultWidth = ref(60)

</script>

<style lang="less" scoped>
.container{
        margin-top: 75px;
        position: relative;
        width: 100%;
        display: flex;
        justify-content: center;
        .Page{
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
                box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
                .title{
                    font-size: 2em;
                    margin: 0 0 30px 0;
                }
            }
            .tagList{
                width: 100%;
                margin-top: 20px;
                box-shadow: 1px 1px 10px 2px rgba(0, 0, 0, 0.1);
                padding: 20px;
                border-radius: 25px;
                background: rgba(255, 255, 255, 0.8);
            }
            .article_list_display{
                width: 100%;
                .over{
                    margin-left: 40px;
                    margin-top: 40px;
                    width: 100%;
                    height: 60px;
                    .back{
                        width: 80px;
                        display: block;
                        font-size: 20px;
                        line-height: 60px;
                        color: rgb(0, 0, 0);
                        cursor: pointer;
                    }
                    .back:hover{
                        color: rgba(0, 0, 0, 0.5);
                    }
                }
                .article_list{
                    margin-top: 20px;
                    width: 100%;
                    background-color: rgba(255, 255, 255, 0.5);
                    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
                    border-radius: 25px;
                    border: 1px solid #fff;
                }
            }
        }
    }
</style>