import { css, Global } from '@emotion/react';
import { resetCss } from './reset';

export default function GlobalStyle() {
  return <Global styles={globalCss} />;
}

const globalCss = () => css`
  ${resetCss}

  :root {
    font-family: Pretendard;

    body {
      .draggable {
        -webkit-user-select: all;
        -moz-user-select: all;
        -ms-user-select: all;
        user-select: all;
      }
    }

    * {
      box-sizing: border-box;
      font-family: inherit;
      word-break: keep-all;
      word-wrap: break-word;

      -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* iOS Button Active */

      -ms-overflow-style: none; /* IE 11 */
      scrollbar-width: none; /* Firefox 64 */
      ::-webkit-scrollbar {
        display: none !important;
      }
    }

    button:focus {
      outline: none;
    }
  }
`;
