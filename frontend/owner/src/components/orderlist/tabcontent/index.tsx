import OrderCard from '../ordercard';
import { Container } from './Tabcontent.styled';

const TabContent = ({ activetab, list }: any) => {
  // console.log(list);
  return (
    <Container>
      {list.map((item: any) => (
        <OrderCard key={item.orderId} order={item} />
      ))}
    </Container>
  );
};

export default TabContent;
