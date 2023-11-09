import OrderCard from '../ordercard';

const TabContent = ({ activetab, list }: any) => {
  console.log(list);
  return (
    <div>
      {list.map((item: any) => (
        <OrderCard key={item.orderId} order={item} />
      ))}
    </div>
  );
};

export default TabContent;
