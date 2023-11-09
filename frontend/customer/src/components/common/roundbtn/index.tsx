import { StyledButton } from './RoundButton.styled';

const RoundButton = ({ text, onClick, color, font, borderSize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} fontsize={font} borderSize={borderSize}>
      {text}
    </StyledButton>
  );
};
export default RoundButton;
