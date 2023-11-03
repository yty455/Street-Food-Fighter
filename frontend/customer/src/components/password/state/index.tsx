// State.js
import React from 'react';
import { List } from '@/components/mypage/profile/Profile.styled';

const State = ({ currentLength }: any) => {
  const totalLength = 6;

  return (
    <List>
      {Array.from({ length: totalLength }, (_, i) => {
        const isLogo = i < currentLength;
        const src = isLogo ? '/images/circlelogo.png' : '/images/signup/circle.png';
        const style = {
          width: isLogo ? '28px' : '12px',
          height: 'auto',
        };

        return (
          <div style={{ width: '30px' }}>
            <img key={i} src={src} style={style} alt={isLogo ? 'Logo' : 'Circle'} />
          </div>
        );
      })}
    </List>
  );
};

export default State;
