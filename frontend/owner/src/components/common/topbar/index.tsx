import { useRouter } from 'next/navigation';
import { StyledTopbar, BackButton } from './Topbar.styled';

const Topbar = ({ text, type, closeModal }: any) => {
  const router = useRouter();

  const handleClick = () => {
    if (type === 'close' && closeModal) {
      closeModal();
    } else {
      router.back();
    }
  };

  return (
    <StyledTopbar>
      <BackButton onClick={handleClick}>
        <img src="/images/common/back.png" style={{ width: '30px', height: '30px' }} />
      </BackButton>
      <div>{text}</div>
    </StyledTopbar>
  );
};

export default Topbar;
