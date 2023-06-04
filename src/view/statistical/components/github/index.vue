<template>
    <div class="github fadeIn">
        <div class="header">
            <div class="title">
                Github贡献日历📊
            </div>
        </div>
        <div class="main">
            <div class="left">
                <div class="weeks" v-for="item in weeksMap" :key="item.top"
                    :style="{ top: `${item.top * (1 / 7) * 100}%` }">
                    {{ item.week }}
                </div>
            </div>
            <div class="right">

                <div class="right-top">
                    <div class="month" v-for="item in monthMap" :key="item.mounth"
                        :style="{ left: `${item.left * (1 / 52.5) * 100}%` }">
                        {{ monthList[item.mounth - 1] }}
                    </div>
                </div>
                <div class="right-main">

                    <div class="main-col" v-for="item in data" :key="(item as any)?.firstDay">
                        <div class="main-row" @mousemove="$event => throttle($event)" @mouseleave="handleMouseOutDay"
                            @mouseenter="$event => handleMouseInDay($event, day)"
                            v-for="day in (item as any).contributionDays" :key="day.date"
                            :style="{ backgroundColor: day.color }">
                        </div>
                    </div>
                </div>
                <div :style="{ left: infoBoxLeft + 'px', top: infoBoxTop + 'px' }" class="show-info"
                    v-if="showDateInfo && currentDay">
                    <span class="text">
                        {{ currentDay + ' ' + ' ' + '共提交' + commitCount + '次' }}
                    </span>
                </div>
                <div class="right-bottom">
                    <div class="from">
                        数据来源<a href="https://github.com/Engravesunny" target="_blank">@engravesunny</a>
                    </div>
                    <div class="legend">
                        <div class="content">
                            <span class="text">Less</span>
                            <div class="color_box" v-for="item in color" :key="(item as string)"
                                :style="{ backgroundColor: item as string }">
                            </div>
                            <span class="text">More</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div class="container">
                <div class="content" v-for="(item, index) in dataInfo" :key="(item.time as string)"
                    :class="{ contentFirst: (index as unknown) as number === 0 }">
                    <div class="des">{{ item.des }}</div>
                    <div class="count">{{ item.count }}</div>
                    <div class="time">{{ item.time }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import 'animate.css'

import { ref, reactive, onMounted, watch } from 'vue'

enum monthList {
    '一月',
    '二月',
    '三月',
    '四月',
    '五月',
    '六月',
    '七月',
    '八月',
    '九月',
    '十月',
    '十一月',
    '十二月'
}

const weeksMap = [
    { week: '一', top: 0 },
    { week: '三', top: 2 },
    { week: '五', top: 4 },
    { week: '日', top: 6 }
]

const currentDay = ref('')
const commitCount = ref('')

const showDateInfo = ref(false)

const infoBoxLeft = ref(0)
const infoBoxTop = ref(0)

const handleMouseInDay = (e, item) => {
    infoBoxLeft.value = e.pageX
    infoBoxTop.value = e.pageY
    showDateInfo.value = true
    currentDay.value = item.date
    commitCount.value = item.contributionCount
}

const handleMouseOutDay = () => {
    showDateInfo.value = false
}

const handleMouseMoveMain = (e) => {
    infoBoxLeft.value = e.pageX
    infoBoxTop.value = e.pageY
}

let timer: any;

const throttle = (e) => {
    if (timer) {
        return
    } else {
        timer = setTimeout(() => {
            handleMouseMoveMain(e)
            timer = null
        }, 30);
    }
}


const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    color: {
        type: Array,
        default: []
    },
    dataInfo: {
        type: Object,
        deault: []
    }
})

interface MounthMap {
    left: number
    mounth: number
}

const monthMap = reactive<MounthMap[]>([])

interface ContributionDays {
    color: string
    contributionCount: number
    date: string
    weekday: number
}

interface Date {
    contributionDays: ContributionDays[]
    firstDay: string
}

const comMonthMap = (data: Date[]) => {
    monthMap.length = 0
    let tempColCount = 0
    data.map(item => {
        const month = +item.firstDay.split('-')[1]
        const day = +item.firstDay.split('-')[2]
        if (day < 10) {
            if (day > 1) {
                if ((day - 7) > 0) {
                    // nothing
                } else {
                    tempColCount--;
                    monthMap.push({ left: tempColCount, mounth: month })
                    tempColCount++;
                }

            } else {
                monthMap.push({ left: tempColCount, mounth: month })
            }
        }
        tempColCount++;
    })
    console.log(monthMap);

}

