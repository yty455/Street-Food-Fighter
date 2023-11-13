import { useRef, useState, useEffect } from 'react';
import { Label, StyleSignUp, HeaderStyle, BodyStyle, FooterStyle, ButtonWrapper } from '../SingUp.styled';
import RoundButton from '@/components/common/roundbtn';
import { useRouter } from 'next/navigation';
import useSignUpPageStore from '@/stores/signUpStore';
import { categories } from '@/assets/category';
import Select from '@/components/common/select';
import CategorySelector from '@/components/common/categoryselector';
import SignUpAPI from '@/apis/signup/SignUpAPI';

const SignUpFourthPage = ({ params, ...props }: any) => {
  const router = useRouter();
  const { businessCategory, category, setRegisterValue } = useSignUpPageStore();
  const { email, password, storeName, name, bank, phone, accountNumber, openHour, openMinute, closeHour, closeMinute } = useSignUpPageStore();
  const initialCategoryName = categories.find((cat) => cat.type === 'HOTTEOK')?.name || null;

  const moveNextPage = async () => {
    const data = {
      email,
      password,
      name,
      phone,
      bank,
      accountNumber,
      fcmToken: '',
      storeName,
      openTime: openHour + ':' + openMinute,
      closeTime: closeHour + ':' + closeMinute,
      businessCategory,
      category,
    };
    const result = await SignUpAPI(data);
    if (result.success) {
      alert('회원가입에 성공하셨습니다.');
      router.push('/login');
    }
    // router.push('/signup/5');
  };
  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleChangeBusinessCategory = (value: string) => {
    setRegisterValue('businessCategory', value);
  };

  const handleChangeCategory = (value: string) => {
    setRegisterValue('category', value);
  };

  return (
    <StyleSignUp>
      {/* header */}
      <HeaderStyle>회원가입</HeaderStyle>
      {/* body */}
      <BodyStyle>
        <Label>업태</Label>
        <Select a="포장마차" b="푸드트럭" selected={businessCategory} onSelect={handleChangeBusinessCategory} />
        <Label>대표 카테고리</Label>
        <CategorySelector categories={categories} selectedCategory={category} selectCategory={handleChangeCategory} />
      </BodyStyle>
      {/* footer */}
      <FooterStyle>
        <ButtonWrapper>
          <RoundButton onClick={moveNextPage} text="계속하기"></RoundButton>
        </ButtonWrapper>
      </FooterStyle>
    </StyleSignUp>
  );
};

export default SignUpFourthPage;
