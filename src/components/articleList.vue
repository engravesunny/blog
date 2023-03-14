<template>
    <div class="articleList">
        <ul>
            <li>
                <arCard></arCard>
            </li>
            <li>
                <arCard></arCard>
            </li>
        </ul>
    </div>
</template>

<script setup>
import arCard from './arCard.vue';
</script>

<style lang="less" scoped>
    .articleList{
        width: 100%;
        padding: 30px;
        ul{
            width: 100%;
            li{
                display: inline-block;
                margin: 10px;
                width: 45%;
            }
        }
    }
</style>