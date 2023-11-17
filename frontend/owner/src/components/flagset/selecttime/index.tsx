import TimePicker from '@/components/common/timepicker';
import { useState } from 'react';
import { ModalContent, ModalOverlay, Text, TimeList } from './Selecttime.styled';
import Button from '@/components/common/button';

interface SelectTimeProps {
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onClose: () => void;
}

const SelectTime = ({ onStartTimeChange, onEndTimeChange, onClose }: SelectTimeProps) => {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleStartTimeChange = (value: string) => {
    setStartTime(value);
    onStartTimeChange(value);
  };

  const handleEndTimeChange = (value: string) => {
    setEndTime(value);
    onEndTimeChange(value);
  };

  return (
    <ModalOverlay>
      <ModalContent onClick={(e: any) => e.stopPropagation()}>
        <Text> 영업 시간 선택 </Text>
        <TimeList>
          <TimePicker label="시작 시간" value={startTime} onChange={handleStartTimeChange} />
          <TimePicker label="종료 시간" value={endTime} onChange={handleEndTimeChange} />
        </TimeList>
        <div style={{ height: '30px' }}>
          <Button onClick={onClose} text="닫기"></Button>
        </div>
      </ModalContent>
    </ModalOverlay>
  );
};

export default SelectTime;
