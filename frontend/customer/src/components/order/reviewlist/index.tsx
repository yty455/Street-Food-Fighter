import { vendorreviewlist } from '@/temp/vendorreviewlist';
import ReviewCard from '../reviewcard';
import { BoxContainer, NoReview } from './Reviewlist.styled';

const Reviewlist = ({ vendorid }: any) => {
  const reviewlist = vendorreviewlist.content || [];

  return (
    <BoxContainer>
      {reviewlist.length == 0 && <NoReview> 리뷰가 없어요 😢</NoReview>}
      {reviewlist.map((review, index) => (
        <ReviewCard key={index} vendorid={vendorid} reviewid={index} />
      ))}
    </BoxContainer>
  );
};

export default Reviewlist;
