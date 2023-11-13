'use client';

import RegisterPage from '@/pagecomponents/register';

export default function ({ params }: { params: { id: string } }) {
  return <RegisterPage params={params}></RegisterPage>;
}
