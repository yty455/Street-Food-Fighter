'use client';

import OrderDetailPage from '@/pagecomponents/orderlist/detail';

export default function ({ params }: { params: { id: string } }) {
  return <OrderDetailPage params={params} />;
}
