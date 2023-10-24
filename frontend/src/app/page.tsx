'use client';
import { useState, useEffect } from 'react';
import MainPage from '@/pagecomponents/main';
import LandingPage from '@/pagecomponents/landing';
import styled from 'styled-components';

const FadeOut = styled.div<{ fade: boolean }>`
  opacity: ${({ fade }) => (fade ? 0 : 1)};
  transition: opacity 1s;
`;

export default function Home() {
  const [showLanding, setShowLanding] = useState(true);
  const [fadeLanding, setFadeLanding] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeLanding(true);
    }, 400);

    const showTimer = setTimeout(() => {
      setShowLanding(false);
    }, 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(showTimer);
    };
  }, []);

  return (
    <>
      {showLanding && (
        <FadeOut fade={fadeLanding}>
          <LandingPage />
        </FadeOut>
      )}
      {!showLanding && <MainPage />}
    </>
  );
}
