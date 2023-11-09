import OrderCard from '../ordercard';
import { StyleDate } from '../tabbar/Tabbar.styled';
import { Container } from './Tabcontent.styled';

const TabContent = ({ activetab, list }: any) => {
  const formatDate = (dateString: string) => {
    const options = { month: '2-digit', day: '2-digit' } as const;
    return new Date(dateString).toLocaleDateString('ko-KR', options).replace('. ', '월 ').replace('.', '일');
  };

  //all은 이후 수정 필요
  return (
    <Container>
      {/* {activetab === 'all' && <StyleDate>{formatDate(list[0].orderDate)}</StyleDate>} */}
      {list.map((item: any) => (
        <OrderCard key={item.orderId} order={item} />
      ))}
    </Container>
  );
};

export default TabContent;
