import { StyledBadge } from './Badge.styled';

const Badge = ({ text, color, fontSize }: any) => {
  return (
    <StyledBadge color={color} fontsize={fontSize}>
      {text}
    </StyledBadge>
  );
};
export default Badge;
