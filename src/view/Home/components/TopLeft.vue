<template>
  <div class="hidden" style="overflow: hidden">
    <div ref="scrollArea" class="leftTop">
      <div class="front">
        <div class="box-top" @click="toArchive">
          归档
          <span class="iconfont">{{ getIcon("归档") }}</span>
        </div>
        <div class="box-bottom" @click="toArchive">
          2023
          <span class="iconfont">{{ getIcon("网站统计") }}</span>
        </div>
      </div>
      <miniCard
        :post-url="item.post_url || ''"
        :cover-key="item.cover_url || ''"
        @click="toArticle(item)"
        v-for="item of postList"
        :post-img="item.postImg"
        :post-name="item.name"
      >
      </miniCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import miniCard from "@/components/miniCard.vue";
import getIcon from "@/utils/icon";
import { onMounted } from "vue";
import { post } from "../../../store/post";
import { PostSingle } from "../../../types/index";
const router = useRouter();

const postStore = post();
const postInfo = postStore.$state.postInfo;
const postList = computed(() => {
  const randomList: number[] = [];
  let randomNum: number = Math.floor(Math.random() * postInfo.length);
  for (let i = 0; i < 6; i++) {
    while (randomList.includes(randomNum)) {
      randomNum = Math.floor(Math.random() * postInfo.length);
    }
    randomList.push(randomNum);
  }
  return randomList.map((index) => {
    return postInfo[index];
  });
});

let toArticle = (item: PostSingle) => {
  PubSub.publish("toTopFast");
  router.push({
    path: "/article",
    query: {
      postName: item.name,
      date: item.date,
      tag: item.tag,
      category: item.category,
    },
  });
};

const toArchive = () => {
  router.push({
    path: "/archive",
  });
};
const scrollArea = ref<HTMLElement>();

const listenScroll = () => {
  const scrollDom = scrollArea.value as HTMLElement;
  scrollDom.addEventListener("mousewheel", (e) => {
    e.preventDefault();
    const event = e as WheelEvent;
    const detail = event.detail || event.deltaY || event.deltaX;

    const moveForwardStep = 1;
    const moveBackStep = -1;
    let step = 0;
    if (detail < 0) {
      step = moveBackStep * 30;
    } else {
      step = moveForwardStep * 30;
    }
    scrollDom.scrollLeft = scrollDom.scrollLeft + step;
  });
};

onMounted(() => {
  listenScroll();
});
</script>

<style lang="less" scoped>
.hidden {
  overflow: hidden;
  height: 170px;
  width: 100%;
  margin-bottom: 10px;

  .leftTop {
    padding-right: 50px;
    padding-left: 10px;
    display: flex;
    flex-wrap: nowrap;
    width: 100%;
    height: 190px;
    overflow-x: auto;

    .front {
      @media screen and (max-width: 600px) {
        width: 140px;
      }

      width: 200px;
      height: 166px;
      flex-shrink: 0;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      text-align: left;

      .box-top,
      .box-bottom {
        cursor: pointer;
        position: relative;
        height: 80px;
        padding: 20px;
        background: linear-gradient(to right, #0a5abedb, #2fcbffdb);
        border-radius: 10px;

        &:hover {
          &::after {
            width: 45px;
          }

          & .iconfont {
            transform: rotate(0deg) scale(1.1);
            color: rgba(255, 255, 255, 0.9);
          }
        }

        &::after {
          position: absolute;
          bottom: 36px;
          left: 20px;
          content: "";
          border-radius: 2px;
          height: 4px;
          width: 15px;
          background-color: #fff;
          transition: all 0.8s;
        }

        .iconfont {
          position: absolute;
          top: 10px;
          right: 10px;
          font-size: 45px;
          color: rgba(255, 255, 255, 0.5);
          transform: rotate(-10deg);
          transition: all 0.8s ease-in-out;
        }
      }

      .box-bottom {
        margin-top: 3px;
        background: linear-gradient(to right, #f57189db, #cbceeddb);
      }
    }

    .miniCard {
      float: left;
    }
  }
}
</style>
