<template>
  <div class="miniCard">
    <div class="top">
      <img
        :src="
          coverUrl ||
          `${postImgUrl}/${
            postImg?.split('.')[0] + 'min.webp' + '?params=200y200'
          }`
        "
        alt="postInfo"
      />
      <link v-if="postUrl" rel="prefetch" :href="postUrl" />
      <link v-if="coverKey" rel="prefetch" :href="preUrl" />
    </div>
    <div class="bottom">{{ postName }}</div>
  </div>
</template>

<script setup lang="ts">
import { postImgUrl } from "@/constant";
import { getImageUrl } from "@/utils/upload";
const props = defineProps({
  postName: String,
  postImg: String,
  coverKey: String,
  postUrl: String,
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
.miniCard {
  box-sizing: border-box;
  width: 200px;
  height: 166px;
  border: var(--minicard-border);
  flex-shrink: 0;
  margin-left: 10px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(to right, #72e8ff, #a9e3f8);
  cursor: pointer;

  &:hover {
    .top {
      img {
        transform: scale(1.1);
      }
    }
  }

  .top {
    width: 100%;
    height: 70%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: all 0.5s;
    }
  }

  .bottom {
    width: 100%;
    height: 48px;
    line-height: 24px;
    font-size: 15px;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    word-break: break-all;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
