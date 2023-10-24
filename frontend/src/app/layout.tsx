"use client";
// import Navbar from "@/components/common/navbar";
import StyledComponentsRegistry from "./lib/registry";
import "../styles/globals.css";
import { ThemeProvider } from "styled-components";
import theme from "../styles/DefaultTheme";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <ThemeProvider theme={theme}>
        <body>
          <StyledComponentsRegistry>
            {/* <Navbar /> */}
            {children}
          </StyledComponentsRegistry>
        </body>
      </ThemeProvider>
    </html>
  );
}
