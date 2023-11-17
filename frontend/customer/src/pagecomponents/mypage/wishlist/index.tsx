// firebase 연동
import { useEffect, useRef, useState } from 'react';
import { CategoryCount, Title, WishListStyle, CategoryName, CategoriesContainer, CategoryImage, CategoryItem, Content } from './WishList.styled';
import useWishListStore from '@/stores/wishListStore';
import { categories } from '@/assets/category';
import Topbar from '@/components/common/topbar';

const WishList = () => {
  const { selectedCategories, toggleCategory, refreshWishList } = useWishListStore();
  const maxSelectedLength = 3;

  useEffect(() => {
    refreshWishList();
  }, []);

  const handleCategoryClick = (categoryname: string) => {
    // max값이 넘으면 안됨
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
      <Topbar text="먹고 싶은걸 골라봐요" />
      <Content>
        <Title>희망 메뉴</Title>
        <CategoryCount>
          {selectedCategories.length}/{maxSelectedLength}
        </CategoryCount>
        <CategoriesContainer>
          {categories.map((category: any) => (
            <CategoryItem key={category.id} onClick={() => handleCategoryClick(category.type)} $selected={selectedCategories.includes(category.type)}>
              <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
              <CategoryName>{category.name}</CategoryName>
            </CategoryItem>
          ))}
          <CategoryItem $islight="light" />
          <CategoryItem $islight="light" />
        </CategoriesContainer>
      </Content>
    </WishListStyle>
  );
};

export default WishList;
