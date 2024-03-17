export interface ColQueueItem {
  width: number;
  height: number;
  start: number;
  end: number;
  len: number;
  itemList: ListItem[];
}

export interface ListItem {
  imgUrl: string;
  top?: number;
  left?: number;
  dom?: HTMLElement;
  width: number;
  height: number;
}
