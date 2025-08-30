import React, { useCallback, useEffect, useRef } from 'react';

interface UseGrabScrollOptions {
  wheelEvent?: boolean;
}

export function useGrabScroll({
  wheelEvent = false,
}: UseGrabScrollOptions = {}): React.Ref<HTMLDivElement | null> {
  const elementRef = useRef<HTMLDivElement | null>(null);
  const savedPageXRef = useRef(0);
  const savedScrollLeftRef = useRef(0);

  const setCursor = useCallback((value: string) => {
    if (elementRef.current) {
      elementRef.current.style.cursor = value;
    }
  }, []);

  const setScrollLeft = useCallback((value: number) => {
    if (elementRef.current) {
      elementRef.current.scrollLeft = value;
    }
  }, []);

  const handleMouseDown = useCallback((event: MouseEvent) => {
    event.preventDefault();
    savedPageXRef.current = event.pageX;
    if (elementRef.current) {
      savedScrollLeftRef.current = elementRef.current.scrollLeft;
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!savedPageXRef.current) return;
      if (elementRef.current) {
        setCursor('grabbing');
        for (const child of Array.from(elementRef.current.children)) {
          (child as HTMLElement).style.pointerEvents = 'none';
        }
        const newScroll = savedScrollLeftRef.current + (savedPageXRef.current - event.pageX);
        setScrollLeft(newScroll);
      }
    },
    [setCursor, setScrollLeft]
  );

  const handleMouseUp = useCallback(() => {
    savedPageXRef.current = 0;
    setCursor('default');
    if (elementRef.current) {
      for (const child of Array.from(elementRef.current.children)) {
        (child as HTMLElement).style.pointerEvents = 'auto';
      }
    }
  }, [setCursor]);

  const handleMouseLeave = useCallback(() => {
    savedPageXRef.current = 0;
    setCursor('default');
  }, [setCursor]);

  const handleWheel = useCallback(
    (event: WheelEvent & { wheelDelta?: number }) => {
      if (!wheelEvent) return;
      event.preventDefault();
      if (elementRef.current) {
        const delta = Math.max(-1, Math.min(1, event.wheelDelta || -event.detail)) * 100;
        setScrollLeft(elementRef.current.scrollLeft - delta);
        savedScrollLeftRef.current = elementRef.current.scrollLeft;
      }
    },
    [wheelEvent, setScrollLeft]
  );

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    setCursor('default');

    el.addEventListener('mousedown', handleMouseDown);
    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseup', handleMouseUp);
    el.addEventListener('mouseleave', handleMouseLeave);

    if (wheelEvent) {
      const wheelEventName = /Firefox/i.test(navigator.userAgent) ? 'DOMMouseScroll' : 'mousewheel';
      el.addEventListener(wheelEventName, handleWheel as EventListener, { passive: false });
    }

    return () => {
      el.removeEventListener('mousedown', handleMouseDown);
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseup', handleMouseUp);
      el.removeEventListener('mouseleave', handleMouseLeave);

      if (wheelEvent) {
        const wheelEventName = /Firefox/i.test(navigator.userAgent)
          ? 'DOMMouseScroll'
          : 'mousewheel';
        el.removeEventListener(wheelEventName, handleWheel as EventListener);
      }
    };
  }, [
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleWheel,
    setCursor,
    wheelEvent,
  ]);

  return elementRef;
}
