import Topbar from '@/components/common/topbar';
import { Container } from './Selectflag.styled';
import BottomBtn from '@/components/common/bottombtn';

const SelectFlag = ({ onClose }: any) => {
  return (
    <Container>
      <Topbar text="영업 시작" type="close" closeModal={onClose} />
      <div> text</div>
      <BottomBtn text="영업 시작" />
    </Container>
  );
};

export default SelectFlag;
