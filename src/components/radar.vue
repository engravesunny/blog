<template>
  <!-- 雷达图  图表必须给高和宽度-->
  <div id="main" class="radar-echart" />
</template>

<script setup>
import * as echarts from 'echarts'
import { TitleComponent, LegendComponent, ToolboxComponent } from 'echarts/components';
import { RadarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, ToolboxComponent]);


const props = defineProps({
  categoryList: {
    type: Array,
    default: []
  },
  categoryLength: {
    type: Array,
    default: []
  }
})
let radarList = []
let categoryLengthInfo = []
let categoryLength = []
// 指定图表的配置项和数据
let option = {
  title: {
    text: '文章分类'
  },
  legend: {
    data: ['文章分类']
  },
  tooltip: {},
  radar: {
    // shape: 'circle',
    indicator: radarList
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: categoryLength,
          name: '文章分类'
        }
      ]
    }
  ]
};
let myChart = null

onMounted(() => {
  myChart = echarts.init(document.getElementById('main'));
  // 使用刚指定的配置项和数据显示图表。

})

watch(() => props, (val) => {
  radarList.splice(0, radarList.length)
  categoryLengthInfo.splice(0, categoryLengthInfo.length)
  categoryLength.splice(0, categoryLength.length)
  val?.categoryList?.forEach(item => {
    radarList.push({
      name: item,
      max: 50
    })
  });
  val?.categoryLength?.forEach(item => {
    categoryLengthInfo.push(item)
  });
  categoryLengthInfo.sort((a, b) => {
    return val.categoryList.indexOf(a.name) - val.categoryList.indexOf(b.name)
  })
  categoryLengthInfo.forEach(item => {
    categoryLength.push(item.value)
  })
  if (myChart) {
    myChart.setOption(option);
  }
}, {
  deep: true,
  immediate: true
})

</script>

<style>
.radar-echart {
  @media screen and (min-width:300px) and (max-width:500px) {
    width: 370px;
  }

  width: 100%;
  height: 500px;
}
</style>
