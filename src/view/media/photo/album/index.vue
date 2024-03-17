<template>
  <div class="album-detail">
    <FlowList
      ref="FlowListRef"
      :item-width="itemWidth"
      :list="curRenderList"
      @handleUpdateItemWidth="handleUpdateItemWidth"
      @handleLoadMore="handleLoad"
      v-if="photoLinks.length"
    >
      <template #item="{ item, handleLoad }">
        <div class="img-container">
          <img
            :src="item.imgUrl"
            :alt="item.imgUrl"
            @load="handleLoad"
            @error="handleError"
            @click="() => handleViewImage(item.imgHeightUrl)"
          />
          <link rel="prefetch" :href="item.imgHeightUrl" />
        </div>
      </template>
    </FlowList>
    <div
      class="img-dialog-container"
      @wheel.prevent.stop
      v-if="showViewImageBox"
    >
      <div class="mark"></div>
      <div class="img-dialog" style="user-select: none">
        <div class="close iconfont" @click="showViewImageBox = false">
          &#xe60a;
        </div>
        <div class="img-view">
          <img :src="curViewImage" :alt="curViewImage" />
        </div>
        <div class="bottom">
          <div class="before iconfont">&#xe658;</div>
          <div class="download iconfont">&#xe63e;</div>
          <div class="next iconfont">&#xe659;</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { album_enums } from "@/config";
import FlowList from "@/components/FlowList/index.vue";
import { ImgItem } from "@/constant/imgs";
import { getDirNames } from "@/api/postApi";
import { getImageUrl } from "@/utils/upload";

const route = useRoute();
const curViewImage = ref(
  "https://www.kecat.top/gallery%2Fbeautiful%E5%9B%BE%E7%89%87%2F1710261836854.png?imageMogr2/quality/20",
);
const showViewImageBox = ref(false);

const albumName = computed(() => {
  return (album_enums as any)[route.params.album as string];
});
const photoLinks = ref<ImgItem[]>([]);
const handleGetPhotos = async () => {
  const { data } = await getDirNames({
    dir_path: "./images/" + albumName.value + "/",
  });
  let photoList = data.data.dir_names as string[];
  photoLinks.value = photoList.map((item) => {
    return {
      imgUrl:
        "https://" + getImageUrl(20, "gallery/" + albumName.value + "/" + item),
      imgHeightUrl:
        "https://" +
        getImageUrl(100, "gallery/" + albumName.value + "/" + item),
    };
  });
};

const curRenderList = ref<any[]>([]);
const curPage = ref(-1);
const pageSize = ref(20);
const FlowListRef = ref();

const itemWidth = ref(19);
const handleUpdateItemWidth = (newWidth: number) => {
  itemWidth.value = newWidth;
};

let getMore = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        photoLinks.value.slice(
          curPage.value * pageSize.value,
          curPage.value * pageSize.value + pageSize.value,
        ),
      );
    }, 100);
  });
};

const handleLoad = async () => {
  curPage.value = curPage.value + 1;
  const res = (await getMore()) as ImgItem[];
  if (res.length < pageSize.value) {
    FlowListRef.value.handleFinished();
  }
  FlowListRef.value.handleLoadMore(res);
};
const handleError = (e: Event) => {
  (e.target as HTMLElement).style.display = "none";
};
const handleViewImage = (img: string) => {
  showViewImageBox.value = true;
  curViewImage.value = img;
};

onBeforeMount(() => {
  handleGetPhotos();
});
</script>

<style lang="less" scoped>
.album-detail {
  margin-top: -50px;
  width: 100%;
  padding-bottom: 200px;
}

.img-container {
  border: 4px solid #fff;
}

.mark {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #333;
  z-index: 999;
  opacity: 0.4;
}

.img-dialog {
  width: 75vw;
  height: 90vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 10px;
  overflow: hidden;

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #404040;
    font-weight: 700;
    cursor: pointer;
    user-select: none;
    font-size: 20px;

    &:hover {
      opacity: 0.7;
    }

    &:active {
      opacity: 0.4;
    }
  }

  .img-view {
    flex: 1;
    height: 50%;
    padding: 20px;
    display: flex;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .bottom {
    width: 100%;
    height: 35px;
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;

    .before,
    .download,
    .next {
      font-size: 20px;
      font-weight: 700;
      cursor: pointer;
      user-select: none;
      width: 35px;
      height: 35px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.1);

      &:active {
        box-shadow: none;
      }
    }

    .before,
    .next {
      font-size: 25px;
    }
  }
}
</style>
