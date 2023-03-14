<template>
    <div class="tagList_container">
        <div class="tags_box">
            <div class="tags_item" v-for="(item,index) in tagList" :key="index">
                <div class="tags_text" :style="{fontSize:`${(1+item.num/5)*multiple}px`,color:`${textColor[Math.floor(Math.random()*7)]}`}">
                    {{item.name}}
                    <div v-if="isShowNum" class="num">
                        {{item.num}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const route = useRoute()

let multiple = ref(15)

let textColor = reactive([
    'rgb(133, 200, 234)',
    'rgb(195, 132, 224)',
    'rgb(37, 93, 168)',
    'rgb(0, 70, 132)',
    'rgb(244, 192, 161)',
    'rgb(164, 85, 68)',
    'rgb(212, 242, 104)',
    'rgb(219, 160, 50)'
])

let tagList = reactive([
    {name:'标签1',num:1},
    {name:'标签2',num:1},
    {name:'标签3',num:1},
    {name:'标签4',num:1},
    {name:'标签5',num:1},
    {name:'标签6',num:1},
    {name:'标签7',num:7},
    {name:'标签8',num:8},
    {name:'标签9',num:9},
    {name:'标签10',num:10},
    {name:'标签11',num:4},
    {name:'标签12',num:4},
    {name:'标签13',num:4},
    {name:'标签14',num:4},
    {name:'标签15',num:16},
    {name:'标签16',num:4},
    {name:'标签17',num:4},
    {name:'标签18',num:4},
    {name:'标签19',num:18},
    {name:'标签20',num:9},
    {name:'标签21',num:9},
    {name:'标签22',num:13},
    {name:'标签23',num:9},
    {name:'标签24',num:9},
])

let isShowNum = ref(true)

onMounted(()=>{
    tagList = tagList.sort(()=>{ return Math.random()-0.5})
})

watch(()=>route,(val)=>{
    if(val.path==='/home'){
        isShowNum.value = false
        multiple.value = 8
    }
},{
    deep:true,
    immediate:true
})

</script>

<style lang="less" scoped>
    .tagList_container{

        width: 100%;
        .tags_box{
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex-wrap: wrap;
        }
        .tags_item{
            margin: 25px;
        }
        .tags_text{
            position: relative;
            cursor: pointer;
        }
        .tags_text:hover{
            color: rgb(237, 168, 168)!important;
            text-decoration: underline;
        }
        .num{
            font-size: 18px;
            position: absolute;
            top: -5px;
            right: -10px;
            
        }
    }
</style>