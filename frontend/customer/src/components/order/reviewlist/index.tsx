import { vendordata } from '@/temp/vendordata';
import ReviewCard from '../reviewcard';
import { BoxContainer, NoReview } from './Reviewlist.styled';

const Reviewlist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  const reviewlist = vendor?.reviewlist || [];
  return (
    <BoxContainer>
      {reviewlist.length == 0 && <NoReview> 리뷰가 없어요 😢</NoReview>}
      {reviewlist.map((review) => (
        <ReviewCard key={review.reviewid} vendorid={vendorid} reviewid={review.reviewid} />
      ))}
    </BoxContainer>
  );
};

export default Reviewlist;
