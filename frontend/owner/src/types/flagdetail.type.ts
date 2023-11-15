import { UserGrades } from './usergrade.type';

export type FundingUserGrade = {
  LIGHT: number;
  HEAVY: number;
  CHAMPION: number;
  MIDDLE: number;
};

export type FundingUserInfo = {
  userName: string;
  userGrade: UserGrades;
  totalPrice: number;
  menuName: string; // 주문한 메뉴 이름
  menuCount: number; // 주문한 메뉴의 개수
  restCount: number; // 나머지 메뉴 개수 (없으면 0)
};

export type FlagDetailType = {
  date: string;
  openTime: string;
  closeTime: string;
  address: string;
  fundingAmount: number;
  fundingUserGrade: FundingUserGrade;
  fundingUserInfoList: FundingUserInfo[];
};
