import React, { useLayoutEffect, useMemo, useRef } from 'react';

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
  const ref = useRef(null);
  const text = useMemo(() => {
    return (tailLength === 0)
      ? [children, '']
      : [
        children.slice(0, -tailLength),
        children.slice(-tailLength),
      ];
  }, [children, tailLength]);
  
  useLayoutEffect(() => {
    const node = ref.current;
    console.log(node);
    const handler = (event: ClipboardEvent) => {
      event.clipboardData.setData(
        'text/plain',
        document.getSelection().toString().replace('\n', ''),
      );
      event.preventDefault();
    };

    node.addEventListener('copy', handler);
    return () => node.removeEventListener('copy', handler);
  }, [ref]);

  return (
    <div className={`truncated-text ${className}`} title={title} ref={ref}>
      <span className='truncated-text__full'>{ children }</span>
      <span className='truncated-text__truncated'>{ text[0] }</span>
      <span className='truncated-text__tail'>{ text[1] }</span>
    </div>
  );
}
