import { StyledButton } from './RoundButton.styled';

const RoundButton = ({ text, onClick, color, fontSize, borderSize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} fontsize={fontSize} borderSize={borderSize}>
      {text}
    </StyledButton>
  );
};
export default RoundButton;
