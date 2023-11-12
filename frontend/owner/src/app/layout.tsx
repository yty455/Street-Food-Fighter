'use client';
import { useEffect } from 'react';
import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/DefaultTheme';
import useSetOwnerInfoHook from '@/hooks/owner/ownerInfo.hook';
import GetTokenAPI from '@/apis/token/RefreshTokenAPI';
import { useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const setOwner = useSetOwnerInfoHook();
  const router = useRouter();

  useEffect(() => {
    const refreshTokenJson = localStorage.getItem('refreshToken');
    const updateAccessToken = async () => {
      if (refreshTokenJson != null) {
        try {
          const refreshToken = JSON.parse(refreshTokenJson);
          const result = await GetTokenAPI(refreshToken);
          const accessToken = result.headers['authorization'];
          localStorage.setItem('refreshToken', JSON.stringify(result.headers['authorization-refresh']));
          setOwner(accessToken);
          return;
        } catch (error) {
          localStorage.removeItem('refreshToken');
          console.error('Error fetching access token:', error);
          router.push('/login');
        }
        router.push('/login');
      } else {
        localStorage.removeItem('refreshToken');
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
        <body>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
