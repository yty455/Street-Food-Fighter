'use client';
import LeaveReviewPage from '@/pagecomponents/mypage/review/leavereview';

export default function ({ params }: { params: { id: string } }) {
  return <LeaveReviewPage params={params} />;
}
