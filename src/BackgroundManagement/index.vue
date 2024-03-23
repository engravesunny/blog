<template>
  <div class="container">
    <div v-if="!isShowManagePage" class="login_container">
      <div class="login_box">
        <div class="host">
          <el-input type="text" placeholder="用户名" v-model="loginHost" />
        </div>
        <div class="password">
          <el-input
            type="password"
            placeholder="密码"
            v-model="loginPassword"
          />
        </div>
        <div class="btn">
          <button @click="login">登录</button>
        </div>
      </div>
    </div>
    <el-scrollbar v-if="isShowManagePage" height="100vh">
      <div
        class="managePage"
        @contextmenu.prevent="contextMenuBg($event)"
        v-if="isShowManagePage"
      >
        <div
          class="docCard"
          @contextmenu.stop=""
          @contextmenu.prevent="contextMenuDoc(item)"
          @click.stop="clickDoc(item)"
          v-for="(item, index) in docList"
          :key="index"
        >
          <div class="icon iconfont">
            {{ item.size ? getFileIcon(item.name || item) : "&#xe6ea;" }}
          </div>
          <div class="name">{{ item.name || item }}</div>
        </div>
        <!-- 右键菜单 -->
        <div
          ref="menu"
          v-if="isShowUploadBox"
          class="uploadBox"
          :style="{ top: `${uploadboxTop}px`, left: `${uploadboxLeft}px` }"
        >
          <div class="upload_text" @click="uploadDoc">上传文件</div>
          <div class="createDirList" @click="createDirList">新建文件夹</div>
          <div class="setTop" @click="hanldeSetTop">设置置顶</div>
        </div>

        <!-- 设置置顶弹出框 -->
        <div v-if="isShowSetTopBox" class="createDirBox">
          <div class="title">设置文章置顶</div>
          <el-input
            v-model="createDirName"
            placeholder="输入文章名称"
            autofocus
          ></el-input>
          <div class="btn">
            <el-button type="primary" @click="toSetTop">确认</el-button>
            <el-button @click="btnCancle">取消</el-button>
          </div>
        </div>
        <!-- 设置置顶弹出框 -->

        <!-- 新建文件夹弹出框 -->
        <div v-if="isShowCreateDirBox" class="createDirBox">
          <div class="title">新建文件夹</div>
          <el-input
            v-model="createDirName"
            placeholder="新建文件夹"
            autofocus
          ></el-input>
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
            <el-input
              v-model="tagName"
              placeholder="标签 不同标签空格分开"
            ></el-input>
          </div>
          <div v-if="dirName === 'post'" class="tag">
            <el-upload
              accept="image/*"
              :show-file-list="false"
              style="display: flex; justify-content: center"
              :before-upload="handleUploadPostCover"
            >
              <el-button style="width: 100%; height: 100%">
                上传封面
              </el-button>
            </el-upload>
          </div>
          <div
            v-if="dirName === 'post'"
            class="tag"
            style="display: flex; justify-content: center; margin-top: 20px"
          >
            <div style="width: 70%; height: 135px">
              <el-image
                fit="cover"
                :src="imagePreUrl"
                style="width: 100%; height: 100%"
              >
                <template #error>
                  <div
                    style="
                      background-color: rgb(245, 247, 250);
                      width: 100%;
                      height: 100%;
                      display: flex;
                      justify-content: center;
                      align-items: center;
                      font-size: 14px;
                      color: rgb(187, 190, 196);
                    "
                  >
                    封面预览
                  </div>
                </template>
              </el-image>
            </div>
          </div>
          <div v-if="dirName === 'images'" class="image">
            <el-input v-model="albumName" placeholder="相册名"></el-input>
          </div>
          <div v-if="dirName === 'images'" class="image">
            <el-upload
              :show-file-list="true"
              :multiple="true"
              :before-upload="handleSelectImage"
            >
              <el-button style="width: 100%; margin-bottom: 20px"
                >选择图片</el-button
              >
              <template #tip>
                <div style="line-height: 22px; color: gray; font-size: 12px">
                  您已选择了 {{ uploadImgCount }} 张图片
                </div>
              </template>
            </el-upload>
          </div>

          <div class="btn">
            <el-button
              v-if="dirName === 'post'"
              type="primary"
              class="uploadBtn"
            >
              <el-upload
                :show-file-list="false"
                :multiple="true"
                :before-upload="btnOkToUpload"
                >确定</el-upload
              >
            </el-button>
            <el-button
              v-if="dirName === 'images'"
              type="primary"
              class="uploadBtn"
              @click="btnOkToUploadImages"
            >
              开始上传
            </el-button>
            <el-button @click="btnCancleToUpload">取消</el-button>
          </div>
        </div>
      </div>
    </el-scrollbar>
    <el-card
      style="
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      "
      v-if="uploadFinished === 'uploading'"
    >
      正在上传图片（ {{ successCount + " / " + uploadImgCount }} ）
    </el-card>
  </div>
