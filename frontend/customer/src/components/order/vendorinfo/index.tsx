import { vendordata } from '@/temp/vendordata';
import { VendorContainer, BoxContainer, Title, Content, ContentTd } from './Vendorinfo.styled';

const VendorInfo = ({ vendorid }: any) => {
  const vendor = vendordata;
  if (!vendor) {
    return <div>가게가 없어졌어요 🥺</div>;
  }
  // console.log(vendor);
  return (
    <VendorContainer>
      <BoxContainer>
        <Title>가게소개</Title>
        <Content>{vendor.information}</Content>
      </BoxContainer>

      <BoxContainer>
        <Title>영업정보</Title>

        <table>
          <tbody>
            <tr>
              <ContentTd>상호명</ContentTd>
              <ContentTd>{vendor.name}</ContentTd>
            </tr>
            <tr>
              <ContentTd>운영시간</ContentTd>
              <ContentTd>
                {vendor.openTime} ~ {vendor.closeTime}
              </ContentTd>
            </tr>
            <tr>
              <ContentTd>전화번호</ContentTd>
              <ContentTd>{vendor.phone}</ContentTd>
            </tr>
            <tr>
              <ContentTd>위치</ContentTd>
              <ContentTd>{vendor.activeArea}</ContentTd>
            </tr>
          </tbody>
        </table>
      </BoxContainer>
      <BoxContainer>
        <Title>안내</Title>
        <Content> {vendor.introduction}</Content>
      </BoxContainer>
    </VendorContainer>
  );
};

export default VendorInfo;
