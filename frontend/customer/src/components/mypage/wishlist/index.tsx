import { WishBody, WishListContainer, TitleBox, CategoryImage, CategoryItem, CategoryName } from './Wishlist.styled';
import { useRouter } from 'next/navigation';
import useWishListStore from '@/stores/wishListStore';
import { useEffect } from 'react';
import { categories } from '@/assets/category';

const WishList = () => {
  const router = useRouter();
  const { selectedCategories, refreshWishList } = useWishListStore();

  useEffect(() => {
    refreshWishList();
  }, []);
  const moveWishListPage = () => {
    router.push('/mypage/wishlist');
  };
  return (
    <WishListContainer>
      <TitleBox>
        <img src="/images/mypage/want.png" style={{ width: '40px' }} />
        <div>먹고 싶은 걸 골라봐요</div>
      </TitleBox>
      <WishBody>
        {categories.map((category: any) => {
          if (selectedCategories.includes(category.type)) {
            console.log(category.type);
            return (
              <CategoryItem key={category.id} $selected={selectedCategories.includes(category.type)}>
                <CategoryImage src={`/images/category/${category.image}`} alt={category.name} />
                <CategoryName>{category.name}</CategoryName>
              </CategoryItem>
            );
          }
        })}
        <img onClick={moveWishListPage} src="/images/common/plus.png" style={{ width: '45px', height: '45px' }} />
      </WishBody>
    </WishListContainer>
  );
};

export default WishList;
