import { categories } from '@/assets/category';
import { ModalOverlay, FilterBox, FilterTitle, CloseButton, CategoryItem, CategoryImage, CategoryName, CategoriesContainer } from './Filter.styled';
import { useState } from 'react';

const FilterComponent = ({ onClose }: any) => {
  const [selectedCategories, setSelectedCategories] = useState<any>([]);

  const handleCategoryClick = (categoryname: any) => {
    console.log(categoryname);
    if (categoryname === '메뉴 전체') {
      setSelectedCategories(['메뉴 전체']);
    } else {
      setSelectedCategories((prev: any) => {
        if (prev.includes(categoryname)) {
          return prev.filter((item: any) => item !== categoryname);
        } else {
          return [...prev.filter((item: any) => item !== '메뉴 전체'), categoryname];
        }
      });
    }
  };
  return (
    <ModalOverlay>
      <FilterBox>
        <div style={{ height: '20px' }}></div>
        <FilterTitle>카테고리</FilterTitle>
        <CategoriesContainer>
          <CategoryItem onClick={() => handleCategoryClick('메뉴 전체')} selected={selectedCategories.includes('메뉴 전체')}>
            <CategoryImage src="/images/orderfunding/all.png" />
            <CategoryName>메뉴 전체</CategoryName>
          </CategoryItem>
          {categories.map((category: any) => (
            <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.name)} selected={selectedCategories.includes(category.name)}>
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
