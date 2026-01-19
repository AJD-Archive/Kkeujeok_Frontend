import Tag from '@/components/Tag_new/Tag';

import { containerStyle, contentStyle, descriptionStyle, headerStyle, titleStyle } from './Block.style';

const TAG_LABELS = {
  todo: '시작 전',
  inProgress: '진행 중',
  done: '완료',
  challenge: '도전! 챌린지',
} as const;

interface BlockProps {
  tagVariant: 'todo' | 'inProgress' | 'done' | 'challenge';
  dDay?: string;
  title?: string;
  description?: string;
}

export default function Block({ tagVariant, dDay, title, description }: BlockProps) {
  return (
    <div css={containerStyle}>
      <div css={headerStyle}>
        <Tag label={TAG_LABELS[tagVariant]} variant={tagVariant} />
        <Tag label={dDay} variant='dDay' />
      </div>
      <div css={contentStyle}>
        <p css={titleStyle}>{title}</p>
        <div css={descriptionStyle}>{description}</div>
      </div>
    </div>
  );
}
