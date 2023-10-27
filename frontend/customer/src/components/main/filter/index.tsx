import { categories } from '@/assets/category';
import {
  ModalOverlay,
  FilterBox,
  FilterTitle,
  CloseButton,
  CategoryItem,
  CategoryImage,
  CategoryName,
  CategoriesContainer,
  FilterDate,
  Datebox,
} from './Filter.styled';
import useMainFilterStore from '@/stores/mainFilterStore';

const FilterComponent = ({ onClose, isfundingpage }: any) => {
  const { selectedCategories, toggleCategory, clearCategories } = useMainFilterStore();

  const handleCategoryClick = (categoryname: any) => {
    if (categoryname === '메뉴 전체') {
      clearCategories();
    } else {
      toggleCategory(categoryname);
    }
  };
  return (
    <ModalOverlay>
      <FilterBox>
        {isfundingpage && (
          <Datebox>
            <FilterTitle>날짜 선택</FilterTitle>
            <FilterDate>10월 27일 금요일</FilterDate>
          </Datebox>
        )}

        <Datebox>
          <FilterTitle>카테고리 선택</FilterTitle>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <CategoriesContainer>
              <CategoryItem onClick={() => handleCategoryClick('메뉴 전체')} selected={selectedCategories.includes('메뉴 전체')}>
                <CategoryImage src="/images/orderfunding/all.png" />
                <CategoryName>메뉴 전체</CategoryName>
              </CategoryItem>

              {categories.map((category: any) => (
                <CategoryItem
                  key={category.id}
                  onClick={() => handleCategoryClick(category.name)}
                  selected={selectedCategories.includes(category.name)}
                >
                  <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
                  <CategoryName>{category.name}</CategoryName>
                </CategoryItem>
              ))}
            </CategoriesContainer>
          </div>
        </Datebox>
      </FilterBox>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalOverlay>
  );
};

export default FilterComponent;
