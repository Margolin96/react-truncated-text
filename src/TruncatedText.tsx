import React, { useMemo } from 'react';

import './TruncatedText.css';

export interface ITruncatedTextProps {
  children: string;
  tailLength: number;
  title?: string;
  className?: string;
};

export function TruncatedText({
  children,
  tailLength,
  title = '',
  className = '',
}: ITruncatedTextProps) {
  const text = useMemo(() => {
    return (tailLength === 0)
      ? [children, '']
      : [
        children.slice(0, -tailLength),
        children.slice(-tailLength),
      ];
  }, [children, tailLength]);

  return (
    <div className={`truncated-text ${className}`} title={title}>
      <span className='truncated-text__truncated'>{ text[0] }</span>
      <span className='truncated-text__tail'>{ text[1] }</span>
    </div>
  );
}
