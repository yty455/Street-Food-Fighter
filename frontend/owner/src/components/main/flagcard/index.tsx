import { CardWrapper, Row, Title, Content, ContentBox } from './Flagcard.styled';

const FlagCard = ({ flag, onClick, selected, flagidx }: any) => {
  return (
    <CardWrapper onClick={() => onClick(flag.flagId)} type={selected ? 'select' : 'noselect'}>
      <img src={`/images/flag/flag${flagidx + 1}.png`} style={{ width: '40px' }} />
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
    </CardWrapper>
  );
};

export default FlagCard;
