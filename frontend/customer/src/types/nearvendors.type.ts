export type VendorType = {
  storeId: number;
  ownerId: number;
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
  state: 'OPEN' | 'CLOSED';
};

// Array of vendors
export type NearVendorsType = VendorType[];
