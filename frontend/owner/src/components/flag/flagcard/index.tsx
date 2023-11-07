const FlagCard = ({ flag }: any) => {
  return (
    <div>
      <img src={`/images/flag/flag${flag.id}.png`} style={{ width: '40px' }} />
      <div>
        <table>
          <thead>
            <tr>
              <th>펀딩 금액</th>
              <th>영업 시간</th>
              <th>상세 주소</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{flag.fundingAmount} </td>
              <td>
                {flag.openTime} ~ {flag.closeTime}
              </td>
              <td>{flag.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <img src="/images/common/right.png" style={{ width: '30px' }} />
    </div>
  );
};

export default FlagCard;
