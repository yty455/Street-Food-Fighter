import { useRouter } from 'next/navigation';
import { StyledTopbar, BackButton } from './Topbar.styled';

const Topbar = ({ text }: any) => {
  const router = useRouter();
  return (
    <StyledTopbar>
      <BackButton>
        <img
          src="/images/common/back.png"
          style={{ width: '30px', height: '30px' }}
          onClick={() => {
            router.back();
          }}
        />
      </BackButton>
      <div>{text}</div>
    </StyledTopbar>
  );
};

export default Topbar;
