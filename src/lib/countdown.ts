export const COUNTDOWN_TARGET_ISO = "2027-09-23T00:00:00-03:00";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export function getCountdownParts(now: number, target = Date.parse(COUNTDOWN_TARGET_ISO)): CountdownParts {
  const remaining = Math.max(0, target - now);
  const totalSeconds = Math.floor(remaining / 1_000);

  return {
    days: Math.floor(totalSeconds / 86_400),
    hours: Math.floor((totalSeconds % 86_400) / 3_600),
    minutes: Math.floor((totalSeconds % 3_600) / 60),
    seconds: totalSeconds % 60,
  };
}
