import React, { useMemo, useRef, useLayoutEffect, useState } from 'react';

import './TruncatedText.css';

export interface ITruncatedTextProps {
  children: string;
  tailLength: number;
  title?: string;
  className?: string;
};

export const TruncatedText = React.memo(({
  children,
  tailLength,
  title = '',
  className = '',
}: ITruncatedTextProps) => {
  const [maxWidth, setMaxWidth] = useState('100%');
  const tailRef = useRef<HTMLElement>(null);

  const text = useMemo(() => {
    return (tailLength === 0)
      ? [children, '']
      : [
        children.slice(0, -tailLength),
        children.slice(-tailLength),
      ];
  }, [children, tailLength]);

  useLayoutEffect(() => {
    if (!tailRef.current) return;

    const { width: tail } = tailRef.current.getBoundingClientRect();
    setMaxWidth(`calc(100% - ${tail}px)`);
  }, [tailRef, text]);

  return (
    <div className={`truncated-text ${className}`} title={title}>
      <span className='truncated-text__truncated' style={{maxWidth}}>
        { text[0] }
        <span className="truncated-text__hidden-tail">{ text[1] }</span>
      </span>
      <span className='truncated-text__tail'>{ text[1] }</span>
      <span className='truncated-text__tail-holder' ref={tailRef} data-text={text[1]} />
    </div>
  );
});
