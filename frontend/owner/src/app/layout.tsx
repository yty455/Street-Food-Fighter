'use client';
import { useEffect } from 'react';
import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/DefaultTheme';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  // 저장된 데이터 불러오기
  useEffect(() => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken != null) {
      // 문자열을 객체로 변환
      const userInfo = JSON.parse(refreshToken);
      console.log(userInfo);
    }
  }, []);

  return (
    <html>
      <head>
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`} />
      </head>
      <ThemeProvider theme={theme}>
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
