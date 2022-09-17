function getCurrentDate() {
  const timestampUTC = new Date();

  const dateAEDT = timestampUTC.toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `${dateAEDT}`;
}

function getCurrentDateTime() {
  const timestampUTC = new Date();

  const timestampAEDT = timestampUTC.toLocaleTimeString("en-AU", {
    timeZone: "Australia/Melbourne",
  });

  const dateAEDT = timestampUTC.toLocaleDateString("en-AU", {
    timeZone: "Australia/Melbourne",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  return `${dateAEDT} ${timestampAEDT}`;
}

export { getCurrentDate, getCurrentDateTime };
