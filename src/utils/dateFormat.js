const formatDate = (nowtime) => {
    var now = new Date(nowtime);
    var year = now.getFullYear();      // 获取当前年份
    var month = now.getMonth() + 1;    // 获取当前月份，注意要加 1，因为月份从 0 开始计数

    if (month < 10) {
    month = "0" + month;   // 如果月份小于 10，前面补零
    }

    var year_month = year + "-" + month;   // 拼接年份和月份字符串
    return year_month   // 控制台输出年份和月份字符串
}

export default formatDate