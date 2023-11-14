import Topbar from '@/components/common/topbar';
import { useEffect, useState } from 'react';
import { PageTitle, TabBox, FlagList, NoFlag } from './Flag.styled';
import FlagCard from '@/components/flag/flagcard';
import { Flag0, Flag1, Flag2, Flag3 } from '@/temp/flag';
import BottomBtn from '@/components/common/bottombtn';
import { useRouter } from 'next/navigation';
import useSelectedDateStore from '@/stores/flag/selectedDateStore';
import FlagDetail from '@/components/flag/flagdetail';
import WeekTabs from '@/components/flag/weektabs';
import useModal from '@/hooks/common/modal.hook';
import DateFlagAPI from '@/apis/flag/DateFlagAPI';

const FlagPage = () => {
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const [curflag, setCurFlag] = useState([]);

  useEffect(() => {
    const loadInitialData = async () => {
      const formattedDate = new Date(selectedDate).toISOString().split('T')[0];
      const res = await DateFlagAPI(formattedDate);
      const flags = res.response;
      if (flags) {
        setCurFlag(flags);
      }
    };

    loadInitialData();
  }, [selectedDate]);

  const selectTab = async (date: any) => {
    setSelectedDate(date);
    const formattedDate = new Date(date).toISOString().split('T')[0]; // 날짜 포맷 변경
    const res = await DateFlagAPI(formattedDate);
    const flags = res.response;
    if (flags) {
      setCurFlag(flags);
    }
  };

  const router = useRouter();

  // flagdetail 모달
  const { isModalOpen, selectedItem, openModal, closeModal } = useModal();
  const handleFlagClick = (flag: any) => {
    openModal(flag);
  };

  return (
    <div>
      <Topbar text="깃발 관리" />
      <PageTitle>
        <img src="/images/common/flag.png" style={{ width: '30px' }} />
        <div> {curflag.length} / 3 </div>
      </PageTitle>
      <TabBox>
        <WeekTabs selectedDate={selectedDate} selectTab={selectTab} />
      </TabBox>
      {curflag.length == 0 ? (
        <NoFlag>
          <div>깃발 꽂기 버튼이 </div>
          <div>여러분을 기다리고 있어요! 🚀</div>
        </NoFlag>
      ) : (
        <FlagList>
          {/* <h3>선택된 날짜: {selectedDate.getDate()}</h3> */}
          {curflag.map((flagItem, index) => (
            <FlagCard key={index} flag={flagItem} onClick={() => handleFlagClick(index)} flagindex={index} />
          ))}
        </FlagList>
      )}
      <BottomBtn
        text="깃발 추가"
        disabled={curflag.length === 3}
        onClick={() => {
          router.push('/flagset');
        }}
      ></BottomBtn>
      {isModalOpen && <FlagDetail flag={selectedItem} closeModal={closeModal} />}
    </div>
  );
};

export default FlagPage;
