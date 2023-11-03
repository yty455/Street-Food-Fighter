// State.js
import React from 'react';
import { List } from '@/components/mypage/profile/Profile.styled';

const State = ({ currentLength }: any) => {
  const totalLength = 6;
  console.log(currentLength);
  return (
    <List>
      {Array.from({ length: totalLength }, (_, i) => {
        const isLogo = i < currentLength;
        const src = isLogo ? '/images/circlelogo.png' : '/images/signup/circle.png';
        const style = {
          width: isLogo ? '35px' : '12px',
          height: 'auto',
        };

        return (
          <div key={i} style={{ width: '30px' }}>
            <img src={src} style={style} alt={isLogo ? 'Logo' : 'Circle'} />
          </div>
        );
      })}
    </List>
  );
};

export default State;
