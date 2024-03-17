<template>
  <div id="web-bg"></div>
  <div id="svg-bg"></div>
  <router-view></router-view>
</template>

<script setup>
if (import.meta.env.MODE === "production") {
  LA.init({
    id: "K3xkYhOJwAanmd6k",
    ck: "K3xkYhOJwAanmd6k",
    autoTrack: true,
    hashMode: true,
    screenRecord: true,
  });
}
</script>

<style lang="less">
@import "./style/common.less";
</style>
