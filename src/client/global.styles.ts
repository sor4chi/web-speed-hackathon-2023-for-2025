import { injectGlobal as css } from '@emotion/css';
import resetCssText from 'modern-css-reset/src/reset.css?raw';

export const injectGlobalStyle = () => css`
  ${resetCssText}

  ul, ol {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: sans-serif;
  }

  button {
    appearance: none;
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }

  @font-face {
    font-display: block;
    font-family: 'Noto Serif JP';
    font-style: normal;
    font-weight: 700;
    src: url('/fonts/NotoSerifJP-Bold.subset.otf');
  }

  @font-face {
    font-display: block;
    font-family: 'Noto Serif JP';
    font-style: normal;
    font-weight: 400;
    src: url('/fonts/NotoSerifJP-Regular.subset.otf');
  }
`;
