<template>
  <div class="smallArCard_container box_border" @click="toArticle">
    <div class="left">
      <!-- <img loading="lazy" :src="`${postImgUrl}/${postImage}`" alt=""> -->
      <svg>
        <image
          ref="imgDom"
          :xlink:href="
            coverUrl || `${postImgUrl}/${postImage.split('.')[0] + 'min.webp'}`
          "
          width="100%"
          height="100%"
        />
      </svg>
      <link v-if="postUrl" rel="prefetch" :href="postUrl" />
      <link v-if="coverKey" rel="prefetch" :href="preUrl" />
    </div>
    <div class="right">
      <div class="top">
        <div class="title">
          <p>{{ postName }}</p>
        </div>
      </div>
      <div class="bottom">
        <div class="date iconfont">&#xe663; {{ dateInfo }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getPostInfo } from "../utils/getPostInfo";
import { postImgUrl } from "../constant";
import { getImageUrl } from "@/utils/upload";
const router = useRouter();
let dateInfo = ref("");
let postImage = ref("");
let tagInfo = reactive<string[]>([]);
let postUrl = ref("");
let coverKey = ref("");

const props = defineProps({
  postName: {
    type: String,
    default: "文章标题",
  },
});
let toArticle = () => {
  PubSub.publish("toTopFast");
  router.push({
    path: "/article",
    query: {
      postName: props.postName,
      date: dateInfo.value,
      tag: tagInfo,
    },
  });
};
watch(
  () => props,
  async (val) => {
    const info = getPostInfo(val.postName);
    dateInfo.value = info.date;
    postImage.value = info.postImg;
    coverKey.value = info.cover_url;
    postUrl.value = info.post_url;
    info.tag.map((item) => {
      tagInfo.push(item);
    });
  },
  {
    deep: true,
    immediate: true,
  }
);
const preUrl = "https://www.kecat.top/" + coverKey.value;
const coverUrl = computed(() => {
  if (coverKey.value) {
    return "https://" + getImageUrl(60, coverKey.value);
  } else {
    return "";
  }
});
</script>

<style lang="less" scoped>
.smallArCard_container {
  width: 100%;
  height: 100%;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  cursor: pointer;

  .left {
    position: relative;
    width: 50%;
    height: 80px;
    padding: 10px;
    text-align: center;
    overflow: hidden;
    border-radius: 10px;

    // img {
    //     position: absolute;
    //     top: 50%;
    //     left: 50%;
    //     transform: translate(-50%, -50%);
    //     border-radius: 5px;
    //     height: 100%;
    //     transition: height 0.5s;
    //     will-change: scroll-position contents;
    // }
    svg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(1.3);
      width: 100%;
      height: 100%;
      transition: all 0.5s;
    }

    svg:hover {
      transform: translate(-50%, -50%) scale(1.4);
    }
  }

  .right {
    width: 70%;

    .top {
      width: 100%;
      height: 70%;

      .title {
        width: 100%;
        font-size: 16px;
        font-weight: 700;
        text-align: left;
        padding: 5px;

        p {
          display: -webkit-box;
          overflow: hidden;
          word-wrap: break-word;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          text-overflow: ellipsis;
        }
      }
    }

    .bottom {
      width: 100%;
      height: 30%;

      .date {
        text-align: left;
        padding: 3px;
        font-size: 14px;
        color: gray;
      }
    }
  }
}
</style>
