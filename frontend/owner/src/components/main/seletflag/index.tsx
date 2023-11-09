import Topbar from '@/components/common/topbar';
import { Container } from './Selectflag.styled';
import BottomBtn from '@/components/common/bottombtn';
import FlagCard from '../flagcard';
import { useState } from 'react';

const SelectFlag = ({ flags, onClose, onStartOperation }: any) => {
  const [selectedFlagId, setSelectedFlagId] = useState(null);

  const handleFlagClick = (flagId: any) => {
    setSelectedFlagId(flagId);
  };

  const handleStartClick = () => {
    if (onStartOperation) {
      console.log('Selected Flag ID: ', selectedFlagId);
      onStartOperation();
    }
  };
  return (
    <Container>
      <Topbar text="영업 시작" type="close" closeModal={onClose} />
      <div>
        <div> 깃발 선택</div>
        <div>오늘 날짜</div>
      </div>
      {flags.map((flagItem: any, index: any) => (
        <FlagCard key={index} flag={flagItem} selected={selectedFlagId === flagItem.flagId} onClick={() => handleFlagClick(flagItem.flagId)} />
      ))}
      <BottomBtn text="영업 시작" onClick={handleStartClick} />
    </Container>
  );
};

export default SelectFlag;
