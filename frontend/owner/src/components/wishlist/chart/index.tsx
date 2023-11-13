import { categories } from '@/assets/category';
import { wishlist } from '@/temp/wishlist';
import React, { useEffect, useState } from 'react';
import { Bar, CategoryBox, Count, CountBox, FoodName, NameBox } from './Chart.styled';
import WishlistAPI from '@/apis/wishlist/WishlistAPI';
import { WishlistItem } from '@/types/wishlist.type';

const Chart = (address: any) => {
  const [wishes, setWishes] = useState<WishlistItem[]>([]);
  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await WishlistAPI({ addressname: address.address });
      if (response) {
        setWishes(response);
      }
    };
    fetchWishlist();
  }, [address]);

  const findCountByType = (type: any) => {
    // console.log('wish', wishes);
    const item = wishes.find((item) => item.foodType === type);
    return item ? item.count : 0;
  };

  // 최대 count 찾기
  const maxCount = Math.max(...wishlist.map((item) => item.count), 0);

  return (
    <div>
      {categories.map((category) => {
        const count = findCountByType(category.type);
        const flexGrow = maxCount ? count / maxCount : 0;

        return (
          <CategoryBox key={category.id}>
            <NameBox>
              <img src={`/images/category/${category.image}`} alt={category.name} style={{ width: '25px' }} />
              <FoodName>{category.name}</FoodName>
            </NameBox>
            <CountBox>
              {count == 0 && <Count>{count}</Count>}
              <Bar flexgrow={flexGrow}>{count > 0 && <Count>{count}</Count>}</Bar>
            </CountBox>
          </CategoryBox>
        );
      })}
    </div>
  );
};

export default Chart;
