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

  const textRef = useRef(null);
  const tailRef = useRef(null);

  const text = useMemo(() => {
    return (tailLength === 0)
      ? [children, '']
      : [
        children.slice(0, -tailLength),
        children.slice(-tailLength),
      ];
  }, [children, tailLength]);

  useLayoutEffect(() => {
    const { width: tail } = tailRef.current.getBoundingClientRect();
    setMaxWidth(`calc(100% - ${tail}px)`);
  }, [textRef, tailRef, text]);

  return (
    <div className={`truncated-text ${className}`} title={title}>
      <span className='truncated-text__truncated' ref={textRef} style={{maxWidth}}>
        { text[0] }
        <span className="truncated-text__hidden-tail">{ text[1] }</span>
      </span>
      <span className='truncated-text__tail' ref={tailRef}>{ text[1] }</span>
    </div>
  );
});
