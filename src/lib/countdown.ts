export const COUNTDOWN_TARGET_ISO = "2027-09-23T00:00:00-03:00";

export type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
};

export function getCountdownParts(now: number, target = Date.parse(COUNTDOWN_TARGET_ISO)): CountdownParts {
  const remaining = Math.max(0, target - now);
  const totalMinutes = Math.floor(remaining / 60_000);

  return {
    days: Math.floor(totalMinutes / 1_440),
    hours: Math.floor((totalMinutes % 1_440) / 60),
    minutes: totalMinutes % 60,
  };
}
