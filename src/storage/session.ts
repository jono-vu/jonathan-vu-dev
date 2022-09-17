import { getCurrentDate, getCurrentDateTime } from "../utils";

function getPrevSessionMobile() {
  const prevSessionMobile = window.localStorage.getItem("prev_session_mobile");

  window.localStorage.setItem("prev_session_mobile", getCurrentDate());

  return prevSessionMobile;
}

function getPrevSession() {
  const prevSession = window.localStorage.getItem("prev_session");

  window.localStorage.setItem("prev_session", getCurrentDateTime());

  return prevSession;
}

export { getPrevSessionMobile, getPrevSession };
