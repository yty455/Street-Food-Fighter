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
  DateItem,
  DateSelector,
} from './Filter.styled';
import useMainFilterStore from '@/stores/mainFilterStore';
import { useState } from 'react';
import useDateOptions from '@/hooks/sevendaysHook';

const FilterComponent = ({ onClose, isfundingpage }: any) => {
  // 날짜 선택
  const { dateOptions, formatDate } = useDateOptions();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDateSelector, setShowDateSelector] = useState(false);

  const handleFilterDateClick = () => {
    setShowDateSelector(!showDateSelector);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setShowDateSelector(false);
  };

  // 카테고리 선택
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
            <FilterDate onClick={handleFilterDateClick}>{selectedDate ? formatDate(selectedDate, true) : '날짜를 선택해주세요'}</FilterDate>
            {showDateSelector && (
              <DateSelector>
                {dateOptions.map((date, index) => (
                  <DateItem key={index} onClick={() => handleDateClick(date)} selected={selectedDate === date}>
                    {formatDate(date, false)}
                  </DateItem>
                ))}
              </DateSelector>
            )}
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
