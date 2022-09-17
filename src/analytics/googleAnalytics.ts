import ReactGA from "react-ga";

function trackPageView(path: string) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!);
  ReactGA.pageview(path);
}

interface TrackEventInput {
  category: string;
  action: string;
}

function trackEvent({ category, action }: TrackEventInput) {
  ReactGA.event({ category, action });
}

export { trackPageView, trackEvent };
