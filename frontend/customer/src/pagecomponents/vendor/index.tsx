'use client';
import { vendordata } from '@/temp/vendordata';
import { useRouter } from 'next/navigation';
import { VendorContainer, TopBox, StyledTop, VendorName, Review } from './Vendor.styled';
import TabBar from '@/components/order/tab';
import useOrderStore from '@/stores/orderStore';

const VendorPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const index = parseInt(id, 10) - 1;
  const vendor = vendordata[index];

  const reviewImages = () => {
    const fullStars = Math.floor(vendor.review);
    const halfStar = vendor.review % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const images = [];

    for (let i = 0; i < fullStars; i++) {
      images.push(`${vendor.category}.png`);
    }

    if (halfStar) {
      images.push(`half${vendor.category}.png`);
    }

    for (let i = 0; i < emptyStars; i++) {
      images.push(`review${vendor.category}.png`);
    }

    return images;
  };

  const { order, clearOrder } = useOrderStore((state) => ({
    order: state.order,
    clearOrder: state.clearOrder,
  }));

  return (
    <VendorContainer>
      <TopBox>
        <StyledTop>
          <img
            src="/images/top/back.png"
            style={{ width: '40px' }}
            onClick={() => {
              router.back();
              clearOrder();
            }}
          />
          <VendorName>{vendor.name}</VendorName>
          <a href={`tel:${vendor.phone}`} style={{ textDecoration: 'none' }}>
            <img src="/images/vendor/phone.png" alt="Phone" style={{ width: '30px' }} />
          </a>
        </StyledTop>
        <Review>
          <div>
            {reviewImages().map((image, index) => (
              <img key={index} src={`/images/category/${image}`} alt="Review" style={{ width: '30px' }} />
            ))}
          </div>
          <div>{vendor.review}</div>
        </Review>
      </TopBox>
      <TabBar vendorid={index} />
    </VendorContainer>
  );
};

export default VendorPage;
