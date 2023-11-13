import { UserGrades } from '@/types/usergrade.type';

export const gradeMapping: { [key in UserGrades]: string } = {
  LIGHT: '/images/grade/light.png',
  MIDDLE: '/images/grade/middle.png',
  HEAVY: '/images/grade/heavy.png',
  CHAMPION: '/images/grade/champion.png',
};
