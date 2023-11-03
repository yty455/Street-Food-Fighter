import Level from '@/components/mypage/level';
import { TopContent, Topbar, UserInfoContainer } from './Userinfo.styled';
import { useRouter } from 'next/navigation';
import { user } from '@/temp/user';
import { LevelType } from '@/types/level.type';
import InfoBox from '@/components/userinfo/infobox';
const UserInfo = () => {
  const router = useRouter();

  // 회원정보
  const curuser = user;
  return (
    <UserInfoContainer>
      <Topbar>
        <TopContent>
          <img
            src="/images/top/back.png"
            style={{ width: '25px' }}
            onClick={() => {
              router.back();
            }}
          />
          <div> 회원 정보</div>
        </TopContent>
      </Topbar>
      <div>
        <div>프로필 이미지 수정</div>
        <Level level={curuser.grade as LevelType}></Level>

        <InfoBox></InfoBox>
      </div>
    </UserInfoContainer>
  );
};

export default UserInfo;
