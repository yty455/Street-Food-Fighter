// import { vendorreviewlist } from '@/temp/vendorreviewlist';
import { CardContainer, Profile, Name, Content, Starlist, TitleList } from './Reviewcard.styled';
import Stars from '@/components/common/stars';

const ReviewCard = ({ vendorid, reviewdata }: any) => {
  if (!reviewdata) return null;
  return (
    <CardContainer>
      <div>
        <Profile>
          <img src="/images/common/profile.png" style={{ width: '50px' }} />
          <TitleList>
            <Name> {reviewdata.userName}</Name>
            <Starlist>
              <Stars stars={reviewdata.score} />
              <div>{reviewdata.score}.0 </div>
            </Starlist>
          </TitleList>
        </Profile>
      </div>
      <Content> {reviewdata.content}</Content>
    </CardContainer>
  );
};

export default ReviewCard;
