import { css, Global } from '@emotion/react';

const resetStyle = css`
  @font-face {
    font-family: 'Pretendard';
    src: url('../assets/fonts/PretendardVariable.woff2') format('woff2');
    font-weight: 100 900;
    font-display: swap;
  }

  :root {
    --black: #101010;
    --white: #fdfdfd;
    --red: #ff383c;
    --main: #4c8cff;
    --main2: #9847ff;
    --main3: #00d1ff;
    --text: #2a2c30;
    --gray: #858585;
    --lightGray: #d1d1d1;
    --navbar: #f5f5f5;
    --gradation: linear-gradient(90deg, #4c8cff 0%, #9847ff 100%);
    --border: #b0b0b0;
    --stroke2: #eeeeee;
    --toastify-color-progress-light: linear-gradient(to right, #4c8cff, #9847ff, #00d1ff);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    font-family:
      'Pretendard',
      -apple-system,
      BlinkMacSystemFont,
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
      sans-serif;
    word-break: keep-all;
    color: var(--text);
    background-color: var(--white);
  }

  body {
    margin: 0;
    padding: 0;
    line-height: 1;
    -webkit-font-smoothing: antialiased; /* 텍스트를 부드럽게 렌더링 (WebKit) */
    -moz-osx-font-smoothing: grayscale; /* 텍스트를 부드럽게 렌더링 (macOS Firefox) */
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* 모바일 탭 하이라이트 제거 */
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
  }

  label,
  input,
  select,
  textarea,
  button {
    border: none;
    box-shadow: none;
    font: inherit;
    color: inherit;
  }

  button {
    background: none;
    cursor: pointer;
  }

  input[type='radio'] {
    cursor: pointer;
  }

  /* 드래그 허용되는 영역 */
  .draggable {
    -webkit-user-select: all;
    -moz-user-select: all;
    -ms-user-select: all;
    user-select: all;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  span,
  strong,
  ul,
  ol,
  li,
  div,
  a,
  img,
  form,
  label,
  article,
  figure,
  footer,
  header,
  nav,
  section {
    margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    font-weight: normal;
  }

  // 테이블 기본 리셋
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  // SVG/IMG 인라인 정렬
  svg,
  img {
    vertical-align: top;
  }

  // code 폰트
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
  }
`;

const NewGlobalStyle = () => {
  return <Global styles={resetStyle} />;
};

export default NewGlobalStyle;
