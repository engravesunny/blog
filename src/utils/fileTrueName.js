function removeFileExtension(filename) {
    // 查找文件名中最后一个"."字符的位置
    var dotIndex = filename.lastIndexOf(".");
  
    // 如果找到了"."字符，则从文件名中删除后缀
    if (dotIndex != -1) {
      filename = filename.substr(0, dotIndex);
    }
  
    // 返回不包含后缀的文件名
    return filename;
  }

  export default removeFileExtension