import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/logo-dark.png.asset.json";
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

const agenda: Session[] = [
  { time: "08h00", type: "break", title: "Credenciamento & Welcome Coffee", desc: "Recepção dos participantes, networking e visita aos estandes dos patrocinadores.", speakers: [], track: "all" },
  { time: "09h00", type: "abertura", title: "Cerimônia de Abertura", desc: "Boas-vindas da organização e apresentação dos objetivos do AI Governance Forum.", speakers: [], track: "all" },
  { time: "09h20", type: "keynote", title: "Palestra Magna — Governança de IA: o principal desafio estratégico da próxima década", desc: "Visão executiva sobre os impactos da IA nas organizações, os desafios da governança e as tendências regulatórias nacionais e internacionais. Duração: 40 minutos.", speakers: [{ name: "Fábio Martins", role: "Keynote Speaker · Governança & Transformação Digital" }], track: "estrategia" },
  { time: "10h00", type: "painel", title: "Painel 1 — Governança de IA na Indústria", desc: "Automação inteligente e produtividade · Segurança operacional · IA na cadeia produtiva · ESG e sustentabilidade · Gestão de riscos industriais. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Lideranças do setor industrial" }], track: "estrategia" },
  { time: "10h30", type: "painel", title: "Painel 2 — Governança de IA em Serviços", desc: "Atendimento inteligente · Experiência do cliente · Automação de processos · IA aplicada aos negócios · Governança e qualidade dos serviços. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Lideranças de serviços e CX" }], track: "estrategia" },
  { time: "11h00", type: "painel", title: "Painel 3 — Governança de IA na Saúde", desc: "IA no apoio ao diagnóstico · Ética e responsabilidade clínica · Segurança de dados · LGPD · IA e medicina personalizada. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Lideranças da saúde, DPOs e médicos" }], track: "riscos" },
  { time: "11h30", type: "painel", title: "Painel 4 — Governança de IA no Agronegócio", desc: "Agricultura de precisão · Monitoramento inteligente · IA aplicada ao campo · Sustentabilidade · Eficiência operacional. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Executivos do agronegócio" }], track: "estrategia" },
  { time: "12h00", type: "break", title: "Almoço & Networking", desc: "Momento dedicado ao relacionamento entre participantes, palestrantes, patrocinadores e convidados, com visitas aos estandes e demonstrações de soluções em IA. Duração: 2 horas.", speakers: [], track: "all" },
  { time: "14h00", type: "painel", title: "Painel 5 — Governança de IA na Mineração", desc: "Segurança operacional · Monitoramento ambiental · IA para mineração inteligente · ESG · Gestão de riscos. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Lideranças da mineração" }], track: "riscos" },
  { time: "14h30", type: "painel", title: "Painel 6 — Governança de IA no Entretenimento e Economia Criativa", desc: "IA generativa · Direitos autorais · Conteúdo sintético · Criatividade assistida por IA · Ética e propriedade intelectual. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Lideranças criativas e jurídicas" }], track: "etica" },
  { time: "15h00", type: "painel", title: "Painel 7 — Inovação, Startups e o Futuro da Inteligência Artificial", desc: "Ecossistema de inovação · Startups de IA · Novos modelos de negócio · Venture Capital · IA como diferencial competitivo. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Founders, investidores e hubs de inovação" }], track: "etica" },
  { time: "15h30", type: "painel", title: "Painel 8 — Governança de IA no Setor Público e Sistema de Justiça", desc: "Poder Judiciário · Ministério Público · Executivo · Transparência algorítmica · IA para melhoria dos serviços públicos. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Magistrados, MP e gestores públicos" }], track: "riscos" },
  { time: "16h00", type: "painel", title: "Painel 9 — O Futuro da Governança de Inteligência Artificial", desc: "Regulamentação da IA · Soberania Digital · Liderança na Era da IA · Competências do futuro · Papel dos conselhos e da alta administração. Duração: 30 minutos.", speakers: [{ name: "Painelistas a confirmar", role: "Conselheiros e especialistas em regulação" }], track: "estrategia" },
  { time: "16h30", type: "keynote", title: "Keynote de Encerramento — Liderando Organizações na Era da Inteligência Artificial", desc: "Uma reflexão sobre como executivos, conselheiros e gestores devem preparar suas organizações para um futuro orientado por Inteligência Artificial, inovação e governança. Duração: 40 minutos.", speakers: [{ name: "Fábio Martins", role: "Encerramento" }], track: "all" },
  { time: "17h10", type: "break", title: "Encerramento Oficial", desc: "Síntese dos principais insights do Fórum · Agradecimentos aos palestrantes, patrocinadores e participantes · Convite para a próxima edição do AI Governance Forum.", speakers: [], track: "all" },
];

const typeStyle: Record<Session["type"], { label: string; bg: string }> = {
  abertura: { label: "Abertura", bg: "bg-primary/15 text-primary border-primary/30" },
  keynote: { label: "Keynote", bg: "bg-primary/15 text-primary border-primary/30" },
  painel: { label: "Painel", bg: "bg-sky-400/15 text-sky-300 border-sky-400/30" },
  workshop: { label: "Workshop", bg: "bg-amber-400/15 text-amber-300 border-amber-400/30" },
  break: { label: "Intervalo", bg: "bg-muted text-muted-foreground border-border" },
};

function Programacao() {
  const [activeTrack, setActiveTrack] = useState<TrackKey | "all">("all");

  const filtered = agenda.filter(
    (s) => activeTrack === "all" || s.track === activeTrack || s.track === "all"
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 h-32 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logoAsset.url}
              alt="AI Governance Forum"
              className="h-28 w-auto rounded-md"
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
            Um dia. Nove painéis.{" "}
            <span className="text-primary">Uma agenda densa</span> sobre Governança de IA.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            12 de novembro de 2026, presencial no Hotel Quality Salvador. Palestra magna, nove
            painéis setoriais e keynote de encerramento com líderes, conselheiros, reguladores
            e especialistas em Governança de Inteligência Artificial.
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
      <section className="sticky top-32 z-40 backdrop-blur-xl bg-background/85 border-b border-border">
        <div className="mx-auto max-w-6xl px-6 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-3 rounded-full border border-border bg-card px-5 py-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm font-semibold">12 de novembro de 2026 · Hotel Quality Salvador</span>
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
                Agenda do dia
              </p>
              <h2 className="mt-3 text-3xl lg:text-4xl font-bold">
                Nove painéis setoriais, duas keynotes e networking executivo.
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