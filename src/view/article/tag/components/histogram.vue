<template>
    <div id="main"></div>
</template>

<script setup>
import toPath from '../../../../utils/toPath';
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    TooltipComponent,
    MarkLineComponent,
    MarkPointComponent,
    GridComponent
} from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { onBeforeMount } from 'vue';

echarts.use([
    TitleComponent,
    TooltipComponent,
    MarkLineComponent,
    MarkPointComponent,
    BarChart,
    CanvasRenderer,
    GridComponent
]);


var option;

// prettier-ignore
let dataAxis = [];
// prettier-ignore
let data = [];

option = {
    title: {
        text: 'Top 10 标签统计图',
        textAlign: 'center',
        left: '50%'
    },
    tooltip: {

    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            color: '#333'
        },
        axisTick: {
            show: true
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
            name: '标签统计',
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: '#83bff6' },
                    { offset: 0.5, color: '#188df0' },
                    { offset: 1, color: '#188df0' }
                ])
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: '#2378f7' },
                        { offset: 0.7, color: '#2378f7' },
                        { offset: 1, color: '#83bff6' }
                    ])
                }
            },
            data: data,
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ],
                label: {
                    color: '#fff'
                },
                itemStyle: {
                    color: '#188df0'
                }
            },
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
// Enable data zoom when user click bar.
const zoomSize = 6;


var myChart = null

const props = defineProps({
    tag: {
        type: Array,
        default: []
    }
})

let toTag = (name) => {
    toPath('/tag', name)
}

const handleMount = () => {
    var chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    myChart.on('click', function (params) {
        toTag(params.name)
    });
}

const handleRemount = () => {
    myChart.clear()
    var chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    option && myChart.setOption(option);
    myChart.on('click', function (params) {
        toTag(params.name)
    });
}

let timer = null

onMounted(() => {
    handleMount()

})

onBeforeMount(() => {
    let tagList = [...props.tag]
    tagList.sort((a, b) => {
        return a.num - b.num;
    })
    tagList = tagList.slice(-10, tagList.length)
    tagList.map(item => {
        dataAxis.unshift(item.name)
        data.unshift(item.num)
    })
})

</script>

<style lang="less" scoped>
#main {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: center;
}
</style>