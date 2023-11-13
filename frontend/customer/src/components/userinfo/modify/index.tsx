import { ModifyInfoArray } from '@/assets/modifyinfo';
import { ContentBox, ModalOverlay, TopContent } from './Modify.styled';
import { Topbar } from '@/pagecomponents/userinfo/Userinfo.styled';
import Input from '@/components/common/input';
import { useState } from 'react';
import BottomBtn from '@/components/common/bottombtn';

interface ModifyProps {
  type: string;
  onClose: () => void;
}

const Modify = ({ type, onClose }: ModifyProps) => {
  const fieldInfo = ModifyInfoArray.find((item) => item.key === type);
  const modifyname = fieldInfo ? fieldInfo.value : type;

  const [change, setChange] = useState('');
  const handleChange = (e: any) => {
    setChange(e.target.value);
  };

  return (
    <ModalOverlay>
      <div>
        <Topbar>
          <TopContent>
            <img src="/images/top/back.png" style={{ width: '25px' }} onClick={onClose} />
            <div> 회원 정보 수정 </div>
          </TopContent>
        </Topbar>
        <ContentBox>
          <div style={{ fontSize: '20px' }}>변경할 {modifyname}을 입력해주세요</div>
          <Input value={change} onChange={handleChange} placeholder="변경할 내용을 입력해주세요" maxLength={25} use="info" />
        </ContentBox>
        <BottomBtn text="변경 완료" />
      </div>
    </ModalOverlay>
  );
};

export default Modify;
