// firebase 연동
import { useEffect, useRef, useState } from 'react';
import { ReviewPageStyle } from './Review.styled';
import Topbar from '@/components/common/topbar';

const ReviewPage = () => {
  return (
    <ReviewPageStyle>
      <Topbar text="My 스푸파" />
    </ReviewPageStyle>
  );
};

export default ReviewPage;
