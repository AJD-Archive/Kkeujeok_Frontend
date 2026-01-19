import { css } from '@emotion/react';

import {
  baseDotStyle,
  COLUMN_CONFIG,
  columnTitleStyle,
  containerStyle,
  headerStyle,
  titleStyle,
} from './DashboardColumn.style';

interface DashboardColumnProps {
  variant: 'todo' | 'inProgress' | 'done';
}

export default function DashboardColumn({ variant = 'todo' }: DashboardColumnProps) {
  const config = COLUMN_CONFIG[variant];

  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <div css={columnTitleStyle}>
          <div css={[baseDotStyle, css({ backgroundColor: config.dotColor })]} />
          <p css={titleStyle}>{config.title}</p>
        </div>

        {/* todo: Button 컴포넌트로 변경 */}
        <div>+</div>
      </div>

      <div>{/* Block 들어갈 div */}</div>
    </div>
  );
}
