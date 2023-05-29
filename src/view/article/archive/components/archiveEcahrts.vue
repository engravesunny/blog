<template>
    <div id="main">

    </div>
</template>

<script setup>
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    MarkLineComponent,
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted } from 'vue';
echarts.use([
    TitleComponent,
    TooltipComponent,
    GridComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    MarkLineComponent
]);


const props = defineProps({
    dateInfo: {
        type: Array,
        default: []
    }
})
const dataKey = []
const dataValue = []
var option;

option = {
    color: ['#80FFA5', '#00DDFF', '#37A2FF', '#FF0087', '#FFBF00'],
    title: {
        text: '文章发布统计图',
        textAlign: 'center',
        left: '50%'
    },
    tooltip: {
        trigger: 'axis'
    },

    xAxis: {
        data: dataKey,
        boundaryGap: false,
        axisLabel: {
            color: '#333'
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true
        },
        z: 10
    },
    yAxis: {
        name: '文章篇数',
        axisLine: {
            show: true
        },
        axisTick: {
            show: false
        },
        axisLabel: {
            color: '#333'
        }
    },
    series: [
        {
            name: '文章统计',
            type: 'line',
            stack: 'Total',
            smooth: true,
            lineStyle: {
                width: 0
            },
            showSymbol: false,
            areaStyle: {
                opacity: 1,
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(128, 255, 165)'
                    },
                    {
                        offset: 1,
                        color: 'rgb(1, 191, 236)'
                    }
                ])
            },
            emphasis: {
                focus: 'series'
            },
            data: dataValue,
            markLine: {
                label: {
                    backgroundColor: 'transparent',
                },
                data: [{ type: 'average', name: '平均值' }],
                emphasis: {
                    lineStyle: {
                        color: '#188df0'
                    }
                }
            }
        }
    ]
};

onBeforeMount(() => {
    props.dateInfo.map(item => {
        dataKey.push(item.date)
        dataValue.push(item.value)
    })
})

onMounted(() => {
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
})

onBeforeMount(() => {

})

</script>

<style lang="less" scoped>
#main {
    width: 120%;
    min-height: 300px;
}
</style>