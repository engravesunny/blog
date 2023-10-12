<template>
    <div class="latestArt">
        <div class="title box_border">最新文章</div>
        <div class="articles">
            <div class="card">
                <div class="ar_item" v-for="item in arList" :key="item">
                    <smallArCard :postName="item.name"></smallArCard>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import smallArCard from '../../../components/smallArCard.vue';

const props = defineProps({
    arList: {
        type: Array,
        default: []
    }
})

</script>

<style lang="less" scoped>
.latestArt {
    margin: 20px 0;
    width: 100%;

    display: flex;
    flex-direction: column;

    .title {
        font-size: 30px;
        padding: 20px;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 10px;
        // box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
    }

    .articles {
        width: 100%;
        display: flex;

        .card {
            width: 100%;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            align-items: center;

            .ar_item {
                margin: 2px 0;
                border-radius: 10px;
                width: 100%;
            }
        }
    }
}
</style>