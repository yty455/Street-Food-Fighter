import { ButtonBox } from './Bottombtn.styled';

interface Props {
  text: string;
}

const BottomBtn = ({ text }: Props) => {
  return <ButtonBox>{text}</ButtonBox>;
};

export default BottomBtn;
