<template>
    <div class="container">
        <div v-if="!isShowManagePage" class="login_container">
            <div class="login_box">
                <div class="host">
                    <input type="text" placeholder="用户名" v-model="loginHost">
                </div>
                <div class="password">
                    <input type="password" placeholder="密码" v-model="loginPassword">
                </div>
                <div class="btn">
                    <button @click="login">登录</button>
                </div>
            </div>
        </div>
        <el-scrollbar height="100vh">
            <div class="managePage" @contextmenu.prevent="contextMenuBg($event)"
                v-if="isShowManagePage && loginHost === 'kiana' && loginPassword === '11151207'">
                <div class="docCard" @contextmenu.stop="" @contextmenu.prevent="contextMenuDoc(item)"
                    @click.stop="clickDoc(item)" v-for="(item, index) in docList" :key="index">
                    <div class="icon iconfont">{{ item.size ? getFileIcon(item.name || item) : '&#xe6ea;' }}</div>
                    <div class="name">{{ item.name || item }}</div>
                </div>
                <!-- 右键菜单 -->
                <div ref="menu" v-if="isShowUploadBox" class="uploadBox"
                    :style="{ top: `${uploadboxTop}px`, left: `${uploadboxLeft}px` }">
                    <div class="upload_text" @click="uploadDoc">上传文件</div>
                    <div class="createDirList" @click="createDirList">
                        新建文件夹
                    </div>
                </div>

                <!-- 新建文件夹弹出框 -->
                <div v-if="isShowCreateDirBox" class="createDirBox">
                    <div class="title">新建文件夹</div>
                    <el-input v-model="createDirName" placeholder="新建文件夹" autofocus></el-input>
                    <div class="btn">
                        <el-button type="primary" @click="btnOk">确认</el-button>
                        <el-button @click="btnCancle">取消</el-button>
                    </div>
                </div>

                <!-- 上传文件确认信息 -->
                <div class="uploadDetail" v-if="isShowUploadDetailBox">
                    <div class="title">上传文件</div>
                    <div v-if="dirName === 'post'" class="category">
                        <el-input v-model="categoryName" placeholder="分类"></el-input>
                    </div>
                    <div v-if="dirName === 'post'" class="tag">
                        <el-input v-model="tagName" placeholder="标签 不同标签空格分开"></el-input>
                    </div>
                    <div v-if="dirName === 'post'" class="tag">
                        <el-input v-model="postImage" placeholder="文章封面"></el-input>
                    </div>
                    <div v-if="dirName === 'images'" class="image">
                        <el-input v-model="albumName" placeholder="相册名"></el-input>
                    </div>
                    <div class="btn">
                        <el-button type="primary" class="uploadBtn"><el-upload :show-file-list="false" :multiple="true"
                                :before-upload="btnOkToUpload">确定</el-upload></el-button>
                        <el-button @click="btnCancleToUpload">取消</el-button>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import { getFileIcon } from '../utils/file_icons.js'
import { getDirNames, getAllFileInfo, del, createDir } from "@/api/postApi.js"
import uploadUtils from '../utils/uploadDoc';

const route = useRoute()
const router = useRouter()


// 右键背景上传，右键文件删除

// 右键文件删除功能
// 右键文件
let contextMenuDoc = async (item) => {
    const { data: data1 } = await del({
        file_path: dir_path.value + (item.name ? item.name : item)
    })
    if (data1.code === 0) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    }
    getDirPath_Doc(dir_path.value)
}

// 右键菜单栏DOM
let menu = ref(null)

// 关闭右键菜单栏
const handleDocumentClick = (e) => {
    if (isShowUploadBox.value && !menu.value.contains(e.target)) {
        isShowUploadBox.value = false
    }
}

// 上传文件相关

// 右键菜单栏是否显示
let isShowUploadBox = ref(false)

// 右键上传文件菜单栏坐标
let uploadboxTop = ref(0)
let uploadboxLeft = ref(0)

// 上传文件确认信息box
let isShowUploadDetailBox = ref(false)

// 分类名标签名
let categoryName = ref('')
let tagName = ref('')

