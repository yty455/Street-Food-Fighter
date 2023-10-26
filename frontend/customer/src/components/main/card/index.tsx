import { categories } from '@/assets/category';
import { CardBox, ContentBox, ContentBox2, Text } from './Card.styled';
import Badge from '@/components/common/badge';

const Card = () => {
  const catImage = categories.find((cat) => cat.id === 15)?.image;
  return (
    <CardBox>
      <img src={`/images/category/${catImage}`} style={{ width: '40px', height: '40px' }} />
      <ContentBox>
        <div>녹산 호떡 트럭</div>
        <div>
          <Badge name="호떡" />
        </div>
        <ContentBox2 style={{ gap: '10px' }}>
          <ContentBox2>
            <img src="/images/orderfunding/dist.png" style={{ width: '16px' }} />
            <Text> 112m</Text>
          </ContentBox2>
          <ContentBox2>
            <img src="/images/orderfunding/star.png" style={{ width: '16px' }} />
            <Text> 4.4/5.0</Text>
          </ContentBox2>
        </ContentBox2>
      </ContentBox>
    </CardBox>
  );
};

export default Card;
