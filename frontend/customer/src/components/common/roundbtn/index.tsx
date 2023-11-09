import { StyledButton } from './RoundButton.styled';

const RoundButton = ({ text, onClick, color, font, borderSize }: any) => {
  return (
    <StyledButton onClick={onClick} color={color} font={font} borderSize={borderSize}>
      {text}
    </StyledButton>
  );
};
export default RoundButton;
