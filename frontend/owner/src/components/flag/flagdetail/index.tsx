import Topbar from '@/components/common/topbar';
import { UserGrades } from '@/types/usergrade.type';
import {
  Container,
  Content,
  BigContentBox,
  Title,
  UserGradeImage,
  ContentBox,
  GradeList,
  GradeNum,
  UserList,
  UserTitle,
  UserMenu,
  UserRight,
} from './Flagdetail.styled';
import { gradeMapping } from '@/assets/grade';
import { useEffect, useState } from 'react';
import DetailFlagAPI from '@/apis/flag/FlagDetailAPI';
import { FlagDetailType, FundingUserInfo } from '@/types/flagdetail.type';
import useFormatDate from '@/hooks/common/formatDate.hook';

const FlagDetail = ({ flag, closeModal }: any) => {
  const [detail, setDetail] = useState<FlagDetailType | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      const data = await DetailFlagAPI(flag.flagId); // flag의 id를 사용하여 API 호출
      if (data) {
        setDetail(data); // 응답 데이터로 상태 업데이트
        console.log(data);
      }
    };
    fetchDetail();
  }, [flag]);

  const getGradeCount = (grade: UserGrades) => detail?.fundingUserGrade[grade] || 0;

  const { formatTime24To12 } = useFormatDate();
  return (
    <Container>
      <Topbar text="펀딩 현황" type="close" closeModal={closeModal} />
      <BigContentBox>
        <ContentBox>
          <Title> 영업 일자</Title>
          <Content>{detail?.date}</Content>
          <Content>
            {detail?.openTime ? formatTime24To12(detail.openTime) : ''} ~{detail?.closeTime ? formatTime24To12(detail.closeTime) : ''}
          </Content>
        </ContentBox>
        <ContentBox>
          <Title> 상세 주소</Title>
          <Content> {detail?.address}</Content>
        </ContentBox>
      </BigContentBox>

      <BigContentBox>
        <ContentBox>
          <Title>총 펀딩 금액</Title>
          <Content>{Number(detail?.fundingAmount).toLocaleString()}원</Content>
        </ContentBox>
        <div>
          <Title>펀딩한 회원 등급</Title>
          <GradeList>
            <GradeNum>
              <img src="/images/grade/light.png" style={{ width: '45px' }} />
              <Content> {getGradeCount('LIGHT')}명</Content>
            </GradeNum>
            <GradeNum>
              <img src="/images/grade/middle.png" style={{ width: '45px' }} />
              <Content> {getGradeCount('MIDDLE')}명</Content>
            </GradeNum>
            <GradeNum>
              <img src="/images/grade/heavy.png" style={{ width: '45px' }} />
              <Content> {getGradeCount('HEAVY')}명</Content>
            </GradeNum>
            <GradeNum>
              <img src="/images/grade/champion.png" style={{ width: '45px' }} />
              <Content> {getGradeCount('CHAMPION')}명</Content>
            </GradeNum>
          </GradeList>
        </div>
      </BigContentBox>

      <BigContentBox>
        <Title>펀딩한 회원</Title>
        {detail?.fundingUserInfoList?.map((user: FundingUserInfo, userIndex: number) => (
          <UserList key={userIndex}>
            <UserGradeImage src={gradeMapping[user.userGrade]} />
            <UserRight>
              <UserTitle>
                {user.userName} / {Number(user.totalPrice).toLocaleString()}원
              </UserTitle>
              <UserMenu>
                {user.menuName} {user.menuCount}개{user.restCount > 1 && ` 외 다른 메뉴${user.restCount}개`}
              </UserMenu>
            </UserRight>
          </UserList>
        ))}
      </BigContentBox>
    </Container>
  );
};

export default FlagDetail;
