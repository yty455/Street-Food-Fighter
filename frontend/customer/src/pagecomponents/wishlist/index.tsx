// firebase 연동
import { useRef, useState } from 'react';
import {
  CategoryLineContainer,
  CategoryCount,
  Title,
  WishListStyle,
  Topbar,
  CategoryName,
  CategoriesContainer,
  CategoryImage,
  CategoryItem,
} from './WishList.styled';
import useMainFilterStore from '@/stores/mainFilterStore';
import { categories } from '@/assets/category';

const WishList = () => {
  const { selectedCategories, toggleCategory, clearCategories } = useMainFilterStore();

  const handleCategoryClick = (categoryname: any) => {
    if (categoryname === '메뉴 전체') {
      clearCategories();
    } else {
      toggleCategory(categoryname);
    }
  };

  return (
    <WishListStyle>
      <Topbar>먹고 싶은걸 골라봐요</Topbar>
      <Title>희망 메뉴</Title>
      <CategoryCount>2/3</CategoryCount>
      <CategoriesContainer>
        {categories.map((category: any) => (
          <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.name)} selected={selectedCategories.includes(category.name)}>
            <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
            <CategoryName>{category.name}</CategoryName>
          </CategoryItem>
        ))}
        <CategoryItem isLight="light" />
        <CategoryItem isLight="light" />
      </CategoriesContainer>
    </WishListStyle>
  );
};

export default WishList;
