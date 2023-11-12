import DonutChart from '@/components/close/donutchart';
import Button from '@/components/common/button';
import Topbar from '@/components/common/topbar';
import { Content } from './Close.styled';
import BottomBtn from '@/components/common/bottombtn';
import { accounts } from '@/temp/accounts';
import Receipt from '@/components/common/receipt';
import { useRouter } from 'next/navigation';

const ClosePage = () => {
  const router = useRouter();
  return (
    <div>
      <Topbar text="영업 종료" />
      <Content>
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
