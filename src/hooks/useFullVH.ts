import { useEffect } from 'react';

export default function useFullVH() {
  useEffect(() => {
    const windowHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--window-height', `${window.innerHeight}px`);
    };
    window.addEventListener('resize', windowHeight);
    windowHeight();

    return () => {
      window.removeEventListener('resize', windowHeight);
    };
  }, []);
}
