import { useEffect, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface ScrollToTopProps {
  children?: ReactNode;
  containerSelector?: string; // CSS selector for scrollable container
  behavior?: 'smooth' | 'instant' | 'auto';
}

/**
 * ScrollToTop Component
 * Scrolls to top on route change
 * 
 * @param containerSelector - CSS selector for custom scroll container (e.g., ".main-content")
 * @param behavior - Scroll behavior: 'smooth', 'instant', or 'auto'
 */
const ScrollToTop: React.FC<ScrollToTopProps> = ({ 
  children, 
  containerSelector,
  behavior = 'instant'
}) => {
  const { pathname } = useLocation();

  useEffect(() => {
    // If custom container selector is provided
    if (containerSelector) {
      const container = document.querySelector(containerSelector);
      if (container) {
        container.scrollTo({
          top: 0,
          left: 0,
          behavior: behavior
        });
      }
    } else {
      // Default: scroll window
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: behavior
      });
    }
  }, [pathname, containerSelector, behavior]);

  return <>{children}</>;
};

export default ScrollToTop;