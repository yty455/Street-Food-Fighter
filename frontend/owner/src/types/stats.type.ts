export interface MenuStat {
  name: string;
  count: number;
  menuTotalPrice: number;
}

export interface AccountStats {
  menuStatsList: MenuStat[];
  totalPrice: number;
}
