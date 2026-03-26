import { getInitials, getAvatarColor } from '@/utils/helpers';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Avatar({ name, size = 'md' }: AvatarProps) {
  const { bg, text } = getAvatarColor(name);
  const sizeClass = {
    sm: 'w-7 h-7 text-[10px]',
    md: 'w-9 h-9 text-xs',
    lg: 'w-11 h-11 text-sm',
  }[size];

  return (
    <div
      className={`${sizeClass} ${bg} ${text} rounded-full flex items-center justify-center font-medium flex-shrink-0`}
    >
      {getInitials(name)}
    </div>
  );
}
