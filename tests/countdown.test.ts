import { describe, expect, it } from "bun:test";
import { COUNTDOWN_TARGET_ISO, getCountdownParts } from "../src/lib/countdown";

describe("contagem regressiva Salvador 2027", () => {
  it("usa 23 de setembro de 2027 no horário de Brasília", () => {
    expect(COUNTDOWN_TARGET_ISO).toBe("2027-09-23T00:00:00-03:00");
  });

  it("calcula dias, horas e minutos até o início", () => {
    const now = Date.parse("2027-09-20T22:30:00-03:00");
    expect(getCountdownParts(now)).toEqual({ days: 2, hours: 1, minutes: 30 });
  });

  it("mantém a contagem em zero depois do início", () => {
    const now = Date.parse("2027-09-24T12:00:00-03:00");
    expect(getCountdownParts(now)).toEqual({ days: 0, hours: 0, minutes: 0 });
  });
});
