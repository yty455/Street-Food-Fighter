'use client';
import { useRouter } from 'next/navigation';
import { VendorContainer, TopBox, StyledTop, VendorName, Review } from './Vendor.styled';
import TabBar from '@/components/order/tab';
import useOrderStore from '@/stores/orderStore';
import { useEffect, useState } from 'react';
import { useVendorStore } from '@/stores/curvendoridStore';
import { categories } from '@/assets/category';
import { VendorData } from '@/types/vendortype';
import VendorDetailAPI from '@/apis/vendor/VendorDetailAPI';

const VendorPage = ({ id }: { id: string }) => {
  const router = useRouter();
  const index = parseInt(id, 10);

  const [vendor, setVendor] = useState<VendorData | null>(null);

  useEffect(() => {
    const fetchVendorData = async () => {
      const data = await VendorDetailAPI({ storeId: index });
      if (data) {
        setVendor(data);
      }
    };

    fetchVendorData();
  }, [index]);

  const reviewImages = () => {
    if (!vendor) return [];
    const fullStars = Math.floor(vendor.score);
    const halfStar = vendor.score % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;

    const images = [];

    const category = categories.find((c) => c.type === vendor.categoryType);
    for (let i = 0; i < fullStars; i++) {
      images.push(`${category?.id}.png`);
    }

    if (halfStar) {
      images.push(`half${category?.id}.png`);
    }

    for (let i = 0; i < emptyStars; i++) {
      images.push(`review${category?.id}.png`);
    }

    return images;
  };

  const storedVendorId = useVendorStore((state) => state.vendorId);
  const setVendorId = useVendorStore((state) => state.setVendorId);
  const clearOrder = useOrderStore((state) => state.clearOrder);
  useEffect(() => {
    setVendorId(index);
    if (storedVendorId !== null && storedVendorId !== index) {
      clearOrder();
    }
    setVendorId(index);
  }, [index, setVendorId, clearOrder]);

  if (!vendor) {
    return <div>가게가 없어졌어요 🥺</div>;
  }
  return (
    <VendorContainer>
      <TopBox>
        <StyledTop>
          <img
            src="/images/top/back.png"
            style={{ width: '40px' }}
            onClick={() => {
              router.back();
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
          <div>{vendor.score || '0'}.0</div>
        </Review>
      </TopBox>
      <TabBar vendor={vendor} vendorid={index} />
    </VendorContainer>
  );
};

export default VendorPage;
