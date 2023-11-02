import { ButtonBox } from './Bottombtn.styled';

interface Props {
  text: string;
  onClick?: () => void;
}

const BottomBtn = ({ text, onClick }: Props) => {
  return <ButtonBox onClick={onClick}>{text}</ButtonBox>;
};

export default BottomBtn;
