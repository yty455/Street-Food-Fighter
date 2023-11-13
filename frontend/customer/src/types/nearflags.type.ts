export type FlagType = {
  flagId: number;
  date: string;
  openTime: string;
  closeTime: string;
  address: string;
  lati: number;
  longi: number;
  state: 'WAITING' | 'SUCCESS' | 'FAILURE';
  fundingAmount: number;
};

export type StoreType = {
  storeId?: number;
  ownerId?: number;
  name: string;
  ownerName: string;
  phone: string;
  category: string;
  businessCategory: '푸드트럭' | '포장마차';
  openTime: string;
  closeTime: string;
  activeArea: string;
  lati: number;
  longi: number;
  information: string;
  introduction: string;
  state: 'OPEN' | 'CLOSE';
};

export type NearFlagType = {
  flag: FlagType;
} & StoreType;
