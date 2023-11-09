import Topbar from '@/components/common/topbar';
import { Container, Title, TitleBox, Today } from './Selectflag.styled';
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

  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;

  return (
    <Container>
      <Topbar text="영업 시작" type="close" closeModal={onClose} />
      <TitleBox>
        <Title> 깃발 선택</Title>
        <Today>{formattedDate}</Today>
      </TitleBox>
      {flags.map((flagItem: any, index: any) => (
        <FlagCard key={index} flag={flagItem} selected={selectedFlagId === flagItem.flagId} onClick={() => handleFlagClick(flagItem.flagId)} />
      ))}
      <BottomBtn text="영업 시작" onClick={handleStartClick} />
    </Container>
  );
};

export default SelectFlag;
