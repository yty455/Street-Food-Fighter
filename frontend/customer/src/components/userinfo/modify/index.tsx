import { ModifyInfoArray } from '@/assets/modifyinfo';
import { ModalOverlay } from './Modify.styled';

interface ModifyProps {
  type: string;
  onClose: () => void;
}

const Modify = ({ type, onClose }: ModifyProps) => {
  const fieldInfo = ModifyInfoArray.find((item) => item.key === type);
  const modifyname = fieldInfo ? fieldInfo.value : type;

  return (
    <ModalOverlay>
      <button onClick={onClose}>닫기</button>
      <div>회원 정보 수정</div>
      <div>변경할 {modifyname}을 입력해주세요</div>
    </ModalOverlay>
  );
};

export default Modify;
