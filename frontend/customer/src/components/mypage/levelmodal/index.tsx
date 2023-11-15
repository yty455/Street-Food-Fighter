import { Airfont, Content, LevelBox, LevelTitle, ModalBackground, ModalContainer, Title } from './Levelmodal.styled';

const LevelModal = ({ toggleModal }: any) => {
  const handleContainerClick = (e: any) => {
    e.stopPropagation();
  };

  return (
    <ModalBackground onClick={toggleModal}>
      <ModalContainer onClick={handleContainerClick}>
        <Title>파이터 등급</Title>
        <Airfont>저번달 주문 횟수를 기준으로 파이터 등급이 정해져요! 등급별로 다양한 혜택을 만나보세요!</Airfont>
        <LevelBox>
          <img src="/images/level/light.png" style={{ width: '80px' }} />
          <Content>
            <LevelTitle> 라이트</LevelTitle>
            <Airfont> 월 5회 미만 주문</Airfont>
          </Content>
        </LevelBox>
        <LevelBox>
          <img src="/images/level/middle.png" style={{ width: '80px' }} />
          <Content>
            <LevelTitle> 미들</LevelTitle>
            <Airfont> 월 5회 이상 주문</Airfont>
          </Content>
        </LevelBox>
        <LevelBox>
          <img src="/images/level/heavy.png" style={{ width: '80px' }} />
          <Content>
            <LevelTitle> 헤비</LevelTitle>
            <Airfont> 월 10회 이상 주문</Airfont>
          </Content>
        </LevelBox>
        <LevelBox>
          <img src="/images/level/champion.png" style={{ width: '80px' }} />
          <Content>
            <LevelTitle> 챔피언 </LevelTitle>
            <Airfont> 월 20회 이상 주문</Airfont>
          </Content>
        </LevelBox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LevelModal;
