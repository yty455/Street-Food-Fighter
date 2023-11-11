import { categories } from '@/assets/category';
import Topbar from '@/components/common/topbar';
import { wishlist } from '@/temp/wishlist';
import { TextNo, SubTextNo, StyledLocation, ContentNo } from './WishList.styled';
import { useState } from 'react';
import useModal from '@/hooks/common/modal.hook';
import SearchPlace from '@/components/common/searchplace';
import kakaoAddressAPI from '@/apis/kakao/kakaoAddressAPI';
import kakaomapApi from '@/apis/kakao/kakaoAPI';

const WishListPage = () => {
  const wishes = wishlist;

  const [address, setAddress] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSelectPlace = async (x: any, y: any) => {
    const addressName = await kakaomapApi({ latitude: y, longitude: x });
    if (addressName) {
      setAddress(addressName);
    }
    closeModal();
  };

  const findCountByType = (type: any) => {
    const item = wishes.find((item) => item.foodType === type);
    return item ? item.count : 0;
  };

  // 최대 count 찾기
  const maxCount = Math.max(...wishlist.map((item) => item.count), 0);

  return (
    <div>
      <Topbar text="지역별 통계" />
      <StyledLocation onClick={() => openModal()}>{address.length > 0 ? `지역명 : ${address}` : '지역 검색 하러가기'}</StyledLocation>
      {address.length == 0 ? (
        <ContentNo>
          <div>
            <TextNo>원하는 장소를 검색하여 </TextNo>
            <TextNo>해당 지역의 통계 정보를 확인하세요.</TextNo>
          </div>
          <div>
            <SubTextNo>선택한 장소는 시군구 기준으로 표시됩니다.</SubTextNo>
          </div>
        </ContentNo>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0', fontWeight: 'bold' }}>
            <span>음식이름</span>
            <span style={{ marginRight: '210px' }}>희망손님수</span>
          </div>
          {categories.map((category) => {
            const count = findCountByType(category.type);
            const barWidth = maxCount ? (count / maxCount) * 100 : 0; // 최대 길이에 대한 비율로 너비 계산

            return (
              <div key={category.id} style={{ margin: '10px 0' }}>
                <span style={{ marginRight: '10px' }}>{category.name}:</span>
                <div style={{ display: 'inline-block', width: '200px', backgroundColor: '#ddd' }}>
                  <div style={{ height: '20px', width: `${barWidth}%`, backgroundColor: 'blue' }}></div>
                </div>
                <span style={{ marginLeft: '10px' }}>{count}개</span>
              </div>
            );
          })}
        </div>
      )}
      {isModalOpen && <SearchPlace onClose={closeModal} onSelectPlace={handleSelectPlace} />}
    </div>
  );
};

export default WishListPage;
