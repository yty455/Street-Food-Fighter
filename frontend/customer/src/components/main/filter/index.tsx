import { categories } from '@/assets/category';
import { ModalOverlay, FilterBox, FilterTitle, CloseButton, CategoryItem, CategoryImage, CategoryName, CategoriesContainer } from './Filter.styled';

const FilterComponent = ({ onClose }: any) => {
  return (
    <ModalOverlay>
      <FilterBox>
        <div style={{ height: '20px' }}></div>
        <FilterTitle>카테고리</FilterTitle>
        <CategoriesContainer>
          <CategoryItem>
            <CategoryImage src="/images/orderfunding/all.png" />
            <CategoryName>메뉴 전체</CategoryName>
          </CategoryItem>
          {categories.map((category: any) => (
            <CategoryItem key={category.id}>
              <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryItem>
          ))}
        </CategoriesContainer>
        <CloseButton onClick={onClose}>닫기</CloseButton>
      </FilterBox>
    </ModalOverlay>
  );
};

export default FilterComponent;
