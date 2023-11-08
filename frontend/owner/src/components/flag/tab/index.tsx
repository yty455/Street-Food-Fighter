import { TabWrapper, Date, Day } from './Tab.styled';

const Tab = ({ date, dayOfWeek, isActive, onClick }: any) => {
  return (
    <TabWrapper isactive={isActive.toString()} onClick={() => onClick(date)}>
      <Date>{date.getDate()}</Date>
      <Day>{dayOfWeek}</Day>
    </TabWrapper>
  );
};

export default Tab;
