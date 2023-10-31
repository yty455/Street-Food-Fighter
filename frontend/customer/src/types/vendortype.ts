export interface Option {
  id: number;
  name: string;
  price: number;
}

export interface MenuOption {
  id: number;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  menuimg: string;
  options: MenuOption[];
  price: number;
}

export interface Review {
  reviewid: number;
  userid: number;
  username: string;
  stars: number;
  content: string;
}

export interface Vendor {
  id: number;
  name: string;
  lat: number;
  lng: number;
  category: number;
  review: number;
  phone: string;
  introduction: string;
  starttime: string;
  endtime: string;
  loc: string;
  notice: string;
  menulist: MenuItem[];
  reviewlist: Review[];
}
