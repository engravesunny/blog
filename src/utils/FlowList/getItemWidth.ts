export const getItemWidth = (containerWidth: number, emits: Function) => {
    let tempWidth = 0;
    if (containerWidth > 1600) {
        // 6列
        emits('handleUpdateItemWidth', 16);
        tempWidth = 16;
    }
    if (containerWidth > 1250 && containerWidth <= 1600) {
        // 5列
        emits('handleUpdateItemWidth', 19);
        tempWidth = 19;
    } else if (containerWidth > 900 && containerWidth <= 1250) {
        // 4列
        emits('handleUpdateItemWidth', 24);
        tempWidth = 24;
    } else if (containerWidth > 640 && containerWidth <= 900) {
        // 3列
        emits('handleUpdateItemWidth', 32.5);
        tempWidth = 32.5;
    } else if (containerWidth > 375 && containerWidth <= 640) {
        // 2列
        emits('handleUpdateItemWidth', 48);
        tempWidth = 48;
    } else if (containerWidth <= 375) {
        // 1列
        emits('handleUpdateItemWidth', 48);
        tempWidth = 48;
    }
    return tempWidth;
}