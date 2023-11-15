import Select from '@/components/common/select';
import Topbar from '@/components/common/topbar';
import { Container, SettingBox, TypeBox, Title, CategoriesContainer, CategoryImage, CategoryName, CategoryItem } from './Category.styled';
import { useEffect, useState } from 'react';
import BottomBtn from '@/components/common/bottombtn';
import CategorySelector from '@/components/common/categoryselector';
import GetCategoryAPI from '@/apis/category/GetCategoryAPI';
import EditCategoryAPI from '@/apis/category/EditCategoryAPI';
import { useRouter } from 'next/navigation';

const CategoryPage = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const router = useRouter();
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

  const selectCategory = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };
  const handleTypeSelection = (type: string) => {
    setSelectedType(type);
  };

  const handleSave = async () => {
    const data = {
      businessCategory: selectedType,
      category: selectedCategory,
    };

    const response = await EditCategoryAPI({ data });
    if (response) {
      router.push('/');
    } else {
      // console.error('카테고리 수정 실패');
    }
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
