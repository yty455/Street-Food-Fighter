import { BadgeBox } from './Badge.styled';

const Badge = ({ name }: any) => {
  return (
    <BadgeBox>
      <div>{name}</div>
    </BadgeBox>
  );
};

export default Badge;
