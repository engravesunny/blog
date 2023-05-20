import { ElMessage } from "element-plus"
import { createDir, uploads } from '../api/postApi.js'
import removeFileExtension from "./fileTrueName.js"
import formatDate from "./dateFormat.js"

const uploadDoc = async (file, dir_path, categoryName, tagName, albumName) => {
    const nowTime = file.lastModified
    const file_name = file.name
    // 上传文章
    if (dir_path.indexOf('/posts') > -1) {
        // 上传文章
        if (categoryName === '' || tagName === '') {
            ElMessage({
                type: 'error',
                message: "不能没有分类或标签"
            })
            return false
        }
        // 1.创建虚拟文章目录

        // 1).分类
        const { data: category } = await createDir({
            dir_path: `./posts/postVirtual/${removeFileExtension(file_name)}/category/${categoryName}`
        })
        if (category.code === 0) {
            ElMessage.success('文章虚拟目录分类创建成功')
        } else {
            ElMessage({
                type: 'error',
                message: '文章虚拟目录分类创建失败'
            })
        }

        // 2).标签
        const tagNames = tagName.split(' ')
        let flag = 1
        tagNames.forEach(async item => {
            const { data: tag } = await createDir({
                dir_path: `./posts/postVirtual/${removeFileExtension(file_name)}/tag/${item}`
            })
            if (tag.code !== 0) {
                flag = 0
            }
        })
        if (flag) {
            ElMessage({
                type: 'success',
                message: '文章虚拟目录标签创建成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '文章虚拟目录标签创建失败'
            })
        }

        // 3)上传文件到虚拟目录
        const { data: post } = await uploads({
            dir_path: `./posts/postVirtual/${removeFileExtension(file_name)}/`,
            file
        })
        if (post.code === 0) {
            ElMessage({
                type: 'success',
                message: '上传成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '上传失败'
            })
        }

        // 4)上传文件到目标目录
        const { data: post_tar } = await uploads({
            dir_path: `../../serve/blogServe/public/blog/post/`,
            file
        })
        if (post_tar.code === 0) {
            ElMessage({
                type: 'success',
                message: '上传目标文件夹成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '上传目标文件夹失败'
            })
        }

        // 2.创建分类
        const { data: categoryDir } = await createDir({
            dir_path: `./posts/category/${categoryName}/${removeFileExtension(file_name)}`
        })
        if (categoryDir.code === 0) {
            ElMessage({
                type: 'success',
                message: '分类创建成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '分类创建失败'
            })
        }

        // 3.创建标签
        let flag2 = 1
        tagNames.forEach(async item => {
            const { data: tagDir_part } = await createDir({
                dir_path: `./posts/tag/${item}/${removeFileExtension(file_name)}`
            })
            if (tagDir_part.code !== 0) {
                flag2 = 0
            }
        })
        if (flag2) {
            ElMessage({
                type: 'success',
                message: '分类标签成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '分类标签失败'
            })
        }

        // 4.创建时间
        let dateStr = formatDate(nowTime)
        const { data: dateDir } = await createDir({
            dir_path: `./posts/date/${dateStr}/${removeFileExtension(file_name)}`
        })
        if (dateDir.code === 0) {
            ElMessage({
                type: 'success',
                message: '时间创建成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '时间创建失败'
            })
        }
    }
    // 上传图片
    else if (dir_path.indexOf('/images') > -1) {
        // 要传入相册名 albumName
        // 1.上传图片到虚拟目录
        const { data: img } = await createDir({
            dir_path: `./images/${albumName}/${file_name}`,
        })
        if (img.code === 0) {
            ElMessage({
                type: 'success',
                message: '上传虚拟图片成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '上传虚拟图片失败'
            })
        }

        // 2.上传图片到目标目录
        const nameToDir = {
            '壁纸': 'wallpaper',
            "日常": 'daily',
            "美图": "beautiful",
            "涩涩": "sese",
            "五月": "may"
        }
        const { data: img_tar } = await uploads({
            dir_path: `../../serve/blogServe/public/images/${nameToDir[albumName]}/`,
            file
        })
        if (img_tar.code === 0) {
            ElMessage({
                type: 'success',
                message: '上传图片成功'
            })
        } else {
            ElMessage({
                type: 'error',
                message: '上传图片失败'
            })
        }
    }
}

export default uploadDoc