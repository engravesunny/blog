<template>
    <div class="nav_list">
        <ul class="main_ul">
            <li class="main_li" v-for="item in controls" :key="item.name">
                <div class="main_li_title iconfont" @click="openMainLi(item)">
                    {{ getFileIcon(item.name) + ' ' + item.name }}
                    <span style="float:right;font-size:20px;transition:all 0.3s;" v-if="item.children"
                        :style="{ transform: `rotate(${isOpen.indexOf(item.name) > -1 ? 0 : 90}deg)` }"
                        class="iconfont">&#xe60c;</span>
                </div>
                <ul class="vice_ul shenglue" v-if="item.children && isOpen.indexOf(item.name) > -1">
                    <li class="vice_li iconfont" v-for="child in item.children" :key="child.name" @click="nextTo(child)">
                        {{ getFileIcon(child.name) + ' ' + child.name }}</li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import getFileIcon from '../../../../../utils/icon'

let isOpen = reactive([])

let nextTo = (item) => {
    if (item.path || item.url) {
        PubSub.publish('nextTo', item)
        PubSub.publish('closeMenuSideBar')
    }
}

let openMainLi = (item) => {
    nextTo(item)
    if (isOpen.indexOf(item.name) > -1) {
        let index = isOpen.indexOf(item.name)
        isOpen.splice(index, 1)
    } else {
        isOpen.push(item.name)
    }
}

const porps = defineProps({
    controls: {
        type: Array,
        default: []
    }
})

</script>

<style lang="less" scoped>
.iconfont {
    font-size: 18px;
}

.nav_list {
    flex: 1;
    width: 300px;
    padding: 20px;
    color: #000;

    .main_ul {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        font-size: 1.15em;

        .main_li {
            width: 100%;
            padding: 0 20px;

            .main_li_title {
                border-radius: 5px;
                width: 100%;
                height: 50px;
                line-height: 50px;
                padding: 0 5px;
                cursor: pointer;
            }

            .main_li_title:hover {
                background-color: skyblue;
            }

            .vice_ul {
                display: flex;
                width: 100%;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;

                .vice_li {
                    border-radius: 5px;
                    margin-left: 30px;
                    width: 190px;
                    padding: 0 5px;
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                }

                .vice_li:hover {
                    background-color: skyblue;
                }
            }
        }
    }
}</style>