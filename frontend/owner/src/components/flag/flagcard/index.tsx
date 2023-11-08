import { CardWrapper, Row, Title, Content, ContentBox } from './Flagcard.styled';

const FlagCard = ({ flag, onClick }: any) => {
  return (
    <CardWrapper onClick={onClick}>
      <img src={`/images/flag/flag${flag.flagId}.png`} style={{ width: '40px' }} />
      <ContentBox>
        <Row>
          <Title>펀딩 금액</Title>
          <Content>{Number(flag.fundingAmount).toLocaleString()}원</Content>
        </Row>
        <Row>
          <Title>영업 시간</Title>
          <Content>
            {flag.openTime} ~ {flag.closeTime}
          </Content>
        </Row>
        <Row>
          <Title>상세 주소</Title>
          <Content>{flag.address}</Content>
        </Row>
      </ContentBox>
      <img src="/images/common/right.png" style={{ width: '30px' }} />
    </CardWrapper>
  );
};

export default FlagCard;
