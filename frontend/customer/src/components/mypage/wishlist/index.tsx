import { WishListContainer, TitleBox } from './Wishlist.styled';

const WishList = () => {
  return (
    <WishListContainer>
      <TitleBox>
        <img src="/images/mypage/want.png" style={{ width: '40px' }} />
        <div>먹고 싶은 걸 골라봐요</div>
      </TitleBox>
      <img src="/images/common/plus.png" style={{ width: '30px' }} />
    </WishListContainer>
  );
};

export default WishList;
