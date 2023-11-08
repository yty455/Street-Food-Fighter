import Topbar from '@/components/common/topbar';
import Tab from '@/components/flag/tab';
import { useState } from 'react';
import { PageTitle, TabBox, FlagList, NoFlag } from './Flag.styled';
import FlagCard from '@/components/flag/flagcard';
import { Flag0, Flag1, Flag2, Flag3 } from '@/temp/flag';
import BottomBtn from '@/components/common/bottombtn';
import { useRouter } from 'next/navigation';
import useSelectedDateStore from '@/stores/flag/selectedDateStore';
import FlagDetail from '@/components/flag/flagdetail';

const days = ['일', '월', '화', '수', '목', '금', '토'];

const FlagPage = () => {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const curflag = Flag2;

  const selectTab = (date: any) => {
    setSelectedDate(date);
    // 선택된 요일에 따라 API 호출
  };

  const router = useRouter();

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

  // flagdetail 모달
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const handleFlagClick = (flag: any) => {
    setIsDetailOpen(true);
    setSelectedFlag(flag);
  };

  const closeFlagModal = () => {
    setIsDetailOpen(false);
  };

  return (
    <div>
      <Topbar text="깃발 관리" />
      <PageTitle>
        <img src="/images/common/flag.png" style={{ width: '30px' }} />
        <div> {curflag.length} / 3 </div>
      </PageTitle>
      <TabBox>{generateWeekTabs()}</TabBox>
      {curflag.length == 0 && (
        <NoFlag>
          <div>깃발 꽂기 버튼이 </div>
          <div>여러분을 기다리고 있어요! 🚀</div>
        </NoFlag>
      )}
      <FlagList>
        {/* <h3>선택된 날짜: {selectedDate.getDate()}</h3> */}
        {curflag.map((flagItem, index) => (
          <FlagCard key={index} flag={flagItem} onClick={() => handleFlagClick(index)} />
        ))}
      </FlagList>
      <BottomBtn
        text="깃발 추가"
        disabled={curflag.length === 3}
        onClick={() => {
          router.push('/flagset');
        }}
      ></BottomBtn>
      {isDetailOpen && <FlagDetail flag={selectedFlag} closeModal={closeFlagModal} />}
    </div>
  );
};

export default FlagPage;
