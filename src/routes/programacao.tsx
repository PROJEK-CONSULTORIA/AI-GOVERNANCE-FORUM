import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/logo.png.asset.json";
import fabioAsset from "@/assets/fabio-martins.png.asset.json";

export const Route = createFileRoute("/programacao")({
  head: () => ({
    meta: [
      { title: "Programação — AI Governance Forum 2026" },
      {
        name: "description",
        content:
          "Confira a programação completa do AI Governance Forum 2026: trilhas, painéis, palestrantes, horários e temas sobre governança de Inteligência Artificial.",
      },
      { property: "og:title", content: "Programação — AI Governance Forum 2026" },
      {
        property: "og:description",
        content:
          "Dois dias de imersão executiva em governança de IA, divididos em trilhas de Estratégia, Riscos & Compliance e Ética & Inovação.",
      },
    ],
  }),
  component: Programacao,
});

type Session = {
  time: string;
  type: "keynote" | "painel" | "workshop" | "break" | "abertura";
  title: string;
  desc: string;
  speakers: { name: string; role: string }[];
  track: TrackKey | "all";
};

type TrackKey = "estrategia" | "riscos" | "etica";

const tracks: Record<TrackKey, { label: string; tag: string; color: string; desc: string }> = {
  estrategia: {
    label: "Estratégia & Liderança",
    tag: "T1",
    color: "#7AC143",
    desc: "Conselho, C-level e visão de longo prazo para a era da IA.",
  },
  riscos: {
    label: "Riscos, Compliance & Regulação",
    tag: "T2",
    color: "#F59E0B",
    desc: "LGPD, EU AI Act, ISO/IEC 42001, NIST AI RMF e auditoria algorítmica.",
  },
  etica: {
    label: "Ética, Dados & Inovação",
    tag: "T3",
    color: "#38BDF8",
    desc: "Responsabilidade algorítmica, qualidade de dados e o futuro do trabalho.",
  },
};

const day1: Session[] = [
  {
    time: "08:30",
    type: "break",
    title: "Credenciamento & Welcome Coffee",
    desc: "Recepção dos participantes e networking inicial entre lideranças.",
    speakers: [],
    track: "all",
  },
  {
    time: "09:30",
    type: "abertura",
    title: "Abertura Oficial — A década da Governança de IA",
    desc: "Boas-vindas e contexto estratégico do fórum. Por que governança será o principal diferenciador competitivo das organizações.",
    speakers: [
      { name: "Fábio Martins", role: "Anfitrião & Keynote Speaker" },
    ],
    track: "all",
  },
  {
    time: "10:00",
    type: "keynote",
    title: "Keynote — IA Generativa, Agentes Autônomos e o novo papel do líder",
    desc: "Como a próxima onda de IA redefine modelos de negócio, decisões executivas e a responsabilidade dos conselhos.",
    speakers: [{ name: "Fábio Martins", role: "Especialista em Governança & Transformação Digital" }],
    track: "estrategia",
  },
  {
    time: "11:15",
    type: "painel",
    title: "Painel — LGPD, EU AI Act e o cenário regulatório brasileiro",
    desc: "Mapeamento das principais regulamentações em vigor e em formação, com foco em conformidade prática para o Brasil.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "ANPD / Especialista em Privacidade" },
      { name: "Convidado(a) a confirmar", role: "Compliance Officer · Setor Financeiro" },
      { name: "Convidado(a) a confirmar", role: "Advogado(a) — Direito Digital" },
    ],
    track: "riscos",
  },
  {
    time: "12:30",
    type: "break",
    title: "Almoço Executivo",
    desc: "Mesas temáticas com troca de experiências entre setores público e privado.",
    speakers: [],
    track: "all",
  },
  {
    time: "14:00",
    type: "painel",
    title: "Painel — Ética, vieses e responsabilidade algorítmica",
    desc: "Como construir confiança e responsabilidade no ciclo de vida da IA, da concepção ao monitoramento contínuo.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "Pesquisador(a) em IA Responsável" },
      { name: "Convidado(a) a confirmar", role: "Head de Data Science · Indústria" },
      { name: "Convidado(a) a confirmar", role: "Líder de Diversidade & Inclusão" },
    ],
    track: "etica",
  },
  {
    time: "15:30",
    type: "painel",
    title: "Painel — ISO/IEC 42001 e NIST AI RMF na prática",
    desc: "Implementação dos frameworks internacionais de gestão de risco de IA em organizações brasileiras.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "CISO · Setor Bancário" },
      { name: "Convidado(a) a confirmar", role: "Consultoria Big Four — Risco & GRC" },
    ],
    track: "riscos",
  },
  {
    time: "17:00",
    type: "keynote",
    title: "Keynote — IA no setor público: governança, transparência e impacto social",
    desc: "Casos brasileiros de adoção responsável de IA em governo e organizações de interesse público.",
    speakers: [{ name: "Convidado(a) a confirmar", role: "Secretário(a) de Inovação" }],
    track: "estrategia",
  },
  {
    time: "18:30",
    type: "break",
    title: "Coquetel de Networking",
    desc: "Conexões estratégicas entre líderes, conselheiros e especialistas.",
    speakers: [],
    track: "all",
  },
];

