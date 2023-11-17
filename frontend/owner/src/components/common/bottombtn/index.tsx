import { ButtonBox } from './Bottombtn.styled';

interface Props {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BottomBtn = ({ text, onClick, disabled = false }: Props) => {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <ButtonBox onClick={handleClick} disabled={disabled}>
      {text}
    </ButtonBox>
  );
};

export default BottomBtn;
