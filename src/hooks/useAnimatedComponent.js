import { useEffect, useState } from "react";

const options = {
  root: null,
  rootMargin: "0px 0px 0px 0px",
  threshold: 0,
};

const useAnimatedComponent = (elementRef) => {

  useEffect(() => {
    if (elementRef.current) {
      const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            elementRef.current.classList.add("visible");
            observer.unobserve(elementRef.current);
          }
        });
      }, options);
      observer.observe(elementRef.current);
    }
  }, [elementRef]);

  return null;
};

export default useAnimatedComponent;
