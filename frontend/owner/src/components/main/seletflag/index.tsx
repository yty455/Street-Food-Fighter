import Topbar from '@/components/common/topbar';
import { Container, Title, TitleBox, Today } from './Selectflag.styled';
import BottomBtn from '@/components/common/bottombtn';
import FlagCard from '../flagcard';
import { useState } from 'react';
import useFindCurrentLoc from '@/hooks/common/findcurrentloc.hook';
import useSelectFlagHook from '@/hooks/apis/selectflag.hook';

const SelectFlag = ({ flags, onClose, onStartOperation }: any) => {
  const [selectedFlagId, setSelectedFlagId] = useState(null);

  const handleFlagClick = (flagId: any) => {
    setSelectedFlagId(flagId);
  };

  // 현재위치 가져오기
  const [addressName, setAddressName] = useState('');
  const { position } = useFindCurrentLoc(setAddressName);

  const callSelectFlagAPI = useSelectFlagHook();

  const handleStartClick = async () => {
    if (onStartOperation) {
      const data = {
        flagId: selectedFlagId,
        lati: position.lat,
        longi: position.lng,
        activeArea: addressName,
      };
      const response = await callSelectFlagAPI(data);
      // console.log(response);

      // console.log('Selected Flag ID: ', selectedFlagId);
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
