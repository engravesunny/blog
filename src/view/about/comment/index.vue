<template>
    <div>
        <el-card style="width:55vw;height:60vh">
            <div style="float:left">
                <p style="font-size:40px;font-family:'仓耳渔阳体 W03';font-weight:900">万分抱歉！！！</p>
                <p style="font-size:40px;font-family:'仓耳渔阳体 W03';font-weight:900">这个模块还在开发ing</p>
            </div>
            <img src="" style="float:left;width:25vw" alt="" />

            <el-button type="primary" @click="handleClick">测试</el-button>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { updateJSON } from '@/utils/updateJSON'

const handleClick = async () => {
    // const { data} = await getPOSTJSON()
    updateJSON('test', ['test'], '100.webp', Date.now(), 'test');
}

</script>

<style lang="scss" scoped></style>