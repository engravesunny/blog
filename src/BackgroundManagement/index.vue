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
            <div class="managePage" @contextmenu.prevent="contextMenuBg($event)" v-if="isShowManagePage&&loginHost==='kiana'&&loginPassword==='11151207'">
                <div class="docCard" @contextmenu.stop="" @contextmenu.prevent="contextMenuDoc(item)" @click.stop="clickDoc(item)" v-for="(item,index) in docList" :key="index">
                    <div class="icon iconfont">{{ item.size?getFileIcon(item.name||item):'&#xe6ea;' }}</div>
                    <div class="name">{{ item.name || item }}</div>
                </div>
                <!-- 右键菜单 -->
                <div ref="menu" v-if="isShowUploadBox" class="uploadBox" :style="{top:`${uploadboxTop}px`,left:`${uploadboxLeft}px`}">
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
                    <div class="category">
                        <el-input v-model="categoryName" placeholder="分类"></el-input>
                    </div>
                    <div class="tag">
                        <el-input v-model="tagName" placeholder="标签 不同标签空格分开"></el-input>
                    </div>
                    <div class="btn">
                        <el-button type="primary" class="uploadBtn"><el-upload :before-upload="btnOkToUpload">确定</el-upload></el-button>
                        <el-button @click="btnCancleToUpload">取消</el-button>
                    </div>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>

<script setup>
import removeFileExtension from '../utils/fileTrueName.js'
import { getFileIcon } from '../utils/file_icons.js'
import { getDirNames, getAllFileInfo, uploads, del, createDir } from "@/api/postApi.js"

const route = useRoute()
const router = useRouter()

// 右键背景上传，右键文件删除



// 右键文件删除功能
// 右键文件
let contextMenuDoc = async(item) => {
    const {data:data1} = await del({
        file_path:dir_path.value + (item.name?item.name:item)
    })
    console.log(data1);
    if(data1.code===0){
        ElMessage({
            type:'success',
            message:'删除成功'
        })
    }
    getDirPath_Doc(dir_path.value)
}








// 右键菜单栏DOM
let menu = ref(null)

