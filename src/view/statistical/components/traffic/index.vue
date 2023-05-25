<template>
    <div class="traffic">
        <div class="header">
            <div class="title">网站访客统计📈</div>
        </div>
        <div class="main">
            <el-button @click="getData">获取数据</el-button>
        </div>
    </div>
</template>

<script setup>
import { getTraffic } from '../../../../api/getTraffic'

const getData = async () => {
    const res = await getTraffic()
    console.log(res);
}

</script>

<style lang="less" scoped>
.header {
    height: 50px;

    .title {
        font-size: large;
        font-weight: 700;
    }
}
</style>