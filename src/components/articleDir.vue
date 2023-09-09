<template>
    <div class="articleDir box_border unselectable">
        <div class="title">文章目录</div>
        <div class="dir">
            <ul>
                <li class="dir_title" v-for="item in articleDir" :key="item.top">
                    {{ item.title }}
                    <div v-if="item.children.length" class="children">
                        <div @click="toThisPosition(child)" v-for="(child, cindex) in item.children" :key="child.top"
                            class="child shenglue2" :class="{ actives: active === child.title }">
                            {{ (cindex + 1) + '.' + child.title }}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import PubSub from 'pubsub-js'

let active = ref('')

const props = defineProps({
    articleDir: {
        type: Array,
        default: []
    }
})

let toThisPosition = (child) => {
    PubSub.publish('scrollToFast', child.top + 350);
    active.value = child.title
}

let changeActive = (top) => {
    for (let i = 0; i < props.articleDir[0].children.length; i++) {
        if (top > props.articleDir[0].children[props.articleDir[0].children.length - 1].top) {
            active.value = props.articleDir[0].children[props.articleDir[0].children.length - 1].title
            break;
        }
        if (top > props.articleDir[0].children[i].top && top < props.articleDir[0].children[i + 1].top) {
            active.value = props.articleDir[0].children[i].title
            break;
        }
    }
}


onMounted(() => {
    let scroller = document.querySelector('.el-scrollbar__thumb')
})


watch(() => props, (val) => {

}, {
    deep: true,
    immediate: true
})
</script>

<style lang="less" scoped>
.articleDir {
    .actives {
        box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
        transform: translate(0, -1px);
        background-color: #2d2d2d;
        color: #fff !important;
    }

    width: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 25px;

    .title {
        text-align: center;
        width: 100%;
        height: 50px;
        font-size: 20px;
        font-weight: 700;
    }

    .dir {
        width: 100%;

        .dir_title {
            font-size: 20px;
            font-weight: 700;
            width: 100%;

            .children {
                width: 100%;

                .child {
                    border-radius: 5px;
                    margin: 5px 0;
                    padding: 3px 0 3px 10px;
                    width: 100%;
                    font-weight: 500;
                    font-size: 16px;
                    color: #000;
                    cursor: pointer;
                    transition: all 0.1s;
                }

                .child:hover {
                    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
                    transform: translate(0, -1px);
                    background-color: #2d2d2d;
                    color: #fff;
                }
            }
        }


    }
}
</style>