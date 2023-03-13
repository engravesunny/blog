export default function getFileIcon(name) {
    
    switch (name) {
      case '首页':
        return String.fromCharCode(parseInt('e622;', 16));
      case '文章':
        return String.fromCharCode(parseInt('e634', 16));
      case '分类':
        return String.fromCharCode(parseInt('e811', 16));
      case '标签':
        return String.fromCharCode(parseInt('e62f', 16));
      case '归档':
        return String.fromCharCode(parseInt('e62d', 16));
      case '导航':
        return String.fromCharCode(parseInt('e651', 16));
      case '常用网站':
        return String.fromCharCode(parseInt('e718', 16));
      case '个人导航':
        return String.fromCharCode(parseInt('e64a', 16));
      case '媒体':
        return String.fromCharCode(parseInt('e656;', 16));
      case '相册':
        return String.fromCharCode(parseInt('e62e', 16));
      case '视频':
        return String.fromCharCode(parseInt('e603', 16));
      case '音乐':
        return String.fromCharCode(parseInt('e7db', 16));
      case '实验室':
        return String.fromCharCode(parseInt('e632', 16));
      case '暂无内容':
        return String.fromCharCode(parseInt('e630', 16));
      case '关于':
        return String.fromCharCode(parseInt('e633', 16));
      case '评论':
        return String.fromCharCode(parseInt('e8b4;', 16));
      case '友链':
        return String.fromCharCode(parseInt('e636;', 16));
      case '关于我':
        return String.fromCharCode(parseInt('e655;', 16));  
      default:
        return String.fromCharCode(parseInt('e628', 16));
    }
  }
  