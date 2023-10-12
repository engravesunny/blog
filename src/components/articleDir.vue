<template>
    <div class="articleDir box_border unselectable">
        <div class="title">文章目录</div>
        <div class="dir">
            <ul>
                <li class="dir_title" v-for="item in articleDir" :key="item.top">
                    {{ item.title }}
                    <div v-if="item.children.length" class="children">
                        <!-- <div @click="toThisPosition(child)" v-for="(child, cindex) in item.children" :key="child.top"
                            class="child shenglue2" :class="{ actives: active === child.title }">
                            {{ (cindex + 1) + '.' + child.title }}
                        </div> -->

                        <!-- 使用a标签进行锚点定位 -->
                        <div v-for="(child, cindex) in item.children" @click="handleLocate" :key="child.top"
                            class="child shenglue2" :class="{ actives: active === child.title }">
                            <a :href="'#' + child.link">{{ (cindex + 1) + '.' + child.title }}</a>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
// TODO there should have a method to let <a /> be actived, when the article title is inserting in the page.
// TODO there should have a method which can let the article image can be clicked and open in screen.
import { nextTick } from 'vue';

let active = ref('')

const props = defineProps({
    articleDir: {
        type: Array,
        default: []
    }
})

let timer = null;
const handleLocate = () => {
    timer = null;
    document.documentElement.style.scrollBehavior = 'smooth';
    timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'unset';
        timer = null;
    }, 1000);
}

</script>

<style lang="less" scoped>
.articleDir {

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
                    transition: all 0.2s;

                    a {
                        transition: all 0.2s;
                    }
                }

                .child:hover {
                    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.3);
                    transform: translate(0, -1px);
                    background-color: #2d2d2d;
                    color: #fff;

                    a {
                        color: #fff;
                    }
                }

            }
        }


    }
}
</style>