import { StyledButton } from './Button.styled';

const Button = ({ text, onClick }: any) => {
  return <StyledButton onClick={onClick}>{text}</StyledButton>;
};
export default Button;
