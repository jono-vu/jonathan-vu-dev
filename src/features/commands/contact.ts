import { constants } from "../../config";

const contact = {
  input: "contact",
  output: [
    null,
    "↳ jono.vu@gmail.com",
    null,
    `It is currently ${getCurrentTime()} in Melbourne`,
    `I check my emails in the morning, not on weekends`,
    null,
    constants.COMMAND_PREFIX,
  ],
};

export { contact };

function getCurrentTime() {
  const timestampUTC = new Date();

  const timestampAEDT = timestampUTC.toLocaleTimeString("en-AU", {
    timeZone: "Australia/Melbourne",
  });

  return timestampAEDT;
}
