import { AlertMessage, AlertTypeToIdMapping } from '@/types/alerttype';

export const alertTypeToIdMapping: AlertTypeToIdMapping = {
  FAILURE: 1,
  SUCCESS: 2,
  PROCESSING: 3,
  REQUEST: 4,
  COMPLETED: 5,
  REFUSED: 6,
};

export const alertMessages: AlertMessage[] = [
  {
    id: 1,
    type: 'FAILURE',
    title: '펀딩이 실패했어요',
    content: '의 선택을 받지 못했어요.. 아쉽지만 다음 기회를 노려보아요.',
    imgsrc: '/images/alert/sad.png',
  },
  {
    id: 2,
    type: 'SUCCESS',
    title: '펀딩이 성공했어요',
    content: '이 오픈했어요! 먹으러 슝~!',
    imgsrc: '/images/alert/notice.png',
  },
  {
    id: 3,
    type: 'PROCESSING',
    title: '주문이 접수되었어요',
    content: ' 사장님이 맛있게 드실수 있도록 메뉴를 조리하고 있어요',
    imgsrc: '/images/alert/list.png',
  },
  {
    id: 4,
    type: 'REQUEST',
    title: '주문이 접수되었어요',
    content: ' 에서 맛있게 드셨나요? 멋진 리뷰 하나만 남겨주세요!',
    imgsrc: '/images/alert/alert.png',
  },
  {
    id: 5,
    type: 'COMPLETED',
    title: '음식이 준비 되었어요',
    content: ' 사장님이 빨리 안오면 다 먹어버린대요',
    imgsrc: '/images/alert/bag.png',
  },
  {
    id: 6,
    type: 'REFUSED',
    title: '주문이 거절 되었어요',
    content: ' 사장님이 집 가고 싶대요... 다음에 주문해줘요',
    imgsrc: '/images/alert/sad.png',
  },
];
