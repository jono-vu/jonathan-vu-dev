import ReactGA from "react-ga4";

function trackPageView(path: string) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID!);
  ReactGA.send({ hitType: "pageview", page: path });
}

interface TrackEventInput {
  category: string;
  action: string;
}

function trackEvent({ category, action }: TrackEventInput) {
  ReactGA.event({ category, action });
}

export { trackPageView, trackEvent };
