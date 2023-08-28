<template>
    <div class="container">
        <div class="page-title">
            <small-card name="返回" v-if="photos.length" @click="back"></small-card>
            <small-card name="相册" v-else></small-card>
        </div>
        <dialog-page :currentIndex="currentIndex" @changeIndex="openImg" v-if="showDialog" :length="photos.length"
            :src="src" :ablum="albumName" @closeImg="closeImg" />
        <div v-if="album.length" class="shell">
            <detail-photo @openImg="openImg" v-if="photos.length" :ablum="nameToDir[albumName]"
                :photos="photos"></detail-photo>
            <photo v-else style="cursor: pointer;" @click="handleClickAlbum(item.title)" v-for="item in album"
                :key="item.title" :src="`${imgBaseURL}${nameToDir[item.title]}/${coverImg[item.title]}`"
                :title="item.title" />
        </div>
        <el-scrollbar height="100vh">
            <div class="normal">
                <detail-photo @openImg="openImg" v-if="photos.length" :ablum="nameToDir[albumName]"
                    :photos="photos"></detail-photo>
                <photo v-else style="cursor: pointer;" @click="handleClickAlbum(item.title)" v-for="item in album"
                    :key="item.title" :src="`${imgBaseURL}${nameToDir[item.title]}/${coverImg[item.title]}`"
                    :title="item.title" />
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import photo from './components/photo.vue';
import { onBeforeMount, onMounted, reactive } from 'vue';
import { getDirNames, getAllFileInfo } from '../../../api/postApi';
import { imgBaseURL } from '../../../constant/index'
import smallCard from '@/components/smallCard.vue'
import DetailPhoto from './components/detailPhoto.vue'
import DialogPage from './components/dialog.vue';
import pubsub from 'pubsub-js'

const currentIndex = ref(0)
const src = ref(null)
const ablum = ref('')
const coverImg = {
    '壁纸': '40.webp',
    "日常": '5.webp',
    "美图": "268.webp",
    "涩涩": "175.webp",
    "五月": "3.webp"
}
const nameToDir = {
    '壁纸': 'wallpaper',
    "日常": 'daily',
    "美图": "beautiful",
    "涩涩": "sese",
    "五月": "may"
}

const showDialog = ref(false)
const router = useRouter()
const route = useRoute()
const albumName = ref('')
const album = reactive([])
const photos = reactive([])
const getAlbumSrc = async () => {
    const { data: title } = await getDirNames({
        dir_path: "./images/"
    })
    title.data.dir_names.map(async item => {
        const { data: img } = await getDirNames({
            dir_path: "./images/" + item + '/'
        })
        album.push({
            title: item,
            img: img.data.dir_names[0]
        })
    })
}
const handleClickAlbum = (title) => {
    router.push({
        path: "/photo",
        query: {
            album: title
        }
    })
}
const back = () => {
    router.push({
        path: "/photo"
    })
}

const closeImg = (e) => {
    showDialog.value = false
}
const openImg = (ind) => {
    showDialog.value = true
    currentIndex.value = ind
    src.value = imgBaseURL + nameToDir[albumName.value] + '/' + photos[ind]
}

onBeforeMount(() => {
    getAlbumSrc()
})

watch(() => route, (val) => {
    photos.length = 0
    const albumN = val.query?.album
    if (albumN) {
        albumName.value = albumN
        getDirNames({
            dir_path: "./images/" + albumN + '/'
        }).then(res => {
            res.data.data.dir_names.map(item => {
                photos.unshift(item)
            })
        })
    }
}, {
    deep: true,
    immediate: true
})

</script>

<style lang="less" scoped>
.fadeIn {
    animation: fadeIn;
    animation-duration: 0.5s;
}

::-webkit-scrollbar {
    width: 1px;
    height: 1px;
}

.slower {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.12px) scale(1.3) translateX(0) translateY(-8vh) !important;

}

.slower1 {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.25px) scale(1.35) translateX(0) translateY(2vh) !important;
}

.slower-down {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.1px) scale(1) translateX(0) translateY(16vh) !important;
}

.faster {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.05px) scale(1.1) translateX(0) translateY(15vh) !important;
}

.faster1 {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(.05px) scale(1.4) translateX(0) translateY(10vh) !important;
}

.fastest {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(.22px) scale(0.7) translateX(-10vh) translateY(-15vh) !important;
}

.vertical {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        transform: rotate(0) !important;
    }

    transform: rotate(90deg) translateZ(-.1px) scale(1.6) translateX(0) translateY(-3vh) !important;
}

.container {
    width: 100%;
    height: 100%;

    .page-title {
        @media screen and (min-width:300px) and (max-width:500px) {
            padding: 5px 10px;
            left: 10px;
        }

        position: fixed;
        padding: 10px 20px;
        top: 50px;
        left: 50px;
        z-index: 999;

    }
}

.shell {
    @media screen and (min-width: 300px) and (max-width: 500px) {
        display: none;
    }

    display: flex;
    padding-top: 250px;
    width: 100vh;
    height: 100vw;
    flex-direction: column;
    align-items: center;
    transform: rotate(-90deg) translate(0, -100vh);
    transform-origin: right top;
    overflow-x: hidden;
    perspective: 1px;
    transform-style: preserve-3d;

    .image {
        margin: 180px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        transform-origin: 50% 50%;
        transform: rotate(90deg) translateZ(.1px) scale(1.1) translateX(0) translateY(2vh);
        z-index: -1;

        .title {
            margin: 10px 10px;
            padding: 5px 10px;
            background-color: rgba(255, 255, 255, 0.9);
            min-width: 100px;
            font-size: 18px;
            border-radius: 5px;
            color: #333;
            text-align: center;
        }

        img {
            border: 10px solid #fff;
            max-width: 45vh;
            max-height: 50vh;
            min-width: 200px;
            min-height: 100px;
            transition: .5s;
        }

        img:hover {
            box-shadow: 0 10px 30px #86c4f7;
            transform: scale(1.05);
        }
    }

    .image:hover {
        z-index: 1;
    }
}
</style>