onMounted(() => {
    comMonthMap((props.data as Date[]))
})
</script>

<style lang="less" scoped>
.fadeIn {
    animation: fadeIn;
    animation-duration: 1s;
}

.github {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        padding: 0px 0px;
    }

    width: 100%;
    box-sizing: border-box;
    padding: 20px 10px;
    text-align: center;
    min-width: 300px;

    .header {
        height: 50px;

        .title {
            font-size: large;
            font-weight: 700;
        }
    }

    .main {
        width: 100%;
        display: flex;
        justify-content: flex-start;

        .left {
            flex: 1;
            padding-top: 32px;
            padding-bottom: 35px;
            display: flex;
            flex-direction: column;
            align-content: flex-end;
            justify-content: space-between;

            .weeks {
                @media screen and (min-width: 300px) and (max-width: 500px) {
                    font-size: 12px;
                }

                text-align: right;
                color: #aea2a2;
                padding-right: 2px;
            }
        }

        .right {
            position: relative;
            width: 95%;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            align-items: flex-end;

            .right-top {

                float: right;
                min-width: 850px;
                position: relative;
                width: 100%;
                height: 30px;
                line-height: 30px;

                .month {
                    position: absolute;
                    font-size: 14px;
                    color: #aea2a2;
                }
            }

            .show-info {
                position: fixed;
                padding: 8px 10px;
                background-color: #333;
                min-width: 200px;
                z-index: 1;
                transform: translateX(-50%) translateY(-160%);
                transition: left 100ms;
                transition: top 100ms;
                border-radius: 5px;

                .text {
                    color: #fff;
                    width: 100%;
                    height: 100%;
                    position: relative;
                    font-size: 15px;
                }

                .text::before {
                    content: '';
                    position: absolute;
                    width: 0px;
                    height: 0px;
                    border: 10px solid transparent;
                    border-top-color: #333;
                    top: 140%;
                    left: 47.5%;
                }

            }

            .right-main {
                float: right;
                min-width: 850px;
                position: relative;
                aspect-ratio: 52/7;

                width: 100%;
                display: flex;

                .weeks {
                    position: absolute;
                    left: -1.5%;
                    font-size: 12px;
                    color: #aea2a2;
                }

                .main-col {
                    width: calc((1/52)*100%);
                    margin: 0 2px;
                    box-sizing: border-box;
                    height: 100%;
                    display: flex;
                    flex-direction: column;

                    // background-color: #333;
                    .main-row {
                        box-sizing: border-box;
                        margin: 2px 0;
                        aspect-ratio: 1;
                        width: 100%;
                        border-radius: 3px;
                        transition: transform 0.1s;
                    }

                    .main-row:hover {
                        transform: scale(1.1);
                        cursor: pointer;
                        z-index: 1;
                    }
                }
            }

            .right-bottom {
                width: 100%;
                height: 30px;
                display: flex;
                justify-content: space-between;
                align-items: center;

                .from {
                    @media screen and (min-width: 300px) and (max-width: 500px) {
                        font-size: 12px;
                    }

                    a {
                        color: rgb(98, 98, 219);
                    }
                }

                .legend {
                    .content {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin: 0 5px;

                        .text {
                            margin: 0 5px;
                            color: #6e6767;
                            font-size: 12px;
                            font-weight: 100;
                        }

                        .color_box {
                            aspect-ratio: 1;
                            height: 12px;
                        }
                    }
                }
            }
        }
    }

    .footer {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        margin-bottom: 20px;

        .container {
            margin-top: 10px;
            width: 100%;
            height: 100%;
            display: flex;

            .content {
                width: calc((1/3)*100%);
                height: 100%;
                border-left: 1px solid #ddd;
                border-top: 1px solid #ddd;
                padding: 10px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;

                .des {
                    font-size: 12px;
                    font-weight: 100;
                    color: #1f1f1f;
                }

                .count {
                    font-size: 24px;
                    font-weight: 300;
                    color: #1f1f1f;
                }

                .time {
                    font-size: 12px;
                    font-weight: 100;
                    color: #1f1f1f;
                }
            }

            .contentFirst {
                border-left: 0;
            }


        }


    }
}
</style>