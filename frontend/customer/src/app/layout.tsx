'use client';
import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/DefaultTheme';
import Navbar from '@/components/common/navbar';
import { usePathname, useRouter } from 'next/navigation';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html>
      <head>
        <script type="text/javascript" src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`} />
      </head>
      <ThemeProvider theme={theme}>
        <body style={{ height: '100vh' }}>
          <StyledComponentsRegistry>
            {children}
            {!pathname.includes('/vendor') && pathname != '/topurchase' && <Navbar />}
          </StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
