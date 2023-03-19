export function getFileIcon(file) {
  if(file === 'blog_helper') return String.fromCharCode(parseInt('e637', 16));
    let lastDotIndex = file.lastIndexOf(".");
    let extension = ''
    if (lastDotIndex === -1) {
        extension =  ""; // 如果没有找到点号，返回空字符串
    } else {
        extension = file.slice(lastDotIndex + 1);
    }
    switch (extension) {
      case '':
        return String.fromCharCode(parseInt('e6ea', 16));
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return String.fromCharCode(parseInt('e62e', 16));
      case 'mp3':
      case 'wav':
      case 'flac':
        return String.fromCharCode(parseInt('e7db', 16));
      case 'mp4':
      case 'avi':
      case 'mov':
      case 'wmv':
        return String.fromCharCode(parseInt('e603', 16));
      default:
        return String.fromCharCode(parseInt('e637', 16));
    }
  }
  