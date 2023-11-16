import { StyledButton } from './Button.styled';

const Button = ({ text, onClick, color, size }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} size={size}>
      {text}
    </StyledButton>
  );
};
export default Button;
