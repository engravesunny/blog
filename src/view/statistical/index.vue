<template>
  <div class="statistical_container">
    <div class="sta_main">
      <div class="header">
        <div class="site-info">
          <h1>网站统计</h1>
        </div>
        <waves />
      </div>
      <div class="layout">
        <div class="page">
          <div class="github" v-loading="loadingGithub">
            <github
              v-if="!loadingGithub"
              :data-info="commitInfo"
              :color="colorData"
              :data="githubData"
            >
            </github>
          </div>
          <div class="tarffic">
            <traffic></traffic>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getGithubToken } from "../../api/post";
import github from "./components/github/index.vue";
import traffic from "./components/traffic/index.vue";
import waves from "../../components/waves.vue";
import { getContribution } from "../../api/github";
import { reactive } from "vue";

const test = async () => {};

const githubData = reactive([]);
const colorData = reactive([]);
const loadingGithub = ref(true);

const yearData = reactive({
  des: "过去一年提交",
  count: 0,
  time: "",
});
const monthData = reactive({
  des: "最近一月提交",
  count: 0,
  time: "",
});
const weekData = reactive({
  des: "最近一周提交",
  count: 0,
  time: "",
});

const commitInfo = reactive([]);

const computedCommit = (data) => {
  // 开始计算最近一年提交量
  yearData.count = data.totalContributions;
  const firstYearDay = data.weeks[0].firstDay;
  const lastYearDay =
    data.weeks[52].contributionDays[data.weeks[52].contributionDays.length - 1]
      .date;
  const time = firstYearDay + " - " + lastYearDay;
  yearData.time = time;
  // 开始计算最近一个月提交量
  const monthDaysCount = 30; // 默认一个月的天数
  let firstMonthDay = "";
  let lastMonthDay = lastYearDay;
  let monthCount = 0;
  let tempCount = 0;
  const weeks = data.weeks;
  const weekLength = weeks.length;
  for (let i = weekLength - 1; i >= 0; i--) {
    if (tempCount > monthDaysCount) {
      break;
    }
    monthCount += weeks[i].contributionDays.reduceRight((monthCount, item) => {
      if (tempCount === monthDaysCount - 1) {
        firstMonthDay = item.date;
        tempCount++;
        return monthCount;
      } else if (tempCount > monthDaysCount) {
        tempCount++;
        return monthCount;
      } else {
        tempCount++;
        return monthCount + item.contributionCount;
      }
    }, 0);
  }
  monthData.count = monthCount;
  monthData.time = firstMonthDay + " - " + lastMonthDay;
  // 开始计算最近一周提交量
  let weekCount = 0;
  let firstWeekDay = "";
  let lastWeekDay = lastYearDay;
  let tempWeekCount = 0;
  const weekDaysCount = 7;
  const lastWeek = weeks[weekLength - 1];
  const secondLastWeek = weeks[weekLength - 2];
  weekCount += lastWeek.contributionDays.reduceRight((weekCount, item) => {
    if (tempWeekCount === weekDaysCount - 1) {
      tempWeekCount++;
      firstWeekDay = item.date;
      return weekCount;
    } else if (tempWeekCount > weekDaysCount) {
      tempWeekCount++;
      return weekCount;
    } else {
      tempWeekCount++;
      return weekCount + item.contributionCount;
    }
  }, 0);
  weekCount += secondLastWeek.contributionDays.reduceRight(
    (weekCount, item) => {
      if (tempWeekCount === weekDaysCount - 1) {
        tempWeekCount++;
        firstWeekDay = item.date;
        return weekCount;
      } else if (tempWeekCount > weekDaysCount) {
        tempWeekCount++;
        return weekCount;
      } else {
        tempWeekCount++;
        return weekCount + item.contributionCount;
      }
    },
    0
  );
  weekData.count = weekCount;
  weekData.time = firstWeekDay + " - " + lastWeekDay;
};

const getData = async () => {
  loadingGithub.value = true;
  const { data: token } = await getGithubToken();
  const { data: resData } = await getContribution(token);
  const weeks =
    resData?.user.contributionsCollection.contributionCalendar.weeks;
  const colors =
    resData?.user.contributionsCollection.contributionCalendar.colors;
  githubData.length = 0;
  colorData.length = 0;
  colorData.push("rgb(235, 237, 240)");
  // 计算各时间段数据
  computedCommit(resData?.user.contributionsCollection.contributionCalendar);
  // 装入各个时间段提交信息
  commitInfo.push(yearData, monthData, weekData);

  weeks.map((item) => {
    githubData.push(item);
  });
  colors.map((item) => {
    colorData.push(item);
  });
  loadingGithub.value = false;
};

onBeforeMount(() => {
  getData();
});
</script>

<style lang="less" scoped>
.statistical_container {
  min-height: calc(100vh - 55px - 267px);

  .sta_main {
    width: 100%;
    height: 100%;

    .header {
      position: relative;
      width: 100%;
      height: 345px;

      .site-info {
        position: absolute;
        top: 145px;
        width: 100%;

        h1 {
          @media screen and (min-width: 300px) and (max-width: 500px) {
            font-size: 1.5em;
          }

          color: #fff;
          text-align: center;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.45);
          line-height: 1.5;
          font-size: 3em;
        }
      }
    }

    .layout {
      @media screen and (min-width: 300px) and (max-width: 500px) {
        padding: 10px 5px;
      }

      max-width: 1400px;
      display: flex;
      -webkit-box-flex: 1;
      flex: 1 auto;
      margin: 0 auto;
      padding: 40px 15px;

      .page {
        @media screen and (min-width: 300px) and (max-width: 500px) {
          padding: 20px 10px;
        }

        min-width: 350px;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 50px 40px;
        width: 100%;
        height: 1000px;
        border-radius: 20px;
        border: 1px solid rgba(169, 169, 169, 0.7);
        background: rgba(250, 250, 250, 98%) !important;

        .github {
          width: 100%;
          min-height: 100px;
          border-radius: 10px;
        }

        .tarffic {
          margin-top: 10px;
          width: 100%;
          min-height: 100px;
        }
      }
    }
  }
}
</style>
