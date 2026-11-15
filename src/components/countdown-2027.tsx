import { useEffect, useState } from "react";
import { getCountdownParts, type CountdownParts } from "@/lib/countdown";

export function Countdown2027() {
  const [countdown, setCountdown] = useState<CountdownParts | null>(null);

  useEffect(() => {
    const update = () => setCountdown(getCountdownParts(Date.now()));
    update();
    const interval = window.setInterval(update, 1_000);
    return () => window.clearInterval(interval);
  }, []);

  const units = [
    { label: "dias", value: countdown?.days },
    { label: "horas", value: countdown?.hours },
    { label: "minutos", value: countdown?.minutes },
    { label: "segundos", value: countdown?.seconds },
  ];

  return (
    <div className="max-w-lg" role="timer" aria-label="Contagem regressiva para 23 de setembro de 2027">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
        Contagem regressiva para 23 de setembro de 2027
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {units.map((unit) => (
          <div key={unit.label} className="border border-border bg-background px-4 py-5 text-center">
            <span className="block text-3xl font-bold tabular-nums tracking-[-0.04em] text-foreground sm:text-4xl">
              {unit.value === undefined ? "—" : String(unit.value).padStart(2, "0")}
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
