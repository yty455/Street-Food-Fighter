import { vendordata } from '@/temp/vendordata';

const ReviewCard = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  return (
    <div>
      <div>
        <div>
          <img src="/images/orderfunding/profile.png" style={{ width: '30px' }} />
          <div> 붕어빵킬러</div>
        </div>
        <div> 리뷰 별 3.0</div>
      </div>
      <div> 세계에서 가장 맛있는 붕어빵이네요 잘먹었습니다!</div>
    </div>
  );
};

export default ReviewCard;
