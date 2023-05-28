<template>
    <div class="tagList_container">
        <div class="tags_box" v-loading="!tagList.length">
            <div class="tags_item" v-for="(item, index) in tagList" :key="index" :style="{ margin: `${marginNum}px` }">
                <div class="tags_text" @click="toTag(item.name)"
                    :style="{ fontSize: `${(1 + item.num / 10) * multiple}px`, color: `${textColor[Math.floor(Math.random() * 7)]}` }">
                    {{ item.name }}
                    <div v-if="isShowNum" class="num">
                        {{ item.num }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import toPath from '../../../../utils/toPath.js';
import { getDirNames } from '../../../../api/postApi.js'
const router = useRouter()
const route = useRoute()

const props = defineProps({
    tagFinalList: {
        type: Array,
        default: []
    }
})

let toTag = (name) => {
    toPath('/tag', name)
}

let multiple = ref(20)
const marginNum = ref(25)


let textColor = reactive([
    'rgb(133, 200, 234)',
    'rgb(195, 132, 224)',
    'rgb(37, 93, 168)',
    'rgb(0, 70, 132)',
    'rgb(244, 192, 161)',
    'rgb(164, 85, 68)',
    'rgb(212, 242, 104)',
    'rgb(219, 160, 50)'
])
let tagList = reactive([])

let isShowNum = ref(true)

onMounted(() => {
    tagList = tagList.sort(() => { return Math.random() - 0.5 })
})

watch(() => props, (val) => {
    if (val.tagFinalList.length) {
        tagList.length = 0
        val.tagFinalList.forEach(item => {
            tagList.push(item)
        });
    }
    tagList = tagList.sort(() => { return Math.random() - 0.5 })
}, { deep: true, immediate: true })


watch(() => route, (val) => {
    if (val.path === '/home') {
        multiple.value = 18
        marginNum.value = 2
    }
}, {
    deep: true,
    immediate: true
})

</script>

<style lang="less" scoped>
.tagList_container {

    width: 100%;

    .tags_box {
        display: flex;
        justify-content: center;
        align-items: stretch;
        flex-wrap: wrap;
    }

    .tags_text {
        position: relative;
        cursor: pointer;
    }

    .tags_text:hover {
        color: rgb(237, 168, 168) !important;
        text-decoration: underline;
    }

    .num {
        font-size: 12px;
        position: absolute;
        top: -5px;
        right: -10px;

    }
}
</style>