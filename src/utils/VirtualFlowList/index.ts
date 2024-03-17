// 响应式列数 瀑布流 虚拟列表
import { ColQueueItem, ListItem } from "@/types/virtualFLowListTypes";

export class VirtualFlowList {
  colQueue: ColQueueItem[];
  viewHeight: number;
  gapWidth: number;
  dataSource: ListItem[];
  itemWidth: number;
  colCount: number;
  containerWidth: number;

  constructor(viewHeight: number) {
    this.viewHeight = viewHeight;
    this.colQueue = [];
    this.gapWidth = 0;
    this.itemWidth = 0;
    this.dataSource = [];
    this.colCount = 0;
    this.containerWidth = 0;
  }

  /**
   * 传入容器宽度和单个item 的宽度（占容器的百分比）
   * @param containerWidth 容器宽度
   * @param itemWidth 单个item宽度占百分比
   * @param initDataSource 数据源
   */
  init(containerWidth: number, itemWidth: number, initDataSource: ListItem[]) {
    // 初始化容器参数
    this.calcColCounts_GapWidth(containerWidth, itemWidth);
    // 加载初始图片
    this.addToDataSource(initDataSource);
  }

  update(newContainerWidth: number, newItemWidth: number) {
    // 更新容器参数
    this.calcColCounts_GapWidth(newContainerWidth, newItemWidth);
  }

  calcColCounts_GapWidth(containerWidth: number, itemWidth: number) {
    this.containerWidth = containerWidth;
    this.itemWidth = (containerWidth * itemWidth) / 100;
    this.colCount = Math.floor(this.containerWidth / this.itemWidth);
    this.gapWidth =
      (this.containerWidth - this.itemWidth * this.colCount) /
      (this.colCount - 1);
    if (!this.colQueue.length) {
      this.colQueue = Array<ColQueueItem>(this.colCount)
        .fill({} as ColQueueItem)
        .map((_item) => {
          return {
            width: this.itemWidth,
            height: 0,
            start: 0,
            end: this.viewHeight,
            len: 0,
            itemList: [],
          };
        });
    }
  }

  updateColQueue(scrollTop: number) {
    this.colQueue.forEach((col) => {
      col.start = scrollTop;
      col.end = scrollTop + this.viewHeight;
    });
  }

  // 获取当前最小长度的列ind
  getMinLenColInd() {
    let minInd = 0;
    this.colQueue.forEach((cur, ind) => {
      if (cur.len < this.colQueue[minInd].len) {
        minInd = ind;
      }
    });
    return minInd;
  }

  // 添加到数据源进行初始加载从而获取高度
  addToDataSource(source: ListItem[]) {
    this.dataSource = [
      ...source.map((item) => {
        item.width = this.itemWidth;
        item.top = -9999;
        return item;
      }),
    ];
  }

  addToColQueue(item: ListItem) {
    let minInd = this.getMinLenColInd();
    item.top = this.colQueue[minInd].len;
    item.left = (this.colQueue[minInd].width + this.gapWidth) * minInd;
    this.colQueue[minInd].itemList.push(item);
    this.colQueue[minInd].len += this.gapWidth + item.height;
    this.dataSource.splice(this.dataSource.indexOf(item), 1);
  }

  setPosition() {}

  updatePosition() {}

  get maxHeight() {
    return Math.max(...this.colQueue.map((item) => item.len));
  }
}
