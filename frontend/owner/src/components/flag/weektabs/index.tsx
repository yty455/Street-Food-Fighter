import Tab from '../tab';

const WeekTabs = ({ selectedDate, selectTab }: any) => {
  const days = ['일', '월', '화', '수', '목', '금', '토'];

  const tabs = [];
  const today = new Date();

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
        onClick={() => selectTab(currentDate)}
      />,
    );
  }

  return <>{tabs}</>;
};

export default WeekTabs;
