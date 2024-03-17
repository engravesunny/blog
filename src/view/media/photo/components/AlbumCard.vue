<template>
  <figure class="album-card">
    <img :src="cover" alt="cover" />
    <div class="mark"></div>
    <a :href="path">
      <figcaption class="caption">
        <div class="title">{{ title }}</div>
        <div class="description">{{ description }}</div>
      </figcaption>
    </a>
  </figure>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  description: string;
  path: string;
  cover: string;
}>();
</script>

<style lang="less" scoped>
.album-card {
  @media screen and (max-width: 730px) {
    width: 100vw;
  }
  margin: 0;
  position: relative;
  width: 48%;
  height: 225px;
  border-radius: 10px;
  overflow: hidden;
  font-weight: 700;
  background-color: #333;
  transition: all 0.3s;
  cursor: pointer;
  border: solid 3px rgb(255, 255, 255);
  a {
    color: #fff;
  }
  &:hover {
    border-color: rgba(223, 86, 209);
    .mark {
      opacity: 0.4;
    }
    img {
      transform: translateX(0);
    }
    .caption .description {
      transform: translateX(0);
    }
    .caption .title {
      &::after {
        width: 70%;
      }
    }
  }
  .mark {
    transition: opacity 0.3s;
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    opacity: 0;
    z-index: 1;
  }
  .caption {
    position: absolute;
    top: 0;
    padding: 30px 20px;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 3px;
    z-index: 2;
    .title {
      position: relative;
      width: 100%;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.45);
      font-size: 20px;
      &::after {
        content: "";
        position: absolute;
        top: calc(100% + 3px);
        border-radius: 5px;
        left: 0;
        height: 3px;
        width: 0;
        background-color: #fff;
        transition: width 0.5s;
      }
    }
    .description {
      width: 100%;
      margin-top: 6px;
      transform: translateX(calc(100% + 20px));
      transition: transform 0.5s;
      will-change: transform;
    }
  }
  img {
    width: calc(100% + 20px);
    transition: transform 0.3s;
    transform: translateX(-20px);
    height: 100%;
    object-fit: cover;
    -webkit-backface-visibility: hidden;
    -moz-backface-visibility: hidden;
    -ms-backface-visibility: hidden;
    backface-visibility: hidden;
    opacity: 0.8;
  }
}
</style>