</template>

<script setup>
import { getFileIcon } from "../utils/file_icons.js";
import { getDirNames, getAllFileInfo, del, createDir } from "@/api/postApi.js";
import { setTopArticle } from "@/utils/setArticleTop";
import uploadUtils from "../utils/uploadDoc";
import { uploadFile } from "@/utils/upload";
import { getCurrentInstance } from "vue";

const route = useRoute();
const router = useRouter();

const imageFile = ref(null);
const imagePreUrl = ref("");
// 设置置顶
const isShowSetTopBox = ref(false);
const hanldeSetTop = () => {
  isShowUploadBox.value = false;
  isShowSetTopBox.value = true;
};
const toSetTop = async () => {
  const name = createDirName.value;
  await setTopArticle(name);
  createDirName.value = "";
  isShowSetTopBox.value = false;
};

// 右键背景上传，右键文件删除

// 右键文件删除功能
// 右键文件
let contextMenuDoc = async (item) => {
  const { data: data1 } = await del({
    file_path: dir_path.value + (item.name ? item.name : item),
  });
  if (data1.code === 0) {
    ElMessage({
      type: "success",
      message: "删除成功",
    });
  }
  getDirPath_Doc(dir_path.value);
};

// 右键菜单栏DOM
let menu = ref(null);

// 关闭右键菜单栏
const handleDocumentClick = (e) => {
  if (isShowUploadBox.value && !menu.value.contains(e.target)) {
    isShowUploadBox.value = false;
  }
};

// 上传文件相关

// 右键菜单栏是否显示
let isShowUploadBox = ref(false);

// 右键上传文件菜单栏坐标
let uploadboxTop = ref(0);
let uploadboxLeft = ref(0);

// 上传文件确认信息box
let isShowUploadDetailBox = ref(false);

// 分类名标签名
let categoryName = ref("");
let tagName = ref("");

// 封面名
let postImage = ref("");

// 相册名
let albumName = ref("");

// 确定上传，取消上传
let btnOkToUpload = async (file) => {
  // 开始上传
  await uploadUtils(
    file,
    dir_path.value,
    categoryName.value,
    tagName.value,
    albumName.value,
    imageFile.value
  );

  // 上传完成收尾工作
  btnCancleToUpload();
  getDirPath_Doc(dir_path.value);
  return false;
};
let btnCancleToUpload = () => {
  categoryName.value = "";
  tagName.value = "";
  isShowUploadDetailBox.value = false;
};

// TODO
// 确定上传图片
const { proxy } = getCurrentInstance();
/**
 * @type { import("@/plugins/promises").PromiseControl } promiseControl
 */
let promiseControl = proxy.$promiseControl;
let imgUploadList = reactive([]);
let uploadImgCount = computed(() => {
  return imgUploadList.length;
});
let successCount = ref(0);
let uploadFinished = ref("finished");
let handleSelectImage = (file) => {
  imgUploadList.push(file);
  return false;
};
let btnOkToUploadImages = () => {
  // 未输入相册名
  if (!albumName.value) {
    ElMessage.error("请输入相册名！！！");
  }
  // 没有目标相册
  if (!docList.includes(albumName.value)) {
    ElMessage.error("请先新建相册！！");
  }
  let dirName = albumName.value;
  uploadFinished.value = "uploading";
  imgUploadList.forEach((img) => {
    let key = dirName + "/" + img.name;
    // 并发限制
    promiseControl.finallyCallback = () => {
      uploadFinished.value = "finished";
      ElMessage(
        "上传完毕：上传总数：" +
          uploadImgCount.value +
          " 上传成功：" +
          successCount.value
      );
      successCount.value = 0;
      imgUploadList.length = 0;
      isShowUploadDetailBox.value = false;
    };
    promiseControl.addTask(
      () =>
        Promise.all([
          createDir({
            dir_path: dir_path.value + key,
          }),
          uploadFile(img, "gallery/" + dirName + "/", img.name),
        ]),
      () => {
        successCount.value++;
      },
      (error) => {
        ElMessage.error(error.message);
      }
    );
  });
  albumName.value = "";
  btnCancleToUpload();
};

