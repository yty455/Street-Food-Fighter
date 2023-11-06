import Topbar from '@/components/common/topbar';
import Tab from '@/components/flag/tab';
import { useState } from 'react';
import { TabBox } from './Flag.styled';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const FlagPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectTab = (date: any) => {
    setSelectedDate(date);
    // 선택된 요일에 따라 API 호출
  };

  // 오늘 날짜로부터 일주일간의 날짜 계산
  const generateWeekTabs = () => {
    const today = new Date();
    const tabs = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(currentDate.getDate() + i);
      const dayOfWeek = days[currentDate.getDay()];
      tabs.push(
        <Tab
          key={i}
          date={currentDate}
          dayOfWeek={dayOfWeek}
          isActive={currentDate.toDateString() === selectedDate.toDateString()}
          onClick={selectTab}
        />,
      );
    }

    return tabs;
  };

  return (
    <div>
      <Topbar text="깃발 관리" />
      <div>
        <img src="/images/common/flag.png" style={{ width: '40px' }} />
        <div> 남은 깃발 1/3 </div>
      </div>
      <TabBox>{generateWeekTabs()}</TabBox>
      <div>
        <h3>선택된 날짜: {selectedDate.toDateString()}</h3>
      </div>
    </div>
  );
};

export default FlagPage;
