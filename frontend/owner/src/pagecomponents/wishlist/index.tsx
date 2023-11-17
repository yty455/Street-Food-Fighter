import Topbar from '@/components/common/topbar';
import { TextNo, SubTextNo, StyledLocation, ContentNo, ChartContainer, ChartTitleFood, ChartTitle, ChartTitlePeople } from './WishList.styled';
import { useState } from 'react';
import useModal from '@/hooks/common/modal.hook';
import SearchPlace from '@/components/common/searchplace';
import kakaomapApi from '@/apis/kakao/kakaoAPI';
import Chart from '@/components/wishlist/chart';

const WishListPage = () => {
  const [address, setAddress] = useState('');
  const { isModalOpen, openModal, closeModal } = useModal();

  const handleSelectPlace = async (x: any, y: any) => {
    const addressName = await kakaomapApi({ latitude: y, longitude: x });
    if (addressName) {
      setAddress(addressName);
    }
    closeModal();
  };

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
        <ChartContainer>
          <ChartTitle>
            <ChartTitleFood>음식 이름</ChartTitleFood>
            <ChartTitlePeople>희망손님수</ChartTitlePeople>
          </ChartTitle>
          <Chart address={address} />
        </ChartContainer>
      )}
      {isModalOpen && <SearchPlace onClose={closeModal} onSelectPlace={handleSelectPlace} />}
    </div>
  );
};

export default WishListPage;
