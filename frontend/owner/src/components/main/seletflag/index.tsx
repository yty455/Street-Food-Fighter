import Topbar from '@/components/common/topbar';
import { Container, Title, TitleBox, Today } from './Selectflag.styled';
import BottomBtn from '@/components/common/bottombtn';
import FlagCard from '../flagcard';
import { useState } from 'react';
import useFindCurrentLoc from '@/hooks/common/findcurrentloc.hook';
import kakaomapApi from '@/apis/kakao/kakaoAPI';
import SelectFlagAPI from '@/apis/flag/SelectFlagAPI';

const SelectFlag = ({ flags, onClose, onStartOperation, onBack }: any) => {
  const [selectedFlagId, setSelectedFlagId] = useState(0);

  const handleFlagClick = (flagId: any) => {
    setSelectedFlagId(flagId);
  };

  // 현재위치 가져오기
  const [addressName, setAddressName] = useState('');
  const { position } = useFindCurrentLoc(setAddressName);

  const handleStartClick = async () => {
    const addressDetails = await kakaomapApi({ latitude: position.lat, longitude: position.lng });

    if (onStartOperation) {
      const addressParts = addressDetails.split(' ');
      const data = {
        flagId: selectedFlagId,
        lati: position.lat,
        longi: position.lng,
        activeArea: addressName,
        region1: addressParts[0] || '부산광역시',
        region2: addressParts[1] || '강서구',
        region3: addressParts[2] || '송정동',
        region4: addressParts[3] || '',
      };
      const response = await SelectFlagAPI(data);
      // console.log('Selected Flag ID: ', selectedFlagId);
      onStartOperation();
    }
  };

  const today = new Date();
  const formattedDate = `${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getDate().toString().padStart(2, '0')}`;

  return (
    <Container>
      <Topbar text="영업 시작" type="start" closeModal={onClose} onBack={onBack} />
      <TitleBox>
        <Title> 깃발 선택</Title>
        <Today>{formattedDate}</Today>
      </TitleBox>
      {flags.map((flagItem: any, index: any) => (
        <FlagCard
          key={index}
          flag={flagItem}
          selected={selectedFlagId === flagItem.flagId}
          onClick={() => handleFlagClick(flagItem.flagId)}
          flagidx={index}
        />
      ))}
      <BottomBtn text="영업 시작" onClick={handleStartClick} />
    </Container>
  );
};

export default SelectFlag;
