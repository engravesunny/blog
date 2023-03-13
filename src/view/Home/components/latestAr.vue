<template>
    <div class="latestArt">
        <div class="title">最新文章</div>
        <div class="articles">
            <div class="card">
                <arCard></arCard>
            </div>
        </div>
    </div>
</template>

<script setup>
    import arCard from '../../../components/arCard.vue';
</script>

<style lang="less" scoped>
    .latestArt{
        margin: 20px 0;
        width: 100%;
        padding: 20px;
        background: rgba(255,255, 255, 0.5);
        display: flex;
        flex-direction: column;
        align-items: center;

        border-radius: 25px;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
        .title{
            font-size: 30px;
        }
        .articles{
            width: 100%;
            display: flex;
            .card{
                width: 32%;
                border-radius: 25px;
            }
        }
    }
</style>