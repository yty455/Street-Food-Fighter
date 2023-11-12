import { useState, useEffect } from 'react';
import DonutChart from '@/components/close/donutchart';
import Topbar from '@/components/common/topbar';
import { Content, Text } from './Close.styled';
import BottomBtn from '@/components/common/bottombtn';
import Receipt from '@/components/common/receipt';
import { useRouter } from 'next/navigation';
import StatsAPI from '@/apis/close/StatsAPI';
import { AccountStats } from '@/types/stats.type';

const ClosePage = () => {
  const router = useRouter();
  const [accounts, setAccounts] = useState<AccountStats>({
    menuStatsList: [],
    totalPrice: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const data = await StatsAPI();
      setAccounts(data);
    };
    fetchStats();
  }, []);

  return (
    <div>
      <Topbar text="영업 종료" />
      <Content>
        <Text>수고하셨습니다! </Text>
        <DonutChart />
        {/* <div style={{ width: '90vw' }}>
          <Receipt orderItemList={accounts.menuStatsList} totalPrice={accounts.totalPrice} type="total" />
        </div> */}
      </Content>
      <BottomBtn
        text="홈으로"
        onClick={() => {
          router.push('/');
        }}
      />
    </div>
  );
};

export default ClosePage;
