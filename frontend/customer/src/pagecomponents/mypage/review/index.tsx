// firebase 연동
import { useEffect, useRef, useState } from 'react';
import {
  ReviewContent,
  MenuContainer,
  MenuText,
  ReviewIcon,
  ReviewDate,
  ReviewItem,
  ReviewStoreName,
  ReviewTitle,
  ReviewPageStyle,
} from './Review.styled';
import Topbar from '@/components/common/topbar';
import GetMyReviewsAPI from '@/apis/user/GetMyReviews';
const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const result = await GetMyReviewsAPI(0, 10);
      console.log(result.response.content);
      setReviews(result.response.content);
    };
    getReviews();
  }, []);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  return (
    <ReviewPageStyle>
      <Topbar text="My 스푸파" />
      <ReviewTitle>내가 쓴 총 리뷰 28 개</ReviewTitle>

      {reviews.length != 0 &&
        reviews.map((review: any, index: number) => {
          return (
            <ReviewItem key={index}>
              <ReviewStoreName>세계최강 붕어빵</ReviewStoreName>
              <ReviewDate>2023-11-24</ReviewDate>
              <ReviewIcon></ReviewIcon>
              <MenuContainer>
                <MenuText>메뉴 이름</MenuText>
                <MenuText>메뉴 이름2</MenuText>
                <MenuText>메뉴 이름3</MenuText>
                <MenuText>메뉴 이름4</MenuText>
                <MenuText>메뉴 이름5</MenuText>
              </MenuContainer>
              <ReviewContent>내가 리뷰를 남겼지만 초코 붕어빵이 맛있떠라 다들 백설탕 붕어빵을 먹어라</ReviewContent>
            </ReviewItem>
          );
        })}
    </ReviewPageStyle>
  );
};

export default ReviewPage;
