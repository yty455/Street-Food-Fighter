import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import { StyledButton, Container, Text } from './Success.styled';

const SuccessPage = () => {
  const router = useRouter();
  return (
    <Container>
      <img src="/images/signup/finish.png" style={{ width: '100px' }} />
      <div>
        <Text>회원가입이</Text>
        <Text> 완료되었어요!</Text>
      </div>
      <StyledButton>
        <RoundButton
          onClick={() => {
            router.push('/login');
          }}
          text="시작하기"
          color="main"
          font="24px"
        />
      </StyledButton>
    </Container>
  );
};

export default SuccessPage;
