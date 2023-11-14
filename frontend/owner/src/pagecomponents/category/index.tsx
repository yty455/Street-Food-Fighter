import Select from '@/components/common/select';
import Topbar from '@/components/common/topbar';
import { Container, SettingBox, TypeBox, Title, CategoriesContainer, CategoryImage, CategoryName, CategoryItem } from './Category.styled';
import { useEffect, useState } from 'react';
import BottomBtn from '@/components/common/bottombtn';
import CategorySelector from '@/components/common/categoryselector';
import GetCategoryAPI from '@/apis/category/GetCategoryAPI';

const CategoryPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryData = await GetCategoryAPI();
      if (categoryData) {
        setSelectedType(categoryData.businessCategory);
        setSelectedCategory(categoryData.category);
      }
    };
    fetchCategories();
  }, []);

  console.log(selectedType, selectedCategory);

  const selectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };
  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
  };

  const handleSave = () => {
    console.log('선택된 업태:', selectedType);
    console.log('선택된 대표 카테고리:', selectedCategory);
    //이후 api 호출 추가
  };

  return (
    <Container>
      <Topbar text="카테고리 설정" />
      <SettingBox>
        <TypeBox>
          <Title>업태</Title>
          <Select a="포장마차" b="푸드트럭" selected={selectedType} onSelect={handleTypeSelection} />
        </TypeBox>
        <TypeBox>
          <Title>대표 카테고리</Title>
          <CategorySelector selectedCategory={selectedCategory} selectCategory={selectCategory} />
        </TypeBox>
      </SettingBox>
      <BottomBtn text="수정 하기" onClick={handleSave} />
    </Container>
  );
};

export default CategoryPage;
