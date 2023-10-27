import { categories } from '@/assets/category';
import { ModalOverlay, FilterBox, FilterTitle, CloseButton, CategoryItem, CategoryImage, CategoryName, CategoriesContainer } from './Filter.styled';
import useMainFilterStore from '@/stores/mainFilterStore';

const FilterComponent = ({ onClose }: any) => {
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
        <FilterTitle>카테고리</FilterTitle>
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
      </FilterBox>
      <CloseButton onClick={onClose}>닫기</CloseButton>
    </ModalOverlay>
  );
};

export default FilterComponent;
