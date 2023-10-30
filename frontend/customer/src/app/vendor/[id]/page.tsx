import VendorPage from '@/pagecomponents/vendor';

export default function ({ params }: { params: { id: string } }) {
  return <VendorPage id={params.id}></VendorPage>;
}
