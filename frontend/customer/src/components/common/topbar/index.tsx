import { useRouter } from 'next/navigation';
import { StyledTopbar, BackButton, Text } from './Topbar.styled';

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
      <BackButton>
        <img onClick={handleClick} src="/images/top/back.png" style={{ width: '25px', height: '25px' }} />
      </BackButton>
      <Text>{text}</Text>
    </StyledTopbar>
  );
};

export default Topbar;
