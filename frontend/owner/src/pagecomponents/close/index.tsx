import DonutChart from '@/components/close/donutchart';
import Topbar from '@/components/common/topbar';
import { Content, Text } from './Close.styled';
import BottomBtn from '@/components/common/bottombtn';
import Receipt from '@/components/common/receipt';
import { useRouter } from 'next/navigation';
import useStatsHook from '@/hooks/apis/stats.hook';

const ClosePage = () => {
  const router = useRouter();
  const accounts = useStatsHook();

  return (
    <div>
      <Topbar text="영업 종료" />
      <Content>
        <Text>수고하셨습니다! </Text>
        <DonutChart />
        <div style={{ width: '90vw' }}>
          <Receipt orderItemList={accounts.menuStatsList} totalPrice={accounts.totalPrice} type="total" />
        </div>
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
