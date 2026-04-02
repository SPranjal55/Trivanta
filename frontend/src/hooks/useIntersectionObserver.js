import { useEffect, useRef, useState } from 'react';

export default function useIntersectionObserver(options = {}) {
  const { threshold = 0.15, root = null, rootMargin = '0px' } = options;
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) setInView(true);
      },
      { threshold, root, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, root, rootMargin]);

  return { ref, inView };
}

