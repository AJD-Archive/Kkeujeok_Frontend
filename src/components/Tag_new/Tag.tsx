import { baseTagStyle, sizeStyles, variantStyles } from './Tag.style';

interface TagProps {
  label?: string;
  variant?: 'default' | 'todo' | 'inProgress' | 'done' | 'challenge' | 'dDay' | 'urgent';
  size?: 'md' | 'lg';
}

export default function Tag({ label, variant = 'todo', size = 'md' }: TagProps) {
  return <p css={[baseTagStyle, variantStyles[variant], sizeStyles[size]]}>{label}</p>;
}
