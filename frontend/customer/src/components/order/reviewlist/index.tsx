import { vendordata } from '@/temp/vendordata';
import ReviewCard from '../reviewcard';
import { BoxContainer } from './Reviewlist.styled';

const Reviewlist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  const reviewlist = vendor?.reviewlist || [];
  return (
    <BoxContainer>
      {reviewlist.map((review) => (
        <ReviewCard key={review.reviewid} vendorid={vendorid} reviewid={review.reviewid} />
      ))}
    </BoxContainer>
  );
};

export default Reviewlist;
