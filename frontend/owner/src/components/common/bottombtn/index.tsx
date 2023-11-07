import { ButtonBox } from './Bottombtn.styled';

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BottomBtn = ({ text, onClick, disabled }: Props) => {
  return (
    <ButtonBox onClick={() => !disabled && onClick()} disabled={disabled}>
      {text}
    </ButtonBox>
  );
};

export default BottomBtn;