// 关闭右键菜单栏
const handleDocumentClick = (e) => {
    if(isShowUploadBox.value && !menu.value.contains(e.target)){
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




// 确定上传，取消上传
let btnOkToUpload = async(file) => {
    if(categoryName=== '' || tagName=== ''){
        ElMessage({
            type:'error',
            message:"不能没有分类或标签"
        })
        return false
    }
    const file_name = file.name
    if(dir_path.value.indexOf('/posts')>-1){
        // 上传文章
        // 1.创建虚拟文章目录
        // 1).分类
        const { data:category } = await createDir({
            dir_path:`./posts/postVirtual/${removeFileExtension(file_name)}/category/${categoryName.value}`
        })
        if(category.code === 0){
            ElMessage({
                type:'success',
                message:'文章虚拟目录分类创建成功'
            })
        } else {
            ElMessage({
                type:'error',
                message:'文章虚拟目录分类创建失败'
            })
        }
        // 2).标签
        const tagNames = tagName.value.split(' ')
        let flag = 1
        tagNames.forEach(async item=>{
            const { data:tag } = await createDir({
                dir_path:`./posts/postVirtual/${removeFileExtension(file_name)}/tag/${item}`
            })
            if(tag.code !== 0){
                flag = 0
            }
        })
        if(flag){
            ElMessage({
                type:'success',
                message:'文章虚拟目录标签创建成功'
            })
        } else {
            ElMessage({
                type:'error',
                message:'文章虚拟目录标签创建失败'
            })
        }
        // 3)上传文件到虚拟目录
        const { data:post } = await uploads({
            dir_path:`./posts/postVirtual/${removeFileExtension(file_name)}/`,
            file
        })
        if(post.code === 0){
            ElMessage({
                type:'success',
                message:'上传成功'
            })
        } else {
            ElMessage({
                type:'error',
                message:'上传失败'
            })
        }

        // 2.创建分类
        const { data:categoryDir } = await createDir({
            dir_path:`./posts/category/${categoryName.value}/${removeFileExtension(file_name)}`
        })
        if(categoryDir.code === 0){
            ElMessage({
                type:'success',
                message:'分类创建成功'
            })
        } else {
            ElMessage({
                type:'error',
                message:'分类创建失败'
            })
        }

        // 3.创建标签
        let flag2 = 1
        tagNames.forEach(async item=>{
            const { data:tagDir_part } = await createDir({
                dir_path:`./posts/tag/${item}/${removeFileExtension(file_name)}`
            })
            if(tagDir_part.code !== 0) {
                flag2 = 0
            } 
        })
        if(flag2){
            ElMessage({
                type:'success',
                message:'分类标签成功'
            })
        }  else {
            ElMessage({
                type:'error',
                message:'分类标签失败'
            })
        }
    }
    btnCancleToUpload()
    getDirPath_Doc(dir_path.value)
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
let btnOk = async() =>{
    const res = await createDir({
        dir_path:dir_path.value + createDirName.value
    })
    console.log(res);
    // 更新文件列表
    getDirPath_Doc(dir_path.value)
    btnCancle()
}

// 取消新建
let btnCancle = () =>{
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

// 获取或更新获取当前文件夹文件
let getDirPath_Doc = async(dir_path='./') => {
    docList.splice(0,docList.length)
    console.log(docList);
    let {data:data1} = await getDirNames({
        dir_path
    })
    let { data:data2 } = await getAllFileInfo({
        dir_path
    })
    data1?.data?.dir_names?.forEach(element => {
        docList.push(element)
    });
    data2?.data?.files?.forEach(element=> {
        docList.push(element)
    })
    console.log(docList);
}

// 点击文件图标
let clickDoc = (item) => {
    if(item.name){
        // 为文件
        // ...
        return 
    } else {
        // 为文件夹
        // 对当前文件夹路径进行拼接
        dir_path.value = dir_path.value + item + '/'
        // 路由跳转
        router.push({
            path:'/BackgroundManagement',
            query:{
                dir_path:dir_path.value
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



// kiana
let loginHost = ref('kiana')
// 11151207
let loginPassword = ref('11151207')
// 显示后台管理页面
let isShowManagePage = ref(true)
// 登录
let login = () => {
    if(loginHost.value==='kiana'&&loginPassword.value==='11151207'){
        isShowManagePage.value = true
        ElMessage({
            type:'success',
            message:'欢迎回来！！！'
        })
    } else {
        isShowManagePage.value = false
        ElMessage({
            type:'error',
            message:'你是谁啊，这不是你该来地方！'
        })
    }
}

onMounted(()=>{
    document.addEventListener('click',e=>handleDocumentClick(e))
})

// 监听路由
watch(()=>route,(val)=>{
    if(val?.query?.dir_path){
        dir_path.value = val?.query?.dir_path
        // 更新文件列表
        getDirPath_Doc(dir_path.value)
    } else {
        dir_path.value = './'
        // 更新文件列表
        getDirPath_Doc(dir_path.value)
    }
},{
    deep:true,
    immediate:true
})

// ps -ef | grep blog_helper
// kill -9 201031

</script>

<style lang="less" scoped>
    .container{
        width: 100vw;
        height: 100vh;
        background-color: #fff;
        .login_container{
            position: relative;
            width: 100%;
            height: 100%;
            background-image: url(https://cdn.jsdelivr.net/gh/engravesunny/CDN@v1.0.1/image/kiana.png);
            background-size: cover;
            background-position: center center;
            .login_box{
                background: rgba(0, 0, 0, 0.5);
                border-radius: 10px;
                padding: 50px;
                width: 310px;
                height: 230px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                .host,.password{
                    margin: 10px;
                    width: 200px;
                    height: 30px;
                    background: rgba(255, 255, 255, 0.8);
                    border-radius: 10px;
                    input{
                        width: 100%;
                        height: 100%;
                        background: rgba(255, 255, 255, 0);
                        padding: 10px;
                    }
                }
                .btn{
                    width: 200px;
                    height: 50px;
                    text-align: center;
                    line-height: 50px;
                    button{
                        width: 100px;
                        height: 30px;
                        border-radius: 20px;
                        border: none;
                        cursor: pointer;
                    }
                    button:hover{
                        background: rgba(255, 255, 255, 0.8);
                    }
                }
            }
        }
        .managePage{
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-wrap: wrap;
            align-content: flex-start;
            background-color: #fff;
            .uploadDetail{
                border-radius: 10px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background-color: #fff;
                width: 400px;
                height: 250px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .title{
                    margin-bottom: 20px;
                    font-size: 20px;
                    font-weight: 700;
                }
                .category,.tag{
                    width: 100%;
                    text-align: center;
                    .el-input{
                        margin-bottom: 30px;
                        width: 70%;
                    }
                }
                .btn{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                    line-height: 60px;
                    .uploadBtn{
                        padding-top: 20px;
                    }
                }
            }
            .createDirBox{
                border-radius: 10px;
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                background-color: #fff;
                width: 400px;
                height: 200px;
                border: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                .title{
                    margin-bottom: 20px;
                    font-size: 20px;
                    font-weight: 700;
                }
                .el-input{
                    margin-bottom: 30px;
                    width: 70%;
                }
                .btn{
                    width: 100%;
                    height: 60px;
                    text-align: center;
                }
            }
            .uploadBox{
                font-size: 20px;
                box-sizing: border-box;
                text-align: center;
                line-height: 60px;
                border-radius: 10px;
                position: fixed;
                width: 140px;
                height: 140px;
                background-color: rgb(255, 255, 255);
                border: 1px solid rgba(0, 0, 0, 0.1);
                box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
                .createDirList:hover,.upload_text:hover{
                    width: 100%;
                    height: 50%;
                    background-color: rgb(237, 232, 233);
                    border-radius: 10px;
                    cursor: pointer;
                }
            }
            .docCard{
                float: left;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                padding: 20px;
                margin: 30px;
                width: 160px;
                text-align: center;
                cursor: pointer;
                .icon{
                    font-size: 100px;
                    color: rgb(137, 137, 252);    
                }
                .name{
                    margin: 10px 0;
                    width: 120%;
                    text-align: center;
                    font-size: 18px;
                    font-weight: 700;
                    display: -webkit-box;
                    overflow: hidden;
                    word-wrap: break-word;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    text-overflow: ellipsis;
                }
            }
            .docCard:hover{
                background-color: rgba(0, 0, 0, 0.1);
            }
        }
    }
</style>