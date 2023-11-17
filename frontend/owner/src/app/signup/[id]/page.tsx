'use client';

import RegisterPage from '@/pagecomponents/signup';

export default function ({ params }: { params: { id: string } }) {
  return <RegisterPage params={params}></RegisterPage>;
}
