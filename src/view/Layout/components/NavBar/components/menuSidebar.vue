<template>
  <div class="menu_sidebar">
    <el-scrollbar height="100vh">
      <aboutMe></aboutMe>
      <navList :controls="controls"></navList>
    </el-scrollbar>
  </div>
</template>

<script setup>
import aboutMe from "../../../../../components/aboutMe.vue";
import navList from "./navList.vue";
const props = defineProps({
  controls: {
    type: Array,
    default: [],
  },
});
</script>

<style lang="less" scoped>
.menu_sidebar {
  color: #000;
  width: 300px;
  height: 100vh;
  background-color: #f6f8fa;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  z-index: 9;
  .left {
    border: none;
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
