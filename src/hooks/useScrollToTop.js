import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    setTimeout(function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
    },2);
  }, [pathname]);
}