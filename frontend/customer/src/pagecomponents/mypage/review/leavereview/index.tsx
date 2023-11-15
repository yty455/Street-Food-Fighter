// firebase 연동
import { useEffect, useState } from 'react';
import { ReviewIcon, ReviewTitle, LeaveReviewPageStyle } from './LeaveReview.styled';
import Topbar from '@/components/common/topbar';
import GetMyReviewsAPI from '@/apis/user/GetMyReviews';
import { categories } from '@/assets/category';

const LeaveReviewPage = ({ params, ...props }: any) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const result = await GetMyReviewsAPI(0, 10);
      setReviews(result.response.content);
    };
    getReviews();
  }, []);

  return (
    <LeaveReviewPageStyle>
      <Topbar text="리뷰 관리" />
      <ReviewTitle>내가 쓴 총 리뷰 {reviews.length} 개</ReviewTitle>
      {/* <ReviewIconComponent categoryType={review.categoryType} score={review.score} /> */}
    </LeaveReviewPageStyle>
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

export default LeaveReviewPage;
