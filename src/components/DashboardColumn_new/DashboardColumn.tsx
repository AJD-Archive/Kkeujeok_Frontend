import { css } from '@emotion/react';

import Block from '../Block_new/Block';
import {
  baseDotStyle,
  blocksStyle,
  COLUMN_CONFIG,
  columnTitleStyle,
  containerStyle,
  headerStyle,
  titleStyle,
} from './DashboardColumn.style';

interface BlockData {
  id: string;
  tagVariant: 'todo' | 'inProgress' | 'done' | 'challenge';
  dDay?: string;
  title?: string;
  description?: string;
}

interface DashboardColumnProps {
  variant: 'todo' | 'inProgress' | 'done';
  blocks?: BlockData[];
}

export default function DashboardColumn({ variant = 'todo', blocks }: DashboardColumnProps) {
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

      <div css={blocksStyle}>
        {blocks?.map((block) => (
          <Block
            key={block.id}
            dDay={block.dDay}
            description={block.description}
            tagVariant={block.tagVariant}
            title={block.title}
          />
        ))}
      </div>
    </div>
  );
}
