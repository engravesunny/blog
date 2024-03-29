<template>
  <section class="bigCard" ref="dom">
    <div
      class="card-item-img"
      @click="toArticle"
      :class="{ right: right, left: !right }"
    >
      <div class="post-img loading" ref="loadingDom">
        <img
          ref="imgDom"
          @load="onloaded"
          :data-src="
            coverUrl || `${postImgUrl}/${postImg.split('.')[0] + 'min.webp'}`
          "
          :alt="postImg"
        />
        <link v-if="coverKey" rel="prefetch" :href="preUrl" />
        <link v-if="postUrl" rel="prefetch" :href="postUrl" />
      </div>
    </div>
    <div class="card-item-info">
      <div
        class="isTop"
        :style="{
          right: right ? 'unset' : '7px',
          left: right ? '7px' : 'unset',
        }"
        v-if="isTop"
      >
        置顶
      </div>
      <div class="post-title" @click="toArticle">
        {{ title }}
      </div>
      <div class="date">
        <span class="iconfont" style="color: blue">&#xe663;</span>{{ date }}
      </div>
      <div class="info">
        <span class="category" @click="toCategory"
          ><span class="iconfont" style="color: red">&#xe811;</span
          >{{ category }}</span
        >
        <span class="iconfont" style="color: red">&#xe62f;</span>
        <span class="tags">
          <span class="tag" v-for="tag in tags" :key="tag" @click="toTag(tag)">
            {{ tag }}
          </span>
        </span>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { postImgUrl } from "@/constant";
import toPath from "@/utils/toPath";
import { getImageUrl } from "@/utils/upload";
const router = useRouter();
// 跳转
let toCategory = () => {
  toPath("/category", props.category);
};
let toTag = (item: string) => {
  toPath("/tag", item);
};
let toArticle = () => {
  PubSub.publish("toTopFast");
  router.push({
    path: "/article",
    query: {
      postName: props.title,
      date: props.date,
      tag: props.tags,
      category: props.category,
    },
  });
};

const loadingDom = ref<HTMLElement>();
const dom = ref<HTMLElement>();
const imgDom = ref<HTMLImageElement>();
const handleLoad = () => {
  (imgDom.value as HTMLImageElement).src = (imgDom.value as HTMLImageElement)
    .dataset.src as string;
};

const onloaded = () => {
  (loadingDom.value as HTMLElement).classList.remove("loading");
  (imgDom.value as HTMLImageElement).style.opacity = "1";
  (imgDom.value as HTMLImageElement).classList.add("animate_show");
};

const handleLazy = () => {
  const intersectionObserver = new IntersectionObserver((changes) => {
    changes.forEach((item, index) => {
      if (item.intersectionRatio > 0) {
        intersectionObserver.unobserve(item.target);
        handleLoad();
      }
    });
  });
  intersectionObserver.observe(dom.value as Element);
};

onMounted(() => {
  handleLazy();
});

const props = defineProps({
  right: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    default: "文章标题",
  },
  date: {
    type: String,
    default: "2023-8-15",
  },
  category: {
    type: String,
    default: "分类",
  },
  tags: {
    type: Array<string>,
    default: ["标签", "标签"],
  },
  postImg: {
    type: String,
    default: "77.webp",
  },
  isTop: {
    type: Boolean,
    default: false,
  },
  coverKey: {
    type: String,
    default: "",
  },
  postUrl: {
    type: String,
    default: "",
  },
});
const preUrl = "https://www.kecat.top/" + props.coverKey;
const coverUrl = computed(() => {
  if (props.coverKey) {
    return "https://" + getImageUrl(60, props.coverKey);
  } else {
    return "";
  }
});
</script>

<style lang="less" scoped>
.isTop {
  position: absolute;
  top: 7px;
  padding: 5px 7px;
  border-radius: 7px;
  background-color: rgb(247, 88, 88);
  font-size: 14px;
  font-weight: 100;
  color: #ffffff;
}

.bigCard {
  border-radius: 18px;
  margin-top: 14px;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  border: 2px solid rgba(0, 255, 255, 0.6);
  font-size: 14.5px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.67);

  will-change: transform;

  .left {
    padding: 7px 0 7px 7px;
  }

  .right {
    padding: 7px 7px 7px 0px;
    order: 1;
  }

  .card-item-img {
    cursor: pointer;
    width: 44%;
    height: 200px;
    overflow: hidden;

    @keyframes imgLoading {
      0% {
        background-position: 100% 50%;
      }

      100% {
        background-position: 0 50%;
      }
    }

    .loading {
      background: linear-gradient(
        -45deg,
        #dedfe0 25%,
        #ffffff 45%,
        #dedfe0 65%
      );
      background-size: 400% 100%;
      animation: imgLoading 1s ease-in-out infinite;
    }

    .post-img {
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      height: 100%;
    }

    img {
      opacity: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-item-info {
    position: relative;
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 25px;

    .post-title {
      @media screen and (max-width: 600px) {
        font-size: 20px;
      }

      font-size: 25px;
      transition: all 0.5s;

      &:hover {
        color: #49b1f5;
      }
    }

    .post-title,
    .category,
    .tag {
      cursor: pointer;
    }

    .iconfont {
      font-size: 16px;

      &.iconfont {
        margin-left: 5px;
      }

      &::after {
        content: "";
        display: inline-block;
        width: 5px;
        height: 10px;
      }
    }

    .date {
      font-size: 14px;
      color: #858585;
    }

    span {
      line-height: 1.5em;
      font-size: 14px;
      color: #858585;
    }

    .info {
      @media screen and (max-width: 500px) {
        max-width: 200px;
      }

      .tags {
        word-wrap: break-word;
      }
    }

    .tag:not(:last-child) {
      &::after {
        content: "·";
        font-size: 25px;
        margin: -8px;
        vertical-align: middle;
      }
    }
  }
}
</style>