const day2: Session[] = [
  {
    time: "08:30",
    type: "break",
    title: "Welcome Coffee",
    desc: "Reconexão e networking matinal.",
    speakers: [],
    track: "all",
  },
  {
    time: "09:00",
    type: "keynote",
    title: "Keynote — O Conselho diante da IA: novas competências para o board",
    desc: "Como conselheiros devem supervisionar estratégia, risco e ética em IA sem virar especialistas técnicos.",
    speakers: [{ name: "Convidado(a) a confirmar", role: "Conselheiro(a) de Administração" }],
    track: "estrategia",
  },
  {
    time: "10:15",
    type: "painel",
    title: "Painel — Segurança da Informação e ataques a sistemas de IA",
    desc: "Prompt injection, model poisoning, shadow AI e o que CISOs precisam priorizar agora.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "CISO · Big Tech" },
      { name: "Convidado(a) a confirmar", role: "Red Team — Pesquisa em IA Adversarial" },
      { name: "Convidado(a) a confirmar", role: "DPO — Saúde" },
    ],
    track: "riscos",
  },
  {
    time: "11:30",
    type: "workshop",
    title: "Workshop — Construindo seu Comitê de Governança de IA",
    desc: "Sessão prática (limitada a 40 participantes): papéis, ritos, indicadores e modelo de carta executiva.",
    speakers: [{ name: "Fábio Martins", role: "Facilitador" }],
    track: "estrategia",
  },
  {
    time: "12:30",
    type: "break",
    title: "Almoço Executivo",
    desc: "Mesas temáticas por setor: Financeiro, Saúde, Indústria, Varejo e Setor Público.",
    speakers: [],
    track: "all",
  },
  {
    time: "14:00",
    type: "painel",
    title: "Painel — Qualidade de dados, MLOps e auditoria contínua",
    desc: "A base técnica que sustenta qualquer programa sério de governança de IA.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "Chief Data Officer · Telecom" },
      { name: "Convidado(a) a confirmar", role: "Líder de MLOps · Fintech" },
    ],
    track: "etica",
  },
  {
    time: "15:30",
    type: "painel",
    title: "Painel — Futuro do trabalho e impacto organizacional da IA",
    desc: "Reorganização de times, novas carreiras, requalificação e o papel do RH na era dos agentes.",
    speakers: [
      { name: "Convidado(a) a confirmar", role: "CHRO · Multinacional" },
      { name: "Convidado(a) a confirmar", role: "Futurista do Trabalho" },
      { name: "Convidado(a) a confirmar", role: "Líder Sindical" },
    ],
    track: "etica",
  },
  {
    time: "17:00",
    type: "keynote",
    title: "Keynote de Encerramento — Liderar na incerteza",
    desc: "Síntese dos dois dias e um chamado à ação para os líderes que estão construindo o próximo capítulo da economia digital.",
    speakers: [{ name: "Fábio Martins", role: "Encerramento" }],
    track: "all",
  },
  {
    time: "18:00",
    type: "break",
    title: "Encerramento & Brinde Executivo",
    desc: "Confraternização final e entrega de certificados.",
    speakers: [],
    track: "all",
  },
];

const typeStyle: Record<Session["type"], { label: string; bg: string }> = {
  abertura: { label: "Abertura", bg: "bg-primary/15 text-primary border-primary/30" },
  keynote: { label: "Keynote", bg: "bg-primary/15 text-primary border-primary/30" },
  painel: { label: "Painel", bg: "bg-sky-400/15 text-sky-300 border-sky-400/30" },
  workshop: { label: "Workshop", bg: "bg-amber-400/15 text-amber-300 border-amber-400/30" },
  break: { label: "Intervalo", bg: "bg-muted text-muted-foreground border-border" },
};

