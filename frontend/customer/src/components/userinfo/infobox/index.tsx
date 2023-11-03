import { user } from '@/temp/user';
import { BoxContainer, Content, ContentBox, InfoTitle, Right } from './Userinfo.styled';

const InfoBox = () => {
  const curuser = user;
  return (
    <BoxContainer>
      <ContentBox>
        <InfoTitle>이메일</InfoTitle>
        <Right>
          <Content>{curuser.email}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox>
        <InfoTitle>닉네임</InfoTitle>
        <Right>
          <Content>{curuser.nickname}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox>
        <InfoTitle>핸드폰 번호</InfoTitle>
        <Right>
          <Content>{curuser.phone}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox>
        <InfoTitle>내 동네</InfoTitle>
        <Right>
          <Content>
            {curuser.region1} {curuser.region2} {curuser.region3} {curuser.region4}
          </Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox>
        <InfoTitle>결제 비밀번호 변경</InfoTitle>
        <img src="/images/common/right.png" style={{ height: '20px' }} />
      </ContentBox>
    </BoxContainer>
  );
};

export default InfoBox;
