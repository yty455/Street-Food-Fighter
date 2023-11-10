import { StyledBadge } from './Badge.styled';

const Badge = ({ text, color, fontSize }: any) => {
  return (
    <StyledBadge color={color} size={fontSize}>
      {text}
    </StyledBadge>
  );
};
export default Badge;
