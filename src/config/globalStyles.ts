import { createGlobalStyle } from 'styled-components';

import InterBold from '@/assets/fonts/Inter-Bold.ttf';
import InterMedium from '@/assets/fonts/Inter-Medium.ttf';
import InterRegular from '@/assets/fonts/Inter-Regular.ttf';
import InterSemiBold from '@/assets/fonts/Inter-SemiBold.ttf';

export const Fonts = createGlobalStyle`
  @font-face {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 400;
    src: local(${({ theme }) =>
      theme.typography.fontFamily}), url(${InterRegular}) format('opentype');
  }
  @font-face {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 500;
    src: local(${({ theme }) =>
      theme.typography.fontFamily}), url(${InterMedium}) format('opentype');
  }
  @font-face {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 600;
    src: local(${({ theme }) =>
      theme.typography.fontFamily}), url(${InterSemiBold}) format('opentype');
  }
  @font-face {
    font-family: ${({ theme }) => theme.typography.fontFamily};
    font-weight: 700;
    src: local(${({ theme }) =>
      theme.typography.fontFamily}), url(${InterBold}) format('opentype');
  }
`;

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: ${({ theme }) =>
      theme.typography
        .fontFamily}, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  #root {
    height: 100%;
  }

  html {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  
  *,
  *::before,
  *::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
  }

  color: ${({ theme }) => theme.color.colorBlack}
`;
