'use client';

import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return null;
};

export default ScrollToTop;
