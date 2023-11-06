import Topbar from '@/components/common/topbar';

const CategoryPage = () => {
  return (
    <div>
      <Topbar text="카테고리 설정" />
      <div>
        <div>업태</div>
        <div>포장마차, 푸드트럭 선택</div>
      </div>
      <div>
        <div>대표 카테고리</div>
        <div>카테고리 리스트</div>
      </div>
    </div>
  );
};

export default CategoryPage;
