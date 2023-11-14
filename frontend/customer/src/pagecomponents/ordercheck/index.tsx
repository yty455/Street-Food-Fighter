import BottomBtn from '@/components/common/bottombtn';
import { useNavStore } from '@/stores/curnavStore';
import { useRouter } from 'next/navigation';
import { Container, StyledTopbar, BigText, SmallText } from './Ordercheck.styled';

const OrderCheckPage = () => {
  const router = useRouter();
  const { curnav } = useNavStore();
  return (
    <div>
      <StyledTopbar>{curnav === 1 ? '주문확인' : '펀딩확인'}</StyledTopbar>
      <Container>
        <img src="/images/circlelogo.png" style={{ width: '200px' }} />
        <BigText>{curnav === 1 ? '주문' : '펀딩'}이 완료되었습니다!</BigText>
        {curnav === 1 ? <SmallText>음식이 완성되면 알림이 갑니다.</SmallText> : <div>영업 당일 펀딩의 결과가 알림으로 갑니다.</div>}
        {curnav === 1 ? (
          <BottomBtn
            text="더 주문하러 가기"
            onClick={() => {
              router.push('/main');
            }}
          ></BottomBtn>
        ) : (
          <BottomBtn
            text="더 펀딩하러 가기"
            onClick={() => {
              router.push('/funding');
            }}
          ></BottomBtn>
        )}
      </Container>
    </div>
  );
};

export default OrderCheckPage;
