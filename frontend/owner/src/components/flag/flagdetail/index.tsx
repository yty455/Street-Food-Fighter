import Topbar from '@/components/common/topbar';
import { flagdetail } from '@/temp/flagdetail';
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

const FlagDetail = ({ flag, closeModal }: any) => {
  const detail = flagdetail; // 이후 flag이용해서 detail 가져오기

  const getGradeCount = (grade: UserGrades) => detail.fundingUserGrade[grade] || 0;

  return (
    <Container>
      <Topbar text="펀딩 현황" type="close" closeModal={closeModal} />
      <BigContentBox>
        <ContentBox>
          <Title> 영업 일자</Title>
          <Content>{detail.date}</Content>
          <Content>
            {detail.openTime} ~ {detail.closeTime}
          </Content>
        </ContentBox>
        <ContentBox>
          <Title> 상세 주소</Title>
          <Content> {detail.address}</Content>
        </ContentBox>
      </BigContentBox>

      <BigContentBox>
        <ContentBox>
          <Title>총 펀딩 금액</Title>
          <Content>{Number(detail.fundingAmount).toLocaleString()}원</Content>
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
        {detail.fundingUserInfoList.map((user, userIndex) => (
          <UserList key={userIndex}>
            <UserGradeImage src={gradeMapping[user.userGrade as UserGrades]} />

            <UserRight>
              <UserTitle>
                {user.userName} / {Number(user.totalPrice).toLocaleString()}원
              </UserTitle>
              {user.fundingMenuInfoList.length > 0 && (
                <UserMenu>
                  {user.fundingMenuInfoList[0].menuName} {user.fundingMenuInfoList[0].count}개
                  {user.fundingMenuInfoList.length > 1 && ` 외 다른 메뉴${user.fundingMenuInfoList.length - 1}개`}
                </UserMenu>
              )}
            </UserRight>
          </UserList>
        ))}
      </BigContentBox>
    </Container>
  );
};

export default FlagDetail;
