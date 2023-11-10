import { StyledButton } from './RoundButton.styled';

const RoundButton = ({ text, onClick, color, font, bordersize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} font={font} bordersize={bordersize}>
      {text}
    </StyledButton>
  );
};
export default RoundButton;
