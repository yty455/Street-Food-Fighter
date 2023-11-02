import { StyledButton } from './Button.styled';

const Button = ({ text, onClick, color }: any) => {
  return (
    <StyledButton onClick={onClick} color={color}>
      {text}
    </StyledButton>
  );
};
export default Button;
