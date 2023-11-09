import Topbar from '@/components/common/topbar';
import { Container } from './Selectflag.styled';
import BottomBtn from '@/components/common/bottombtn';
import FlagCard from '@/components/flag/flagcard';

const SelectFlag = ({ flags, onClose, onStartOperation }: any) => {
  const handleStartClick = () => {
    if (onStartOperation) {
      onStartOperation();
    }
  };
  return (
    <Container>
      <Topbar text="영업 시작" type="close" closeModal={onClose} />
      <div> text</div>
      <BottomBtn text="영업 시작" onClick={handleStartClick} />
    </Container>
  );
};

export default SelectFlag;
