import { vendordata } from '@/temp/vendordata';
import { CardContainer, Profile, Name, Content, Starlist, TitleList } from './Reviewcard.styled';
import Stars from '@/components/common/stars';

const ReviewCard = ({ vendorid, reviewid }: any) => {
  const reviewlist = vendordata[vendorid].reviewlist;
  //   console.log('card', reviewlist);
  const reviewdata = reviewlist[reviewid - 1];
  if (!reviewdata) return null;
  return (
    <CardContainer>
      <div>
        <Profile>
          <img src="/images/orderfunding/profile.png" style={{ width: '50px' }} />
          <TitleList>
            <Name> {reviewdata.username}</Name>
            <Starlist>
              <Stars stars={reviewdata.stars} />
              <div>{reviewdata.stars}.0 </div>
            </Starlist>
          </TitleList>
        </Profile>
      </div>
      <Content> {reviewdata.content}</Content>
    </CardContainer>
  );
};

export default ReviewCard;
