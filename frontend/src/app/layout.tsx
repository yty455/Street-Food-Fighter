'use client';
import StyledComponentsRegistry from './lib/registry';
import '../styles/globals.css';
import { ThemeProvider } from 'styled-components';
import theme from '../styles/DefaultTheme';
import Navbar from '@/components/common/navbar';
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <ThemeProvider theme={theme}>
        <body>
          <StyledComponentsRegistry>
            <Navbar />
            {children}
          </StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
