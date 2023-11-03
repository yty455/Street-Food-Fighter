import { user } from '@/temp/user';
import { BoxContainer, Content, ContentBox, InfoTitle, Right } from './Userinfo.styled';
import { useRouter } from 'next/navigation';

const InfoBox = ({ onEditClick }: any) => {
  const curuser = user;
  const router = useRouter();
  return (
    <BoxContainer>
      <ContentBox onClick={() => onEditClick('email')}>
        <InfoTitle>이메일</InfoTitle>
        <Right>
          <Content>{curuser.email}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox onClick={() => onEditClick('nickname')}>
        <InfoTitle>닉네임</InfoTitle>
        <Right>
          <Content>{curuser.nickname}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox onClick={() => onEditClick('phone')}>
        <InfoTitle>핸드폰 번호</InfoTitle>
        <Right>
          <Content>{curuser.phone}</Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox onClick={() => onEditClick('region')}>
        <InfoTitle>내 동네</InfoTitle>
        <Right>
          <Content>
            {curuser.region1} {curuser.region2} {curuser.region3} {curuser.region4}
          </Content>
          <img src="/images/common/right.png" style={{ height: '20px' }} />
        </Right>
      </ContentBox>
      <ContentBox
        onClick={() => {
          router.push('/password');
        }}
      >
        <InfoTitle>결제 비밀번호 변경</InfoTitle>
        <img src="/images/common/right.png" style={{ height: '20px' }} />
      </ContentBox>
    </BoxContainer>
  );
};

export default InfoBox;
