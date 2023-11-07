'use client';

import PasswordPage from '@/pagecomponents/password';

export default function Password({ params }: { params: { slug: string } }) {
  return <PasswordPage slug={params.slug} />;
}
