<template>
  <div ref="dom" @click="toArticle" class="card_container">
    <div class="top loading" ref="loadingDom">
      <img
        ref="imgDom"
        @load="onload"
        :data-src="coverUrl || `${postImgUrl}/${postImg.split('.')[0]}min.webp`"
        width="100%"
        height="100%"
        alt="postimg"
      />
      <link v-if="postUrl" rel="prefetch" :href="postUrl" />
      <link v-if="coverKey" rel="prefetch" :href="preUrl" />
    </div>
    <div class="bottom">
      <div class="bTop">
        <div class="left">
          <div class="title shenglue" :title="postName">{{ postName }}</div>
          <div class="publishTime iconfont">&#xe663;{{ dateInfo }}</div>
        </div>
        <div class="right">
          <div
            @click.stop="toCategory"
            class="category iconfont shenglue"
            :title="category"
          >
            &#xe811;{{ category }}
          </div>
        </div>
      </div>
      <div class="bBottom">
        <div
          @click.stop="toTag(item)"
          class="tag iconfont"
          v-for="item in tags"
          :key="item"
        >
          &#xe62f; {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { postImgUrl } from "../constant";
import toPath from "../utils/toPath";
import { getPostInfo } from "../utils/getPostInfo";
import PubSub from "pubsub-js";
import { getImageUrl } from "@/utils/upload";

const router = useRouter();
const props = defineProps({
  postName: {
    type: String,
    default: "文章标题",
  },
});

const postUrl = ref("");
const coverKey = ref("");
const dom = ref<HTMLElement>();
const imgDom = ref<HTMLElement>();
// 分类名
let category = ref("");
// 标签信息
let tags = reactive<string[]>([]);
// 日期信息
let dateInfo = ref("");
// 封面信息
let postImg = ref("");

let timer = null;

// 跳转
let toCategory = () => {
  toPath("/category", category.value);
};
let toTag = (item: string) => {
  toPath("/tag", item);
};
let toArticle = () => {
  PubSub.publish("toTopSmooth");
  router.push({
    path: "/article",
    query: {
      postName: props.postName,
      date: dateInfo.value,
      tag: tags,
      category: category.value,
    },
  });
};

const handleLoad = () => {
  (imgDom.value as HTMLImageElement).src = (imgDom.value as HTMLImageElement)
    .dataset.src as string;
};
const loadingDom = ref<HTMLElement>();
const onload = () => {
  (imgDom.value as HTMLImageElement).style.opacity = "1";
  (imgDom.value as HTMLImageElement).classList.add("animate_show");
  loadingDom.value?.classList.remove("loading");
};

const init = () => {
  const info = getPostInfo(props.postName);
  category.value = info.category;
  info.tag.map((item) => {
    tags.push(item);
  });
  dateInfo.value = info.date;
  postImg.value = info.postImg;
  postUrl.value = info.post_url || "";
  coverKey.value = info.cover_url || "";
};

const handleLazy = (el: Element) => {
  const intersectionObserver = new IntersectionObserver((changes) => {
    changes.forEach((item, index) => {
      if (item.isIntersecting) {
        handleLoad();
        intersectionObserver.unobserve(item.target);
      }
    });
  });
  intersectionObserver.observe(el);
};

onBeforeMount(async () => {
  await init();
});

onMounted(() => {
  handleLazy(dom.value as Element);
});

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
.card_container {
  width: 100%;
  min-width: 290px;
  padding: 15px;
  border-radius: 15px;
  box-sizing: border-box;
  background: var(--background-transparent);
  transition: all 0.5s;
  cursor: pointer;
  border: var(--box-border);

  @keyframes imgLoading {
    0% {
      background-position: 100% 50%;
    }

    100% {
      background-position: 0 50%;
    }
  }

  .loading {
    background: linear-gradient(-45deg, #dedfe0 25%, #ffffff 45%, #dedfe0 65%);
    background-size: 400% 100%;
    animation: imgLoading 1s ease-in-out infinite;
  }

  .top {
    position: relative;
    border-radius: 10px;
    width: 100%;
    height: 180px;
    text-align: center;
    transition: all 0.5s;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      opacity: 0;
      height: 180px;
      width: 100%;
      object-fit: cover;
      transform: scale(1.5);
      transform-origin: center;
      transition: all 0.5s;
      will-change: contents;
    }
  }

  &:hover {
    img {
      transform: scale(1.3);
    }
  }

  .bottom {
    margin: 10px 0;
    width: 100%;
    height: 110px;

    // background-color: pink;
    .bTop {
      width: 100%;
      height: 60%;
      padding: 5px 10px;
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.3);

      .left {
        width: 65%;
        float: left;
        height: 100%;
        display: flex;
        flex-direction: column;

        .title {
          text-align: start;
          font-size: 18px;
          font-weight: 700;
          width: 100%;
          height: 60%;
          // background-color: black;
        }

        .publishTime {
          text-align: start;
          height: 30%;
          padding: 5px;
          line-height: 10px;
          font-size: 12px;
          font-weight: 700;
          color: gray;
          // background-color: gray;
        }
      }

      .right {
        width: 30%;
        float: right;
        height: 100%;
        text-align: center;

        .category {
          line-height: 50px;
          font-size: 15px;
          font-weight: 700;
          width: 100%;
          height: 100%;
          padding: 5px;
          cursor: pointer;
        }

        .category:hover {
          color: #989898;
        }
      }
    }

    .bBottom {
      width: 100%;
      padding: 3px;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .tag {
        margin: 2px 5px;
        padding: 0px 5px;
        font-size: 14px;
        line-height: 30px;
        text-align: center;
        color: #fff;
        font-weight: 700;
        height: 30px;
        border-radius: 5px;
        background-color: #000;
        cursor: pointer;
        transition: all 0.5s;
      }

      .tag:hover {
        background-color: #fff;
        color: #000;
      }
    }
  }
}
</style>
