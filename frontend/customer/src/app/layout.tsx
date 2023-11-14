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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const excludedPaths = ['/vendor', '/topurchase', '/userinfo', '/password', '/login', '/register', '/success'];
  const { setUserInfo } = userInfoStore();

  useEffect(() => {
    const GetUserInfo = async () => {
      const data = await UserInfotAPI();
      if (data != null) {
        setUserInfo(data);
      }
    };
    GetUserInfo();
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
