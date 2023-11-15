'use client';

import FundingDetailPage from '@/pagecomponents/orderlist/fundinglist/detail';

export default function ({ params }: { params: { id: string } }) {
  return <FundingDetailPage params={params} />;
}
