'use client';
import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/DefaultTheme';
import Navbar from '@/components/common/navbar';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import UserInfotAPI from '@/apis/user/UserInfoAPI';
import userInfoStore from '@/stores/userInfoStore';
import { useRouter } from 'next/navigation';
import GetTokenAPI from '@/apis/token/RefreshTokenAPI';
import usePasswordStore from '@/stores/passwordStore';
import GetMyPasswordAPI from '@/apis/user/GetMyPasswordAPI';
import usePayPwdStore from '@/stores/userpwdStore';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const excludedPaths = [
    '/vendor',
    '/topurchase',
    '/userinfo',
    '/password',
    '/login',
    '/register',
    '/success',
    '/ordercheck',
    '/orderlist/detail',
    '/orderlist/fundinglist/detail',
    '/mypage/wishlist',
  ];
  const { setUserInfo } = userInfoStore();
  const { setPayPassword } = usePayPwdStore();

  useEffect(() => {
    const GetUserInfo = async () => {
      const data = await UserInfotAPI();
      if (data != null) {
        setUserInfo(data);

        const res = await GetMyPasswordAPI();
        if (res) {
          setPayPassword(res.paymentPassword);
          console.log(res.paymentPassword);
        }
      }
    };

    const updateAccessToken = async () => {
      try {
        const result = await GetTokenAPI();
        if (result.data.success) {
          localStorage.setItem('user-refreshToken', result.headers['authorization-refresh']);
          localStorage.setItem('user-accessToken', result.headers['authorization']);
          GetUserInfo();
          return;
        } else {
          throw new Error('자동로그인 실패');
        }
      } catch (error) {
        localStorage.removeItem('user-refreshToken');
        localStorage.removeItem('user-accessToken');
        console.error('Error fetching access token:', error);
        router.push('/login');
      }
    };

    updateAccessToken();
  }, []);

  return (
    <html>
      <head>
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`} />
      </head>
      <ThemeProvider theme={theme}>
        <body style={{ height: '100vh' }}>
          <StyledComponentsRegistry>
            {children}
            {/* {!excludedPaths.includes(pathname) && <Navbar />} */}
            {!excludedPaths.some((path) => pathname.startsWith(path)) && <Navbar />}
          </StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