// 封面名
let postImage = ref('')

// 相册名
let albumName = ref('')

// 确定上传，取消上传
let btnOkToUpload = async (file) => {

    // 开始上传
    await uploadUtils(file, dir_path.value, categoryName.value, tagName.value, albumName.value, postImage.value)

    // 上传完成收尾工作
    btnCancleToUpload()
    getDirPath_Doc(dir_path.value)
    localStorage.removeItem('ABOUT_ME')
    return false
}
let btnCancleToUpload = () => {
    categoryName.value = ''
    tagName.value = ''
    isShowUploadDetailBox.value = false
}



// 上传文件
let uploadDoc = () => {
    isShowUploadBox.value = false
    isShowUploadDetailBox.value = true
}

// 是否显示新建文件夹box
let isShowCreateDirBox = ref(false)

// 新建文件夹名称
let createDirName = ref('')

// 确认新建
let btnOk = async () => {
    const res = await createDir({
        dir_path: dir_path.value + createDirName.value
    })
    // 更新文件列表
    getDirPath_Doc(dir_path.value)
    btnCancle()
}

// 取消新建
let btnCancle = () => {
    createDirName.value = ''
    isShowCreateDirBox.value = false
}

// 显示新建文件夹box
let createDirList = () => {
    isShowUploadBox.value = false
    isShowCreateDirBox.value = true
}

// 文件列表
let docList = reactive([])

// 当前文件夹路径
let dir_path = ref('./')

// 计算当前文件位置
let dirName = computed(() => {
    if (dir_path.value.indexOf('posts') > -1) {
        return 'post'
    } else if (dir_path.value.indexOf('images') > -1) {
        return 'images'
    } else if (dir_path.value.indexOf('videos') > -1) {
        return 'videos'
    }
})

// 获取或更新获取当前文件夹文件
let getDirPath_Doc = async (dir_path = './') => {
    docList.splice(0, docList.length)
    let { data: data1 } = await getDirNames({
        dir_path
    })
    let { data: data2 } = await getAllFileInfo({
        dir_path
    })
    data1?.data?.dir_names?.forEach(element => {
        docList.push(element)
    });
    data2?.data?.files?.forEach(element => {
        docList.push(element)
    })
}

// 点击文件图标
let clickDoc = (item) => {
    if (item.name) {
        // 为文件
        // ...
        return
    } else {
        // 为文件夹
        // 对当前文件夹路径进行拼接
        dir_path.value = dir_path.value + item + '/'
        // 路由跳转
        router.push({
            path: '/admin',
            query: {
                dir_path: dir_path.value
            }
        })
    }
}

// 右键空白区域
let contextMenuBg = (e) => {
    uploadboxTop.value = e.pageY
    uploadboxLeft.value = e.pageX
    isShowUploadBox.value = true
}

// 账号密码
let loginHost = ref('')
let loginPassword = ref('')

// 显示后台管理页面
let isShowManagePage = ref(false)
// 登录
let login = () => {
    if (loginHost.value === 'kiana' && loginPassword.value === '11151207') {
        isShowManagePage.value = true
        ElMessage({
            type: 'success',
            message: '欢迎回来！！！'
        })
    } else {
        isShowManagePage.value = false
        ElMessage({
            type: 'error',
            message: '你是谁啊，这不是你该来地方！'
        })
    }
}

// 初始化
onMounted(() => {
    document.addEventListener('click', e => handleDocumentClick(e))
})

// 监听路由
watch(() => route, (val) => {
    if (val?.query?.dir_path) {
        dir_path.value = val?.query?.dir_path
        // 更新文件列表
        getDirPath_Doc(dir_path.value)
    } else {
        dir_path.value = './'
        // 更新文件列表
        getDirPath_Doc(dir_path.value)
    }
}, {
    deep: true,
    immediate: true
})


// ps -ef | grep blog_helper
// kill -9 201031

</script>

<style lang="less" scoped>
.newbtn {
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 100px;
    height: 50px;
    font-size: 18px;
}

@import '../style/admin.less';
</style>