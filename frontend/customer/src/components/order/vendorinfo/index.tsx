import { vendordata } from '@/temp/vendordata';

const VendorInfo = ({ vendorid }: any) => {
  const vendor = vendordata[vendorid];

  console.log(vendor);
  return (
    <div>
      <div>가게소개</div>
      <div>{vendor.introduction}</div>

      <div>영업정보</div>

      <table>
        <tr>
          <td>상호명</td>
          <td>{vendor.name}</td>
        </tr>
        <tr>
          <td>운영시간</td>
          <td>
            {vendor.starttime} ~ {vendor.endtime}
          </td>
        </tr>
        <tr>
          <td>전화번호</td>
          <td>{vendor.phone}</td>
        </tr>
        <tr>
          <td>위치</td>
          <td>{vendor.loc}</td>
        </tr>
      </table>

      <div>안내</div>
      <div> {vendor.notice}</div>
    </div>
  );
};

export default VendorInfo;
