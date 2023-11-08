import Topbar from '@/components/common/topbar';
import { flagdetail } from '@/temp/flagdetail';
import { UserGrades } from '@/types/usergrade.type';

const detail = () => {
  const detail = flagdetail;

  const getGradeCount = (grade: UserGrades) => detail.fundingUserGrade[grade] || 0;

  return (
    <div>
      <Topbar text="펀딩 현황" />
      <div>
        <div>
          <div> 영업일자</div>
          <div>{detail.date}</div>
          <div>
            {detail.openTime} ~ {detail.closeTime}
          </div>
        </div>
        <div>
          <div> 상세 주소</div>
          <div> {detail.address}</div>
        </div>
      </div>

      <div>
        <div>
          <div>총 펀딩 금액</div>
          <div>{detail.fundingAmount}</div>
        </div>
        <div>
          <div>펀딩한 회원 등급</div>
          <div>
            <div>
              <img src="/images/level.light.png" style={{ width: '20px' }} />
              <div> {getGradeCount('LIGHT')} 명</div>
            </div>
            <div>
              <img src="/images/level.middle.png" style={{ width: '20px' }} />
              <div> {getGradeCount('MIDDLE')} 명</div>
            </div>
            <div>
              <img src="/images/level.heavy.png" style={{ width: '20px' }} />
              <div> {getGradeCount('HEAVY')} 명</div>
            </div>
            <div>
              <img src="/images/level.champion.png" style={{ width: '20px' }} />
              <div> {getGradeCount('CHAMPION')} 명</div>
            </div>
          </div>
        </div>
      </div>

      <div>펀딩한 회원</div>
      <div>펀딩한 회원 리스트</div>
    </div>
  );
};

export default detail;
