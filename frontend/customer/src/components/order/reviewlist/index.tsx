import { vendordata } from '@/temp/vendordata';
import ReviewCard from '../reviewcard';

const Reviewlist = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];
  return (
    <div>
      <ReviewCard vendorid={vendorid} />
    </div>
  );
};

export default Reviewlist;
