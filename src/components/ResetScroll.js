// @flow
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ResetScroll = () => {
  const location = useLocation().pathname;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

export default ResetScroll;
