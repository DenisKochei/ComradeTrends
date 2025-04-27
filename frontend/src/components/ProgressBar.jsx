import { useLocation } from 'react-router-dom';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useEffect } from 'react';

export function ProgressBar() {
  const location = useLocation();

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,   
      trickleSpeed: 200,
      minimum: 0.08,
      easing: "ease",
      speed: 500,
    });
    NProgress.start();

    const timer = setTimeout(() => {
      NProgress.done();
    }, 500);

    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location]);

  return null;
}
