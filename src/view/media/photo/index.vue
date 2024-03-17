<template>
  <div class="gallery">
    <div
      class="header"
      :style="{
        backgroundImage: `url(${viewingAlbumInfo?.cover || defaultCover})`,
      }"
    >
      <div class="site-info">
        <h1>
          {{ (album_enums as any)[viewingAlbum as string] || "艺术画廊" }}
        </h1>
      </div>
      <waves />
    </div>
    <div v-if="!viewingAlbum" class="gallery-main" @click="handleEnterAlbum">
      <!-- AlbumCard -->
      <album-card
        v-for="album in albumList"
        :key="album.title"
        :title="album.title"
        :description="album.description"
        :path="album.path"
        :cover="album.cover"
      />
    </div>
    <router-view v-else />
  </div>
</template>

<script setup lang="ts">
import AlbumCard from "./components/AlbumCard.vue";
import { getDirNames } from "@/api/postApi";
import { image_enums, album_enums } from "@/config";

let albumList = ref<any>([]);
let defaultCover = "https://www.kecat.top/gallery/wallpaper.png";
let handleGetAlbums = async () => {
  let { data } = await getDirNames({
    dir_path: "./images/",
  });
  let { dir_names } = data.data;

  albumList.value = (dir_names || []).reverse().map((item: string) => {
    return (image_enums as any)[item];
  });
};

let handleEnterAlbum = (e: any) => {
  console.log(e.target);
};

let route = useRoute();
const viewingAlbum = computed(() => {
  return route.params.album || "";
});
const viewingAlbumInfo = computed(() => {
  return (image_enums as any)[
    (album_enums as any)[viewingAlbum.value as string] as string
  ];
});

onBeforeMount(() => {
  handleGetAlbums();
});
</script>

<style lang="less" scoped>
.gallery {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 345px);
  .gallery-main {
    @media screen and (max-width: 730px) {
      width: 100vw;
      padding: 10px;
    }
    width: 75vw;
    max-width: 1200px;
    margin-top: -50px;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: space-between;
  }
}
.header {
  position: relative;
  top: -55px;
  width: 100%;
  height: 400px;
  background-position: center center;
  background-size: cover;

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
</style>
