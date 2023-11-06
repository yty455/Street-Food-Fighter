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
import Modify from '@/components/userinfo/modify';

// firebase 연동
import { useRef, useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { imgstorage } from '@/firebase/firebasedb';

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

  // 프로필 이미지
  const [profileImageUrl, setProfileImageUrl] = useState('/images/common/profile.png');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const storageRef = ref(imgstorage, `profile_images/${curuser.id}_${file.name}`);
      try {
        await uploadBytes(storageRef, file);
        const downloadUrl = await getDownloadURL(storageRef);
        setProfileImageUrl(downloadUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const triggerFileSelectPopup = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <ProfileImage src={profileImageUrl} />
          <CameraIcon src="/images/mypage/camera.png" onClick={triggerFileSelectPopup} />
          <input type="file" style={{ display: 'none' }} ref={fileInputRef} onChange={handleFileChange} />
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
