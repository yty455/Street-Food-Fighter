// firebase 연동
import { useEffect, useRef, useState } from 'react';
import {
  ReviewIcon,
  ReviewContainer,
  ReviewContent,
  MenuContainer,
  MenuText,
  ReviewIconContainer,
  ReviewDate,
  ReviewItem,
  ReviewStoreName,
  ReviewTitle,
  ReviewPageStyle,
} from './Review.styled';
import Topbar from '@/components/common/topbar';
import GetMyReviewsAPI from '@/apis/user/GetMyReviews';
import { categories } from '@/assets/category';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const result = await GetMyReviewsAPI(0, 10);
      setReviews(result.response.content);
    };
    getReviews();
  }, []);

  return (
    <ReviewPageStyle>
      <Topbar text="My 스푸파" />
      <ReviewTitle>내가 쓴 총 리뷰 28 개</ReviewTitle>
      <ReviewContainer>
        {reviews.length != 0 &&
          reviews.map((review: any, index: number) => {
            return (
              <ReviewItem key={index}>
                <ReviewStoreName>
                  {review.storeName}
                  <img style={{ width: '25px', height: '25px' }} src="/images/common/right.png" />
                </ReviewStoreName>
                <ReviewDate>{review.createdDate.substring(0, 10)}</ReviewDate>
                <ReviewIconContainer>
                  <ReviewIconComponent categoryType={review.categoryType} score={review.score} />
                </ReviewIconContainer>
                <MenuContainer>
                  {review.menu && review.menu.map((menu: any, index: number) => <MenuText key={'menu-text-' + index}>{menu}</MenuText>)}
                </MenuContainer>
                <ReviewContent>{review.content}</ReviewContent>
              </ReviewItem>
            );
          })}
      </ReviewContainer>
    </ReviewPageStyle>
  );
};

const ReviewIconComponent = ({ categoryType, score }: any) => {
  const getCategoryImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.image : null;
  };

  const getCategoryReviewImage = (type: any) => {
    const category = categories.find((cat) => cat.type === type);
    return category ? category.reviewImage : null;
  };
  const fillIcons = Array.from({ length: score });
  const noFillIcons = Array.from({ length: 5 - score });
  return (
    <>
      {fillIcons.map((_, fillIndex) => (
        <ReviewIcon key={`fill-${fillIndex}`} src={`/images/category/${getCategoryImage(categoryType)}`} alt="" />
      ))}
      {noFillIcons.map((_, noFillIndex) => (
        <ReviewIcon key={`noFill-${noFillIndex}`} src={`/images/category/${getCategoryReviewImage(categoryType)}`} alt="" />
      ))}
    </>
  );
};

export default ReviewPage;
