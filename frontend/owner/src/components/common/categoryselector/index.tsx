import { CategoriesContainer, CategoryImage, CategoryName, CategoryItem } from './Categoryselector.styled';
import { categories } from '@/assets/category';

const CategorySelector = ({ selectedCategory, selectCategory }: any) => {
  return (
    <CategoriesContainer>
      {categories.map((category: any) => (
        <CategoryItem key={category.id} onClick={() => selectCategory(category.type)} selected={selectedCategory === category.type}>
          <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
          <CategoryName>{category.name}</CategoryName>
        </CategoryItem>
      ))}
    </CategoriesContainer>
  );
};

export default CategorySelector;
