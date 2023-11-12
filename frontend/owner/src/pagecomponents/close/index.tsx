import DonutChart from '@/components/close/donutchart';
import Button from '@/components/common/button';
import Topbar from '@/components/common/topbar';
import { Content } from './Close.styled';

const ClosePage = () => {
  return (
    <div>
      <Topbar text="영업 종료" />
      <Content>
        <DonutChart />
        <div style={{ width: '80vw', height: '40px' }}>
          <Button text="상세 보기" />
        </div>
      </Content>
    </div>
  );
};

export default ClosePage;
