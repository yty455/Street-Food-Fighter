import { vendorreviewlist } from '@/temp/vendorreviewlist';
import ReviewCard from '../reviewcard';
import { BoxContainer, NoReview } from './Reviewlist.styled';
import { useEffect, useState } from 'react';
import VendorReviewAPI from '@/apis/vendor/VendorReviewAPI';

const Reviewlist = ({ vendor, vendorid }: any) => {
  const [reviewlist, setReviewlist] = useState([]);

  // console.log(vendor);
  useEffect(() => {
    const fetchReviews = async () => {
      const response = await VendorReviewAPI({ storeId: vendorid });
      if (response && response.content) {
        setReviewlist(response.content);
      }
    };

    fetchReviews();
  }, [vendor.storeId]);

  return (
    <BoxContainer>
      {reviewlist.length == 0 && <NoReview> 리뷰가 없어요 😢</NoReview>}
      {reviewlist.map((review, index) => (
        <ReviewCard key={index} vendorid={vendor.storeId} reviewdata={review} />
      ))}
    </BoxContainer>
  );
};

export default Reviewlist;
