export interface ItemOptionInfo {
  id: number;
  name: string;
  price: number;
}

export interface Item {
  id: number;
  name: string;
  price: number;
  menuUrl: string;
  optionInfoList: ItemOptionInfo[];
}
