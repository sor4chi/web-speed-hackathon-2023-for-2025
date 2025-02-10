import type { FC, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

import * as styles from './AspectRatio.styles';

type Props = {
  ratioWidth: number;
  ratioHeight: number;
  children: ReactNode;
};

export const AspectRatio: FC<Props> = ({ children, ratioHeight, ratioWidth }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clientHeight, setClientHeight] = useState<number>(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;
      setClientHeight((width * ratioHeight) / ratioWidth);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [ratioHeight, ratioWidth]);

  return (
    <div ref={containerRef} className={styles.container({ clientHeight })}>
      {children}
    </div>
  );
};
