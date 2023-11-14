import { useRouter } from 'next/navigation';
import { StyledTopbar, BackButton, Text } from './Topbar.styled';

const Topbar = ({ text, type, closeModal, onBack }: any) => {
  const router = useRouter();

  const handleClick = () => {
    if (type === 'close' && closeModal) {
      closeModal();
    } else if (type === 'start' && closeModal && onBack) {
      onBack();
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
      <Text>{text}</Text>
      <div style={{ width: '30%' }}></div>
    </StyledTopbar>
  );
};

export default Topbar;
