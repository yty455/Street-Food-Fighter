import { RowDisplay, ProfileContainer, List, StyledButton, Airfont, LevelList, Nickname, ProfileList } from './Profile.styled';

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileList>
        <RowDisplay>
          <img src="/images/common/profile.png" style={{ height: '70px' }} />
          <div>
            <Nickname>붕어빵 조아</Nickname>
            <LevelList>
              <div>헤비급 파이터</div>
              <img src="/images/mypage/quest.png" style={{ height: '15px' }} />
            </LevelList>
          </div>
        </RowDisplay>
        <img src="/images/common/right.png" style={{ height: '30px' }} />
      </ProfileList>

      <List>
        <StyledButton>
          <img src="/images/common/list.png" style={{ height: '40px' }} />
          <Airfont> 주문내역</Airfont>
        </StyledButton>
        <StyledButton>
          <img src="/images/mypage/funding.png" style={{ height: '40px' }} />
          <Airfont>펀딩내역</Airfont>
        </StyledButton>
        <StyledButton>
          <img src="/images/mypage/review.png" style={{ height: '40px' }} />
          <Airfont>리뷰관리</Airfont>
        </StyledButton>
      </List>
    </ProfileContainer>
  );
};

export default Profile;
