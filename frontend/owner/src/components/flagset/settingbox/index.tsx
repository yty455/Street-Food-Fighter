import useFormatDate from '@/hooks/common/formatDate.hook';
import { Container, Content, DayContent, Title, Text } from './Settingbox.styled';
import useSelectedDateStore from '@/stores/flag/selectedDateStore';

const SettingBox = () => {
  // 선택한 날짜와 포맷
  const { selectedDate } = useSelectedDateStore();
  const formatDate = useFormatDate();
  return (
    <Container>
      <Title>영업날짜</Title>
      <Content>
        <Text>{formatDate(selectedDate)}</Text>
      </Content>
      <Title>영업시간</Title>
      <DayContent>
        <Text>영업 시간을 선택해 주세요</Text>
        <img src="/images/common/right.png" style={{ width: '20px' }} />
      </DayContent>
    </Container>
  );
};

export default SettingBox;
