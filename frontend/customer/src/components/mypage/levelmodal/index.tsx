import { ModalBackground, ModalContainer } from './Levelmodal.styled';

const LevelModal = ({ toggleModal }: any) => {
  return (
    <ModalBackground onClick={toggleModal}>
      <ModalContainer>
        <div>파이터 등급</div>
        <div>저번달 주문 횟수를 기준으로 파이터 등급이 정해져요! 등급별로 다양한 혜택을 만나보세요!</div>
        <div>라이트</div>
        <div>미들</div>
        <div>헤비</div>
        <div>챔피언</div>
      </ModalContainer>
    </ModalBackground>
  );
};

export default LevelModal;
