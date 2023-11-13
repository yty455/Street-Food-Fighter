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
import useWishListStore from '@/stores/wishListStore';
import { categories } from '@/assets/category';

const WishList = () => {
  const { selectedCategories, toggleCategory } = useWishListStore();
  const maxSelectedLength = 3;
  const handleCategoryClick = (categoryname: string) => {
    if (selectedCategories.length >= maxSelectedLength) {
      if (selectedCategories.includes(categoryname)) {
        toggleCategory(categoryname);
      }
      return;
    }
    toggleCategory(categoryname);
  };

  return (
    <WishListStyle>
      <Topbar>먹고 싶은걸 골라봐요</Topbar>
      <Title>희망 메뉴</Title>
      <CategoryCount>
        {selectedCategories.length}/{maxSelectedLength}
      </CategoryCount>
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
