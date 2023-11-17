import { useState, useEffect } from 'react';
import { TimeSelectorTitle, TimeSelectorStyle, TimeSelectorBody, TimeWrapper, TimeWrapperBody, TimeInput } from './TimeSelector.styled';
import useSingUpPageStore from '@/stores/signUpStore';

const TimeSelector = () => {
  const { openHour, openMinute, closeHour, closeMinute, setRegisterValue } = useSingUpPageStore();

  const timeChange = (e: any, min: number, max: number, key: 'openHour' | 'openMinute' | 'closeHour' | 'closeMinute') => {
    const { value } = e.target;
    if (value < min) {
      setRegisterValue(key, min);
    } else if (value > max) {
      setRegisterValue(key, max);
    } else {
      setRegisterValue(key, value);
    }
  };
  useEffect(() => {
    // console.log(openHour, openMinute, closeHour, closeMinute);
  }, [openHour, openMinute, closeHour, closeMinute]);
  return (
    <TimeSelectorStyle>
      <TimeSelectorTitle>운영시간</TimeSelectorTitle>
      <TimeSelectorBody>
        <TimeWrapper>
          <div>시작시간</div>
          <TimeWrapperBody>
            <TimeInput type="number" value={openHour} onChange={(e: any) => timeChange(e, 0, 23, 'openHour')} />
            :
            <TimeInput type="number" value={openMinute} onChange={(e: any) => timeChange(e, 0, 59, 'openMinute')} />
          </TimeWrapperBody>
        </TimeWrapper>
        <TimeWrapper>
          <div>종료시간</div>
          <TimeWrapperBody>
            <TimeInput type="number" value={closeHour} onChange={(e: any) => timeChange(e, 0, 23, 'closeHour')} />
            :
            <TimeInput type="number" value={closeMinute} onChange={(e: any) => timeChange(e, 0, 59, 'closeMinute')} />
          </TimeWrapperBody>
        </TimeWrapper>
      </TimeSelectorBody>
    </TimeSelectorStyle>
  );
};

export default TimeSelector;
