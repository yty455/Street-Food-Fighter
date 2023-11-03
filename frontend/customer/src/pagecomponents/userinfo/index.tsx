import Level from '@/components/mypage/level';
import {
  TopContent,
  Topbar,
  UserInfoContainer,
  ContentContainer,
  LogoutBox,
  LogoutText,
  ImageContainer,
  CameraIcon,
  ProfileImage,
} from './Userinfo.styled';
import { useRouter } from 'next/navigation';
import { user } from '@/temp/user';
import { LevelType } from '@/types/level.type';
import InfoBox from '@/components/userinfo/infobox';
import { useState } from 'react';
import Modify from '@/components/userinfo/modify';
const UserInfo = () => {
  const router = useRouter();

  // 회원정보
  const curuser = user;

  // 회원 정보 수정 모달
  const [showModify, setShowModify] = useState(false);
  const [selectedKey, setSelectedKey] = useState('');

  const handleEditClick = (key: string) => {
    setShowModify(true);
    setSelectedKey(key);
  };

  const handleClose = () => {
    setShowModify(false);
  };

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
      <ContentContainer>
        <ImageContainer>
          <ProfileImage src="/images/common/profile.png" />
          <CameraIcon src="/images/mypage/camera.png" />
        </ImageContainer>
        <Level level={curuser.grade as LevelType}></Level>

        <InfoBox onEditClick={handleEditClick} />
      </ContentContainer>
      <LogoutBox>
        <LogoutText> 로그아웃</LogoutText>
        <LogoutText> |</LogoutText>
        <LogoutText> 탈퇴하기</LogoutText>
      </LogoutBox>
      {showModify && <Modify type={selectedKey} onClose={handleClose} />}
    </UserInfoContainer>
  );
};

export default UserInfo;