function Programacao() {
  const [day, setDay] = useState<1 | 2>(1);
  const [activeTrack, setActiveTrack] = useState<TrackKey | "all">("all");

  const sessions = day === 1 ? day1 : day2;
  const filtered = sessions.filter(
    (s) => activeTrack === "all" || s.track === activeTrack || s.track === "all"
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logoAsset.url}
              alt="AI Governance Forum"
              className="h-12 w-auto bg-white rounded-md p-1.5"
            />
          </Link>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
              Início
            </Link>
            <Link to="/programacao" className="text-primary font-semibold">
              Programação
            </Link>
            <Link to="/" hash="palestrantes" className="text-muted-foreground hover:text-primary transition-colors">
              Palestrantes
            </Link>
            <Link to="/" hash="local" className="text-muted-foreground hover:text-primary transition-colors">
              Local
            </Link>
            <Link to="/" hash="ingressos" className="text-muted-foreground hover:text-primary transition-colors">
              Ingressos
            </Link>
          </nav>
          <Link
            to="/"
            hash="ingressos"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
          >
            Garantir ingresso
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pb-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src={fabioAsset.url}
            alt=""
            aria-hidden
            className="absolute right-0 bottom-0 h-full w-auto object-contain object-bottom opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/70" />
          <div
            className="absolute -left-32 top-10 h-[400px] w-[400px] rounded-full blur-3xl opacity-25"
            style={{ background: "#7AC143" }}
          />
        </div>
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
            Programação · Edição 2026
          </p>
          <h1 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05] max-w-3xl">
            Dois dias. Três trilhas.{" "}
            <span className="text-primary">Uma agenda densa</span> sobre Governança de IA.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            Painéis, keynotes e workshops com líderes, conselheiros, reguladores e especialistas
            que estão definindo o padrão brasileiro de governança em Inteligência Artificial.
          </p>

          {/* Tracks legend */}
          <div className="mt-10 grid sm:grid-cols-3 gap-4 max-w-4xl">
            {(Object.keys(tracks) as TrackKey[]).map((k) => {
              const t = tracks[k];
              return (
                <div
                  key={k}
                  className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: `${t.color}22`, color: t.color }}
                    >
                      {t.tag}
                    </span>
                    <p className="font-semibold text-sm">{t.label}</p>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Controls */}
      <section className="sticky top-20 z-40 backdrop-blur-xl bg-background/85 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex rounded-full border border-border bg-card p-1">
            {[1, 2].map((d) => (
              <button
                key={d}
                onClick={() => setDay(d as 1 | 2)}
                className={[
                  "px-5 py-2 rounded-full text-sm font-semibold transition",
                  day === d
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                Dia {d} <span className="opacity-60 ml-1">· {d === 1 ? "Qua" : "Qui"}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveTrack("all")}
              className={[
                "px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition",
                activeTrack === "all"
                  ? "bg-foreground text-background border-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              Todas trilhas
            </button>
            {(Object.keys(tracks) as TrackKey[]).map((k) => {
              const t = tracks[k];
              const active = activeTrack === k;
              return (
                <button
                  key={k}
                  onClick={() => setActiveTrack(k)}
                  className="px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border transition"
                  style={
                    active
                      ? { backgroundColor: t.color, borderColor: t.color, color: "#0b0b0b" }
                      : { borderColor: "var(--border)", color: "var(--muted-foreground)" }
                  }
                >
                  {t.tag} · {t.label.split(" ")[0]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sessions */}
      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Dia {day}
              </p>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold">
                {day === 1
                  ? "Fundamentos, regulamentação e visão executiva"
                  : "Operação, segurança e o futuro do trabalho"}
              </h2>
            </div>
            <p className="text-xs text-muted-foreground hidden sm:block">
              Horário de Brasília · sujeito a ajustes
            </p>
          </div>

          <div className="grid gap-5">
            {filtered.map((s, idx) => {
              const trackInfo = s.track !== "all" ? tracks[s.track] : null;
              const isBreak = s.type === "break";
              return (
                <article
                  key={idx}
                  className={[
                    "group relative rounded-3xl border bg-card/60 hover:bg-card transition overflow-hidden",
                    isBreak ? "border-border/60" : "border-border hover:border-primary/50",
                  ].join(" ")}
                >
                  {trackInfo && (
                    <span
                      className="absolute left-0 top-0 bottom-0 w-1.5"
                      style={{ backgroundColor: trackInfo.color }}
                      aria-hidden
                    />
                  )}
                  <div className="grid lg:grid-cols-[180px_1fr] gap-6 p-6 lg:p-8">
                    {/* Time */}
                    <div className="flex lg:flex-col items-baseline lg:items-start gap-3">
                      <span className="font-mono text-2xl lg:text-3xl font-bold text-foreground">
                        {s.time}
                      </span>
                      <span
                        className={[
                          "inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border",
                          typeStyle[s.type].bg,
                        ].join(" ")}
                      >
                        {typeStyle[s.type].label}
                      </span>
                    </div>

                    {/* Body */}
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {trackInfo ? (
                          <span
                            className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: `${trackInfo.color}1f`,
                              color: trackInfo.color,
                            }}
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: trackInfo.color }}
                            />
                            {trackInfo.tag} · {trackInfo.label}
                          </span>
                        ) : (
                          <span className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                            Plenária
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-bold leading-tight">{s.title}</h3>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-3xl">
                        {s.desc}
                      </p>

                      {s.speakers.length > 0 && (
                        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                          {s.speakers.map((sp) => (
                            <li
                              key={sp.name + sp.role}
                              className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/40 p-3"
                            >
                              <span className="h-10 w-10 shrink-0 rounded-full bg-primary/15 text-primary flex items-center justify-center text-sm font-bold">
                                {sp.name
                                  .split(" ")
                                  .slice(0, 2)
                                  .map((n) => n[0])
                                  .join("")}
                              </span>
                              <div className="min-w-0">
                                <p className="text-sm font-semibold truncate">{sp.name}</p>
                                <p className="text-[11px] text-muted-foreground truncate">
                                  {sp.role}
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-border bg-card/40">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Pronto para construir a governança de IA da sua organização?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Vagas limitadas para preservar o caráter executivo do encontro.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/"
              hash="ingressos"
              className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Garantir meu ingresso
            </Link>
            <Link
              to="/"
              hash="contato"
              className="rounded-full border border-border bg-background/60 px-7 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition"
            >
              Falar com a organização
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}