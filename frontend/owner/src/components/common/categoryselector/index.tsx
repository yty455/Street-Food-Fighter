import React from 'react';
import { CategoriesContainer, CategoryImage, CategoryName, CategoryItem } from './Categoryselector.styled';

const CategorySelector = ({ categories, selectedCategory, selectCategory }: any) => {
  return (
    <CategoriesContainer>
      {categories.map((category: any) => (
        <CategoryItem key={category.id} onClick={() => selectCategory(category.name)} selected={selectedCategory === category.name}>
          <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
          <CategoryName>{category.name}</CategoryName>
        </CategoryItem>
      ))}
    </CategoriesContainer>
  );
};

export default CategorySelector;
