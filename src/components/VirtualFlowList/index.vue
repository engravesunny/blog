<template>
  <div class="virtual-flow-view" ref="viewRef">
    <div
      class="virtual-flow-list"
      :style="{
        height: virtualFLowInstance.maxHeight + 'px',
      }"
    >
      <div
        ref="virtualFlowItemRef"
        class="virtual-flow-load"
        v-for="(item, index) in virtualFLowInstance.dataSource"
        :key="item.imgUrl"
        :style="{
          width: item.width + 'px',
          position: 'absolute',
        }"
      >
        <img
          :src="item.imgUrl"
          :alt="item.imgUrl"
          @load="
            () =>
              handleItemLoaded(virtualFlowItemRef[index] as HTMLElement, item)
          "
        />
      </div>
      <div
        class="virtual-flow-item"
        v-for="item in renderList as ListItem[]"
        :style="{
          width: item.width + 'px',
          transform: `translate(${item.left}px, ${item.top}px)`,
        }"
      >
        <slot :imgItem="item" name="item" />
      </div>
      <div class="observer" ref="observerRef">
        <span>{{ loadingText }}</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">

/**
 * 记一次失败的瀑布流虚拟列表以后有时间照着视频敲一遍
 */

import { VirtualFlowList } from "@/utils/VirtualFlowList";
import { ListItem } from "@/types/virtualFLowListTypes";
import { debounce } from "@/utils/debounce";
import { throttle } from "@/utils/throttle";

const props = defineProps<{
  itemWidth: number;
}>();

const emits = defineEmits(["loadMore"]);

let loading = ref(false);
let finished = ref(true);
const virtualFLowInstance = ref<VirtualFlowList>(new VirtualFlowList(0));
const viewRef = ref();
const observerRef = ref();
//
const virtualFlowItemRef = ref();

// 加载中提示文案
const loadingText = computed(() => {
  if (loading.value) {
    return "正在加载喵~~";
  } else if (!loading.value && !finished.value) {
    return "加载完成喵喵！！";
  } else if (finished.value) {
    return "已经没有了哦喵";
  }
});

const renderList = computed(() => {
  let res:ListItem[] = [];
  virtualFLowInstance.value.colQueue.forEach(col => {
    col.itemList.forEach(item => {
      let topEnable = item.top as number > col.start - virtualFLowInstance.value.viewHeight;
      let bottomEnable = item.top as number < col.end;
          if(topEnable && bottomEnable) {
            res.push(item)
          }
    })
  })
  return res;
});

// 处理滚动事件
const handleScroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  virtualFLowInstance.value?.updateColQueue(scrollTop);
};

// 处理单个加载完毕
const handleItemLoaded = (item: HTMLElement, imgItem: ListItem) => {
  let height = item.offsetHeight;
  imgItem.dom = item;
  imgItem.height = height;
  virtualFLowInstance.value?.addToColQueue(imgItem);
  if (virtualFLowInstance.value?.dataSource.length === 0) {
    loading.value = false;
  }
};

// 处理加载过来的列表
const handleLoadMore = (list: ListItem[]) => {
  virtualFLowInstance.value?.addToDataSource(list);
};

// 监听页面滚动
const listenScroll = (isListen: boolean) => {
  let listenFn = throttle(handleScroll, 200);
  if (isListen) {
    document.addEventListener("scroll", listenFn);
  } else {
    document.removeEventListener("scroll", listenFn);
  }
};

// 监听窗口变化
let listenResize = (isListen: boolean) => {
  let viewEl = viewRef.value as HTMLElement;
  let onResize = debounce(() => {
    let containerWidth = viewEl.offsetWidth;
    let tempWidth = props.itemWidth;
    // 这里要让flow-item的高度更新后在更新布局
    nextTick(() => {
      virtualFLowInstance.value?.update(containerWidth, tempWidth);
    });
  }, 200);
  if (isListen) {
    window.addEventListener("resize", onResize);
  } else {
    window.removeEventListener("resize", onResize);
  }
};

// 监听列表触底
let listenObserverList = () => {
  let el = observerRef.value as HTMLElement;
  let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loading.value = true;
        emits("loadMore", handleLoadMore, () => {
          finished.value = true;
          observer.unobserve(el);
          observer.disconnect();
        });
      }
    });
  });
  observer.observe(el);
};

// 初始化
onMounted(() => {
  listenScroll(true);
  // listenResize(true);
  listenObserverList();
  let viewHeight = (viewRef.value as HTMLElement).offsetHeight;
  let viewWidth = (viewRef.value as HTMLElement).offsetWidth;
  virtualFLowInstance.value = new VirtualFlowList(viewHeight);
  virtualFLowInstance.value.init(viewWidth, props.itemWidth, []);
});

// 卸载释放内存
onBeforeUnmount(() => {
  listenScroll(false);
  listenResize(false);
});
</script>

<style scoped lang="less">
.virtual-flow {
  &-view {
    width: 100%;
    height: 100%;
  }

  &-list {
    width: 100%;
    position: relative;
    padding-bottom: 100px;

    .observer {
      position: absolute;
      bottom: 0;
    }
  }

  &-item,
  &-load {
    margin: 0;
    position: absolute;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
