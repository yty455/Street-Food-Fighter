import { LevelType } from '@/types/level.type';
import Level from '../level';
import { RowDisplay, ProfileContainer, List, StyledButton, Airfont, LevelList, Nickname, ProfileList } from './Profile.styled';
import { useRouter } from 'next/navigation';
import userInfoStore from '@/stores/userInfoStore';

const Profile = ({ toggleModal }: any) => {
  const userInfo = userInfoStore();
  const router = useRouter();
  return (
    <ProfileContainer>
      <ProfileList>
        <RowDisplay>
          <img src="/images/common/profile.png" style={{ height: '80px' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <Nickname>{userInfo && userInfo.nickname}</Nickname>
            <LevelList>
              <Level level={userInfo.grade as LevelType}></Level>
              <img src="/images/mypage/quest.png" style={{ height: '20px' }} onClick={toggleModal} />
            </LevelList>
          </div>
        </RowDisplay>
        <img
          src="/images/common/right.png"
          style={{ height: '30px' }}
          onClick={() => {
            router.push('/userinfo');
          }}
        />
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
