import { WishListContainer, TitleBox } from './Wishlist.styled';
import { useRouter } from 'next/navigation';

const WishList = () => {
  const router = useRouter();

  const moveWishListPage = () => {
    router.push('/mypage/wishlist');
  };
  return (
    <WishListContainer>
      <TitleBox>
        <img src="/images/mypage/want.png" style={{ width: '40px' }} />
        <div>먹고 싶은 걸 골라봐요</div>
      </TitleBox>
      <img onClick={moveWishListPage} src="/images/common/plus.png" style={{ width: '30px' }} />
    </WishListContainer>
  );
};

export default WishList;
