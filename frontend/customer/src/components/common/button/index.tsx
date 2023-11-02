import { StyledButton } from './Button.styled';

const Button = ({ text, onClick, color, fontsize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} fontsize={fontsize}>
      {text}
    </StyledButton>
  );
};
export default Button;
