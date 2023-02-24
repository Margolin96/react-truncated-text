import React, { useMemo, useRef, useState, useLayoutEffect, useCallback } from 'react';
import useResizeObserver, { ObservedSize } from 'use-resize-observer';

import './TruncatedText.css';

const dotsWidth = 15;

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
  const [tailWidth, setTailWidth] = useState(0);
  const [visibleLetters, setVisibleLetters] = useState('');
  const [invisibleSpacing, setInvisibleSpacing] = useState(0);
  const [invisibleLetters, setInvisibleLetters] = useState('');
  const startRef = useRef<HTMLElement>(null);
  const tailRef = useRef<HTMLElement>(null);
  const fullRef = useRef<HTMLElement>(null);

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

    const { width } = tailRef.current.getBoundingClientRect();
    setTailWidth(width);
  }, [tailRef, text]);

  const onResize = useCallback(({ width }: ObservedSize) => {
    if (!startRef.current) return;
    if (!width) return;

    const needed = startRef.current.getBoundingClientRect().width;
    const current = startRef.current.scrollWidth;

    const average = current / text[0].length;
    const index = Math.floor((needed - dotsWidth) / average);
    const visibleLetters = text[0].slice(0, index);
    const invisibleLetters = text[0].slice(index);
    const invisibleSpacing = invisibleLetters.length > 0
      ? -((average * invisibleLetters.length) - dotsWidth) / invisibleLetters.length
      : 0;

    setVisibleLetters(visibleLetters);
    setInvisibleSpacing(invisibleSpacing);
    setInvisibleLetters(invisibleLetters);
  }, [text]);

  const { ref: wrapRef } = useResizeObserver<HTMLDivElement>({ onResize });

  return (
    <div className={`truncated-text ${className}`} title={title} ref={wrapRef}>
      <span className='truncated-text__truncated' ref={startRef} style={{maxWidth: `calc(100% - ${tailWidth}px`}} data-text={text[0]} />
      <span className='truncated-text__tail' ref={tailRef} data-text={text[1]} />
      <span className='truncated-text__full' ref={fullRef}>
        <span>{visibleLetters}</span>
        <span style={{letterSpacing: invisibleSpacing}}>{invisibleLetters}</span>
        <span>{text[1]}</span>
      </span>
    </div>
  );
});
