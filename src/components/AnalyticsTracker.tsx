import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageVisit } from "../lib/analytics";

export function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    trackPageVisit(location.pathname);
  }, [location.pathname]);

  return null;
}
