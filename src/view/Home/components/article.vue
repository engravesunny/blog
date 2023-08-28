<template>
    <div class="article">
        <div class="title">
            <div class="tag shenglue iconfont" :class="{ active: showWhat === 'tag' }" @click="showTag">&#xe62f; 文章标签</div>
            <div class="category shenglue iconfont" :class="{ active: showWhat === 'category' }" @click="showCategory">
                &#xe811;
                文章分类</div>
            <div class="strip" :style="{ transform: `translate(${stripTranslateX}%)` }"></div>
        </div>
        <div class="display box_border">
            <div v-if="showWhat === 'tag'" v-loading="tagLoading" class="category_art">
                <tagList v-if="!tagLoading" :tagFinalList="tagFinalList"></tagList>
            </div>
            <div v-if="showWhat === 'category'" class="category_art">
                <smallCard @click="toCategory(item)" v-for="item in categoryList" :key="item" :name="item"></smallCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import toPath from '../../../utils/toPath';
import smallCard from '../../../components/smallCard.vue';
import { getDirNames } from '../../../api/postApi';
import tagList from '../../article/tag/components/tagList.vue';
import { getTagCount } from '../../../utils/getTagInfo';


let stripTranslateX = ref(300)

let showWhat = ref('category')
const tagLoading = ref(true)

let timer = null

let toTag = (name) => {
    toPath('/tag', name)
}
let toCategory = (name) => {
    toPath('/category', name)
}

let showTag = () => {
    stripTranslateX.value = 75
    showWhat.value = 'tag'
}
let showCategory = () => {
    stripTranslateX.value = 300
    showWhat.value = 'category'
}

let categoryList = reactive([])
let tagLists = []
const tagFinalList = reactive([])
let getInfo = async () => {
    categoryList.length = 0
    tagLists.length = 0
    tagFinalList.length = 0
    const { data: category } = await getDirNames({
        dir_path: './posts/category'
    })
    category.data.dir_names.forEach(item => {
        categoryList.push(item)
    });
    const { data: tags } = await getDirNames({
        dir_path: './posts/tag'
    })
    tags.data.dir_names.forEach(item => {
        tagLists.push(item)
    });
}

const getTagInfos = async (tag) => {
    const tagInfo = await getTagCount(tag)
    tagFinalList.push({
        name: tagInfo.name,
        num: tagInfo.num
    })
    if (tagFinalList.length === tagLists.length) {
        tagLoading.value = false
    } else {
        tagLoading.value = true
    }
}

onMounted(() => {
    getInfo()
})

watch(showWhat, (val) => {
    if (val === 'tag') {
        tagFinalList.length = 0
        tagLists.map(item => {
            getTagInfos(item)
        })
    }
})

</script>


<style lang="less" scoped>
.article {
    margin: 20px 0;
    width: 100%;
    background: rgba(255, 255, 255, 0);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 25px;

    .title:hover {
        border: var(--box-border-active);
        background: var(--background-hover);
    }

    .title {
        position: relative;
        width: 100%;
        background: rgba(255, 255, 255, 0.9);
        border-radius: 15px;
        padding: 20px;
        transition: all 0.5s;
        border: var(--box-border);
        background: var(--background-transparent);
        margin-bottom: 20px;

        .strip {
            width: 20%;
            height: 6px;
            background-color: rgb(142, 133, 122);
            position: absolute;
            bottom: 0;
            transition: transform 0.3s;
        }

        .tag {
            float: left;
            width: 50%;
            font-size: 22px;
            border-right: 2px solid gray;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.5s;
        }

        .category {
            float: right;
            width: 50%;
            border-left: 2px solid gray;
            font-size: 22px;
            font-weight: 700;
            cursor: pointer;
            transition: color 0.5s;
        }

        .tag:hover,
        .category:hove {
            color: rgb(142, 133, 122);
        }

        .active {
            color: rgb(142, 133, 122);
        }
    }

    .display {
        width: 100%;
        border-radius: 15px;
        padding: 20px;

        .category_art {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
        }
    }
}
</style>