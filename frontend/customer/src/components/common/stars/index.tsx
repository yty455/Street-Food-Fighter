import React from 'react';
import { StarsContainer } from './Stars.styled';

const renderStars = (stars: number) => {
  const starImages = [];
  for (let i = 1; i <= 5; i++) {
    starImages.push(
      <img src={i <= stars ? '/images/orderfunding/review.png' : '/images/orderfunding/review2.png'} alt="star" style={{ width: '15px' }} key={i} />,
    );
  }
  return starImages;
};

const Stars = ({ stars }: any) => {
  return <StarsContainer>{renderStars(stars)}</StarsContainer>;
};
export default Stars;