// 上传文件
let uploadDoc = () => {
  isShowUploadBox.value = false;
  isShowUploadDetailBox.value = true;
};

// 上传文章封面
let handleUploadPostCover = (file) => {
  let src = URL.createObjectURL(file);
  imagePreUrl.value = src;
  imageFile.value = file;
  return false;
};

// 是否显示新建文件夹box
let isShowCreateDirBox = ref(false);

// 新建文件夹名称
let createDirName = ref("");

// 确认新建
let btnOk = async () => {
  const res = await createDir({
    dir_path: dir_path.value + createDirName.value,
  });
  // 更新文件列表
  getDirPath_Doc(dir_path.value);
  btnCancle();
};

// 取消新建
let btnCancle = () => {
  createDirName.value = "";
  isShowCreateDirBox.value = false;
  isShowSetTopBox.value = false;
};

// 显示新建文件夹box
let createDirList = () => {
  isShowUploadBox.value = false;
  isShowCreateDirBox.value = true;
};

// 文件列表
let docList = reactive([]);

// 当前文件夹路径
let dir_path = ref("./");

// 计算当前文件位置
let dirName = computed(() => {
  if (dir_path.value.indexOf("posts") > -1) {
    return "post";
  } else if (dir_path.value.indexOf("images") > -1) {
    return "images";
  } else if (dir_path.value.indexOf("videos") > -1) {
    return "videos";
  }
});

// 获取或更新获取当前文件夹文件
let getDirPath_Doc = async (dir_path = "./") => {
  docList.splice(0, docList.length);
  let { data: data1 } = await getDirNames({
    dir_path,
  });
  let { data: data2 } = await getAllFileInfo({
    dir_path,
  });
  data1?.data?.dir_names?.forEach((element) => {
    docList.push(element);
  });
  data2?.data?.files?.forEach((element) => {
    docList.push(element);
  });
};

// 点击文件图标
let clickDoc = (item) => {
  if (item.name) {
    // 为文件
    // ...
    return;
  } else {
    // 为文件夹
    // 对当前文件夹路径进行拼接
    dir_path.value = dir_path.value + item + "/";
    // 路由跳转
    router.push({
      path: "/admin",
      query: {
        dir_path: dir_path.value,
      },
    });
  }
};

// 右键空白区域
let contextMenuBg = (e) => {
  uploadboxTop.value = e.pageY;
  uploadboxLeft.value = e.pageX;
  isShowUploadBox.value = true;
};

// 账号密码
let loginHost = ref("");
let loginPassword = ref("");

// 显示后台管理页面
let isShowManagePage = ref(false);
// 登录
let login = () => {
  if (loginHost.value === "kiana" && loginPassword.value === "11151207") {
    isShowManagePage.value = true;
    localStorage.setItem("KECAT_LOGIN_AUTH", "KIANA");
    ElMessage({
      type: "success",
      message: "欢迎回来！！！",
    });
  } else {
    isShowManagePage.value = false;
    ElMessage({
      type: "error",
      message: "你是谁啊，这不是你该来地方！",
    });
  }
};

// 初始化
onMounted(() => {
  document.addEventListener("click", (e) => handleDocumentClick(e));
  let auth = localStorage.getItem("KECAT_LOGIN_AUTH");
  if (auth === "KIANA") {
    isShowManagePage.value = true;
    ElMessage({
      type: "success",
      message: "欢迎回来！！！",
    });
  }
});

// 监听路由
watch(
  () => route,
  (val) => {
    if (val?.query?.dir_path) {
      dir_path.value = val?.query?.dir_path;
      // 更新文件列表
      getDirPath_Doc(dir_path.value);
    } else {
      dir_path.value = "./";
      // 更新文件列表
      getDirPath_Doc(dir_path.value);
    }
  },
  {
    deep: true,
    immediate: true,
  }
);

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
:deep(.el-upload) {
  width: 70%;
  height: 40px;
}

@import "../style/admin.less";
</style>
