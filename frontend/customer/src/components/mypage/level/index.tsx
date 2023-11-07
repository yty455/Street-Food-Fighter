import levels from '@/assets/level';
import { LevelContainer, LevelText } from './Level.styled';
import { LevelProps } from '@/types/level.type';

const Level = ({ level }: LevelProps) => {
  const levelInfo = levels[level];
  return (
    <LevelContainer>
      <img src={`${levelInfo.image}`} style={{ width: '20px' }} />
      <LevelText style={{ paddingBottom: '2px' }}>{levelInfo.label}급 파이터</LevelText>
    </LevelContainer>
  );
};

export default Level;
