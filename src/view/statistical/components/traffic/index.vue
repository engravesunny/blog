<template>
    <div class="traffic">
        <div class="header">
            <div class="title">网站访客统计📈</div>
        </div>
        <div class="main">
            <div class="content">
                <div class="today_ip">
                    <div class="des">今日人数</div>
                    <div class="data">{{ pv_info.today_ip }}</div>
                </div>
                <div class="yesterday_ip">
                    <div class="des">昨日人数</div>
                    <div class="data">{{ pv_info.yesterday_ip }}</div>
                </div>
                <div class="today_pv">
                    <div class="des">今日访问</div>
                    <div class="data">{{ pv_info.today_pv }}</div>
                </div>
                <div class="yesterday_pv">
                    <div class="des">昨日访问</div>
                    <div class="data">{{ pv_info.yesterday_pv }}</div>
                </div>
                <div class="month_pv">
                    <div class="des">本月访问</div>
                    <div class="data">{{ pv_info.month_pv }}</div>
                </div>
                <div class="total_pv">
                    <div class="des">总访问</div>
                    <div class="data">{{ pv_info.total_pv }}</div>
                </div>
            </div>
            <div class="from">
                <span>数据来源: </span><span><a href="https://v6.51.la/" target="_blank"> 51la</a></span>
            </div>
        </div>
        <el-button @click="getData">获取数据</el-button>
    </div>
</template>

<script setup>
import { getTraffic } from '../../../../api/getTraffic'

const pv_info = reactive({
    today_ip: 0,
    today_pv: 0,
    yesterday_ip: 0,
    yesterday_pv: 0,
    month_pv: 0,
    total_pv: 0
})

const getData = async () => {
    const { data } = await getTraffic()
    const bean = data.bean
    pv_info.today_ip = bean.curIp
    pv_info.today_pv = bean.curPv
    pv_info.yesterday_ip = bean.beforeIp
    pv_info.yesterday_pv = bean.beforePv
    pv_info.month_pv = bean.monthPv
    pv_info.total_pv = bean.totalPv
}

onBeforeMount(async () => {
    await getData()
})

</script>

<style lang="less" scoped>
.traffic {
    width: 100%;
}

.header {
    width: 100%;
    height: 50px;
    text-align: center;

    .title {
        font-size: large;
        font-weight: 700;
    }
}

.main {
    width: 100%;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    overflow: hidden;
    background-image: linear-gradient(to top, #9de4c6, #cff6ee);

    .content {
        width: 100%;
        min-height: 100px;
        display: flex;
        justify-content: space-between;
        padding: 15px 15px;
        flex-wrap: wrap;

        .des {
            margin: 10px;
            margin-left: 0;
            font-size: 15px;
            color: #1f1f1f;
            font-weight: 700;
            min-width: 100px;
        }

        .data {
            font-size: 32px;
            color: #1f1f1f;
            font-weight: 700;
        }
    }

    .from {
        padding: 15px;

        a {
            color: #A591e0;
        }
    }
}
</style>