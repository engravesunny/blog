<template>
    <div class="flow-list-container" ref="listRef" :style="{ height: listInstance.maxHeight.value + 'px' }">
        <div class="flow-list-item" ref="itemRef"
            :style="{ width: (width ? width + 'px' : itemWidth + '%'), transform: `translate(${item.left}px, ${item.top}px)` }"
            v-for="(item, index) in renderList" :key="item.imgUrl">
            <slot :item="item" :listInstance="listInstance" :handleLoad="() => handleLoad(item, itemRef[index])"
                name="item">
            </slot>
            <template v-if="!$slots.item">
                <img :src="item.imgUrl" @load="handleLoad(item, itemRef[index])" :alt="item.imgUrl">
            </template>
        </div>
    </div>
    <div class="observer" ref="observerRef">
        {{ loadingText }}
    </div>
</template>

<script setup lang="ts">
import { flowList } from '../../utils/FlowList/index'
import { ImgItem } from '../../constant/imgs'
import { getItemWidth } from '@/utils/FlowList/getItemWidth'
import { debounce } from '@/utils/debounce';

const props = defineProps<{
    list: ImgItem[],
    itemWidth: number
}>()

const emits = defineEmits(['handleUpdateItemWidth', 'handleLoadMore'])
const listRef = ref<HTMLElement>()
const itemRef = ref<HTMLElement[]>([])
const observerRef = ref<HTMLElement>()

const width = ref(0)
const loading = ref(true)
const finished = ref(false)
const loadingText = computed(() => {
    if (finished.value) {
        return '已经是全部了喵～'
    } else if (loading) {
        return '正在加载喵～'
    } else {
        return '加载完成喵～'
    }
})

const listInstance = new flowList(props.list, props.itemWidth, 10)

const renderList = computed(() => {
    return listInstance.curRenderListInfo.value
})

const handleLoad = (item: ImgItem, dom: HTMLElement) => {
    listInstance.setPosition(item, dom)
}

let listenResize = () => {
    let flowEl = listRef.value as HTMLElement
    let onResize = debounce(() => {
        let containerWidth = flowEl.offsetWidth;
        let tempWidth = props.itemWidth;
        tempWidth = getItemWidth(containerWidth, emits);
        width.value = containerWidth * tempWidth / 100;
        // 这里要让flow-item的高度更新后在更新布局
        nextTick(() => {
            listInstance.updateOnResize(containerWidth, tempWidth / 100);
        })
    }, 200);
    window.addEventListener('resize', onResize);
}
const handleLoadMore = (list: ImgItem[]) => {
    loading.value = true;
    // handle load more
    listInstance.curRenderListInfo.value = [...listInstance.curRenderListInfo.value, ...list]
    loading.value = false;
}
const handleFinished = () => {
    finished.value = true;
}

const listenObserver = () => {
    let el = observerRef.value as HTMLElement;
    let observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                emits('handleLoadMore')
                if (finished.value) {
                    observer.unobserve(el);
                }
            }
        })
    })
    observer.observe(el)
}

onMounted(() => {
    const listDom = listRef.value as HTMLElement
    const listWidth = listDom.offsetWidth
    const itemWidth = getItemWidth(listWidth, emits)
    listInstance.calcSpaceCols(listWidth, itemWidth / 100)
    listenResize()
    listenObserver()
})

defineExpose({
    handleLoadMore,
    handleFinished
})

</script>

<style lang="less">
.flow-list-container {
    flex-grow: 1;
    position: relative;
    width: 100%;

    .flow-list-item {
        position: absolute;
        will-change: transform;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
}

.observer {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
}
</style>