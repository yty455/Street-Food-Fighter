import { StyledButton } from './Button.styled';

const Button = ({ text, onClick, color, fontSize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} fontsize={fontSize}>
      {text}
    </StyledButton>
  );
};
export default Button;
