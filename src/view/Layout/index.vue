<template>
  <div height="100vh">
    <div class="layout_container">
      <!-- 顶部 -->
      <NavBar
        :color="color"
        :is-floded="isFloded"
        :is-opacity="isOpacity"
      ></NavBar>
      <!-- 顶部 -->

      <!-- 内容区域 -->
      <router-view ref="scroller"></router-view>
      <!-- 内容区域 -->
      <!-- 搜索框 -->
      <search-box
        :opacity="searchBoxOpacity"
        :scale="searchBoxScale"
      ></search-box>
      <!-- 搜索框 -->
      <!-- 底部 -->
      <FootBar v-if="showFooter"></FootBar>
      <!-- 底部 -->
    </div>
    <div
      v-if="showToTop"
      @click="toTopSmooth"
      class="toTop iconfont unselectable"
    >
      &#xe610;
    </div>
  </div>
</template>

<script setup>
import { throttle } from "lodash";
import searchBox from "./components/searchBox/searchBox.vue";
import NavBar from "./components/NavBar/index.vue";
import FootBar from "./components/FootBar/index.vue";
import { onMounted } from "vue";
import PubSub from "pubsub-js";

let searchBoxOpacity = ref(0);
let searchBoxScale = ref(0);
const route = useRoute();
let dontShowFooterPaths = ["/photo/", "/friend", "/comment"];
let showFooter = computed(() => {
  return !dontShowFooterPaths.some((path) => {
    return route.path.includes(path);
  });
});
// 滚动条
let scroller = ref(null);
let showToTop = ref(false);
// 顶部导航栏显示与隐藏及透明度变化
// 最开始不隐藏且透明
let color = ref("#fff");
let isFloded = ref(0);
let isOpacity = ref(0);
let curScrollY = ref(0);
let timer = null;
// 控制顶部栏折叠函数
let topFlodFn = (e) => {
  if (!timer) {
    timer = setTimeout(() => {
      const el = document.documentElement;
      if (el.scrollTop <= 100) {
        isOpacity.value = 0;
        showToTop.value = false;
        color.value = "#fff";
      } else {
        isOpacity.value = 9;
        color.value = "#333";
      }
      if (el.scrollTop > curScrollY.value) {
        // 向上滑，隐藏导航栏
        isFloded.value = 100;
        curScrollY.value = el.scrollTop;
        showToTop.value = false;
      } else {
        // 向下滑，显示导航栏
        isFloded.value = 0;
        curScrollY.value = el.scrollTop;
        if (el.scrollTop > 100) {
          showToTop.value = true;
        }
      }
      timer = null;
    }, 100);
  }
};
let topFlodFnTouch = (e) => {
  let y = e.touches[0].pageY;
  function listenTouchMove(e) {
    const move = e.touches[0].pageY - y;
    if (move > 0) {
      // 向下滑，显示导航栏
      isFloded.value = 0;
      showToTop.value = true;
      y = e.touches[0].pageY;
    } else if (move < 0) {
      // 向上滑，隐藏导航栏
      isFloded.value = 100;
      showToTop.value = false;
      y = e.touches[0].pageY;
    } else {
      return;
    }
  }
  function removeTouchListen() {
    document.removeEventListener("touchmove", handleTouchMove);
    document.removeEventListener("touchend", removeTouchListen);
  }
  const handleTouchMove = throttle(listenTouchMove, 200);
  document.addEventListener("touchmove", handleTouchMove);
  document.addEventListener("touchend", removeTouchListen);
};
// TODO : should have a method to let page scroll to top;

// 搜索框事件
const initSearchBox = () => {
  PubSub.subscribe("showSearchBox", () => {
    searchBoxScale.value = 1;
    searchBoxOpacity.value = 1;
  });
  PubSub.subscribe("closeSearchBox", () => {
    searchBoxScale.value = 0;
    searchBoxOpacity.value = 0;
  });
};

let toTopSmooth = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  document.body.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

let toTopFast = () => {
  window.scrollTo({
    top: 0,
  });
  document.body.scrollTo({
    top: 0,
  });
};

let handleScrollListener = throttle(topFlodFn, 100);
const init = () => {
  PubSub.subscribe("toTopFast", toTopFast);
  PubSub.subscribe("toTopSmooth", toTopSmooth);
  document.addEventListener("scroll", handleScrollListener);
  if (window.innerWidth < 600) {
    document.addEventListener("touchstart", topFlodFnTouch);
  }
  initSearchBox();
};
const unmounted = () => {
  PubSub.unsubscribe("toTopFast", toTopFast);
  PubSub.unsubscribe("toTopSmooth", toTopSmooth);
  document.removeEventListener("scroll", handleScrollListener);
  document.removeEventListener("touchstart", topFlodFnTouch);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  unmounted();
});
</script>

<style lang="less" scoped>
.photo-overflow {
  overflow: hidden;
}

.layout_container {
  padding-top: 55px;
  box-sizing: border-box;
  width: 100%;
  height: 100vh;
}

.toTop {
  @media screen and (min-width: 300px) and (max-width: 600px) {
    font-size: 20px;
    padding: 7px;
    border-radius: 5px;
  }

  position: fixed;
  bottom: 10px;
  right: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #fff;
  cursor: pointer;
  font-size: 30px;
  font-weight: 900;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.1);
  transition: all 0.5s;
}

.toTop:hover {
  box-shadow: 1px 1px 7px 1px rgba(0, 0, 0, 0.2);
  transform: translate(0, -3px);
}
</style>
