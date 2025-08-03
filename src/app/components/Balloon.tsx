interface BalloonProps {
  index: number;
  className: string;
  isPopped: boolean;
  onPop: (index: number) => void;
}

export const Balloon = ({ index, className, isPopped, onPop }: BalloonProps) => {
  if (isPopped) return null;

  return (
    <span
      className={`cursor-pointer select-none ${className}`}
      onClick={() => onPop(index)}
    >
      🎈
    </span>
  );
}; 