export type OptionInfo = {
  id: number;
  name: string;
  price: number;
};

export type MenuInfo = {
  id: number;
  name: string;
  price: number;
  menuUrl: string;
  optionInfoList: OptionInfo[];
};

export type VendorData = {
  name: string;
  ownerName: string;
  phone: string;
  openTime: string;
  closeTime: string;
  activeArea: string;
  information: string;
  introduction: string;
  categoryType: string;
  menuInfoResponseList: MenuInfo[];
  score: number;
};
