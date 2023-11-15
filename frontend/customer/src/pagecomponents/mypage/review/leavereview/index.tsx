// firebase 연동
import { useEffect, useState } from 'react';
import {
  ButtonWrapper,
  InputWrapper,
  ReviewIconContainer,
  MenuText,
  MenuContainer,
  ReviewIcon,
  ReviewTitle,
  LeaveReviewPageStyle,
} from './LeaveReview.styled';
import Topbar from '@/components/common/topbar';
import { categories } from '@/assets/category';
import GetOrderDetailAPI from '@/apis/orderlist/GetOrderDetail';
import Input from '@/components/common/input';
import Button from '@/components/common/button';

const LeaveReviewPage = ({ params, ...props }: any) => {
  const [reviewInfo, setReviewInfo] = useState<any>();
  const [score, setScore] = useState<number>(0);
  const [reviewText, setReviewTest] = useState<string>('');

  useEffect(() => {
    const getReviews = async () => {
      const result = await GetOrderDetailAPI(params.id);
      setReviewInfo(result.response);
      console.log(result);
    };
    getReviews();
  }, []);

  return (
    <LeaveReviewPageStyle>
      <Topbar text="리뷰 관리" />
      <ReviewTitle>리뷰를 남겨주세요!</ReviewTitle>
      <ReviewIconContainer>
        {reviewInfo && <ReviewIconComponent categoryType={reviewInfo.categoryType} score={score} setScore={setScore} />}
      </ReviewIconContainer>
      <MenuContainer>
        {reviewInfo?.orderItemList &&
          reviewInfo.orderItemList.map((menu: any, index: number) => <MenuText key={'menu-text-' + index}>{menu.name}</MenuText>)}
      </MenuContainer>
      <InputWrapper>
        <Input value={reviewText} onChange={(e: any) => setReviewTest(e.target.value)} placeholder="리뷰를 작성해주세요" use="info"></Input>
      </InputWrapper>
      <ButtonWrapper>
        <Button text="작성하기"> </Button>
      </ButtonWrapper>
    </LeaveReviewPageStyle>
  );
};

const ReviewIconComponent = ({ categoryType, score, setScore }: any) => {
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
      {fillIcons.map((_, fillIndex: number) => (
        <ReviewIcon
          onClick={() => setScore(fillIndex + 1)}
          key={`fill-${fillIndex}`}
          src={`/images/category/${getCategoryImage(categoryType)}`}
          alt=""
        />
      ))}
      {noFillIcons.map((_, noFillIndex: number) => (
        <ReviewIcon
          onClick={() => setScore((prev: number) => prev + noFillIndex + 1)}
          key={`noFill-${noFillIndex}`}
          src={`/images/category/${getCategoryReviewImage(categoryType)}`}
          alt=""
        />
      ))}
    </>
  );
};

export default LeaveReviewPage;
