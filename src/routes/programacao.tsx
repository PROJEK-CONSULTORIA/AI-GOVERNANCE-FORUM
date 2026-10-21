import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import logoAsset from "@/assets/logo-dark.png.asset.json";
import fabioAsset from "@/assets/fabio-martins.png.asset.json";
import jaimeAsset from "@/assets/jaime-gama.jpg.asset.json";
import { assetUrl } from "@/lib/asset-url";

const logoUrl = assetUrl(logoAsset.url);
const fabioUrl = assetUrl(fabioAsset.url);
const jaimeUrl = assetUrl(jaimeAsset.url);

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
          "Um dia de imersão executiva em governança de IA, com painéis sobre estratégia, riscos, compliance, ética e inovação.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
  featured?: { name: string; role: string; img: string; bio: string };
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
  { time: "09h00", type: "abertura", title: "Cerimônia de Abertura", desc: "Boas-vindas aos participantes, apresentação dos objetivos do AI Governance Forum e contextualização da importância estratégica da Governança de Inteligência Artificial para organizações públicas e privadas.", speakers: [{ name: "Fábio Martins", role: "Fundador e CEO do IGOV.IA" }], track: "all" },
  { time: "09h20", type: "keynote", title: "Palestra Magna de Abertura — Semantix AI Enterprise Suite: Governança, Segurança e Inteligência Artificial em Escala Empresarial", desc: "Apresentação da plataforma Semantix AI Enterprise Suite, que integra dados, Inteligência Artificial, orquestração e segurança. Destaque para o Safetix, módulo voltado à governança de IA e à conformidade regulatória, incluindo a abordagem relacionada ao Selo ABRIA de Governança de IA. A palestra abordará como plataformas tecnológicas podem apoiar a adoção, o controle e a expansão responsável da Inteligência Artificial nas organizações.", speakers: [{ name: "Pierre", role: "Semantix" }], track: "estrategia" },
  { time: "10h00", type: "painel", title: "Painel 1 — Indústria Inteligente: Pessoas, Dados e Inteligência Artificial", desc: "Como estruturar a governança da Inteligência Artificial para aumentar a produtividade, otimizar operações, fortalecer a gestão de riscos e impulsionar a competitividade industrial com segurança e responsabilidade.", speakers: [{ name: "Murilo Plínio", role: "Gerente de Tecnologia, SENAI/CIMATEC" }, { name: "Adhvan Furtado", role: "BULL" }, { name: "Adilson Pize", role: "Excellence Consulting" }], track: "estrategia" },
  { time: "10h30", type: "painel", title: "Painel 2 — Justiça, Ética e Regulação da IA: Direitos Fundamentais, Responsabilidade e Segurança Jurídica", desc: "Como o sistema de Justiça, a Defensoria Pública e a advocacia podem enfrentar os desafios do marco regulatório da Inteligência Artificial, conciliando inovação, ética, transparência, proteção de dados, gestão de riscos e preservação dos direitos fundamentais. O painel discutirá a responsabilização pelo uso da IA, os desafios de conformidade e os impactos da regulação no acesso à Justiça e na proteção dos cidadãos.", speakers: [{ name: "Profa. Maria Clara Seixas", role: "4S Advogados" }, { name: "Dr. Franco Bahia", role: "Defensoria Pública do Estado da Bahia (DPE/BA)" }], track: "riscos" },
  { time: "11h00", type: "painel", title: "Painel 3 — Governança de IA para Cidades e Estados Inteligentes: Inovação com Responsabilidade", desc: "Como utilizar a Inteligência Artificial para tornar cidades e estados mais eficientes, sustentáveis e centrados no cidadão, com governança, transparência, segurança, gestão de dados e decisões orientadas por evidências.", speakers: [{ name: "Luis Henrique de Magalhães Gaban", role: "SEMIT/Prefeitura de Salvador" }, { name: "Ricardo Fontoura", role: "CIO, DETRAN-BA" }, { name: "André Cavalcante", role: "Secretário de Tecnologia do TRE-BA" }], track: "estrategia" },
  { time: "11h30", type: "painel", title: "Painel 4 — Cibersegurança e Governança de IA: Desafios para Organizações Inteligentes", desc: "Como proteger dados, modelos e sistemas de IA por meio da governança, gestão de riscos, conformidade e cibersegurança, garantindo inovação com confiança e resiliência.", speakers: [{ name: "Andréa Campelo", role: "Fundadora e CEO da TecnoAtiva" }, { name: "Leandro Magalhães", role: "Gerente de TI da EMBASA" }, { name: "Tatyana Souza", role: "Gerente de TI da Santa Casa da Bahia" }], track: "riscos" },
  { time: "12h00", type: "break", title: "Almoço & Networking", desc: "Relacionamento entre participantes, palestrantes, patrocinadores e lideranças do ecossistema de inovação.", speakers: [], track: "all" },
  { time: "14h00", type: "painel", title: "Painel 5 — IA no Digital e Entretenimento: Criatividade, Inovação e Governança", desc: "Como a Inteligência Artificial está redefinindo a criação de conteúdo, a experiência do público e os modelos de negócio, exigindo uma governança que equilibre inovação, ética, proteção da propriedade intelectual e confiança no ecossistema digital.", speakers: [{ name: "Nélio Castro", role: "Especialista em IA, Rede Bahia" }], track: "etica" },
  { time: "14h30", type: "keynote", title: "Palestra Especial MongoDB — Ferramentas Tecnológicas para a Governança de Inteligência Artificial", desc: "Apresentação de ferramentas e recursos tecnológicos para apoiar a construção de aplicações de IA confiáveis, com destaque para dados, arquitetura, integração, segurança e escalabilidade. A palestra abordará como a infraestrutura tecnológica pode apoiar a governança e a gestão das soluções de Inteligência Artificial ao longo de seu ciclo de vida. (10 min)", speakers: [{ name: "MongoDB", role: "Palestra especial" }], track: "etica" },
  { time: "14h40", type: "keynote", title: "Palestra Especial PMI-BA — PMI-CPMAI: Certificação Profissional em Gestão de Inteligência Artificial e Inovação", desc: "Apresentação da certificação PMI-CPMAI (Cognitive Project Management in AI), voltada à gestão de projetos de Inteligência Artificial e baseada na metodologia CPMAI, incorporada ao PMI a partir da aquisição da Cognilytica. A palestra abordará a importância de uma abordagem estruturada para planejar, desenvolver e implementar projetos de IA, conectando gestão de projetos, dados, objetivos de negócio e entrega de valor. (10 min)", speakers: [{ name: "José Carlos Prates", role: "PMI-BA" }], track: "estrategia" },
  { time: "14h50", type: "keynote", title: "Palestra Especial: Certificação ISO/IEC 42001 — Como Estruturar um Sistema de Gestão de Inteligência Artificial nas Organizações", desc: "Apresentação da norma internacional ISO/IEC 42001, que estabelece requisitos para sistemas de gestão de Inteligência Artificial. A palestra destacará como a norma pode apoiar a definição de responsabilidades, a gestão de riscos, a melhoria contínua e a adoção responsável da IA, preparando as organizações para estruturar seus processos de governança e buscar certificação por organismos competentes. (10 min)", speakers: [{ name: "Leandro Pfeifer", role: "Palestrante" }], track: "riscos" },
  { time: "15h00", type: "keynote", title: "Palestra: Governança de Inteligência Artificial — As 10 Dimensões da Jornada de Adoção Tecnológica", desc: "Apresentação da metodologia IGOV.IA e de suas dez dimensões: 1. Estratégia e Governança; 2. Cultura, Pessoas e Comunicação; 3. Estrutura Tecnológica e Automação; 4. Investimentos, Custos e Despesas; 5. Qualidade dos Dados; 6. Impacto no Usuário Final; 7. Conformidade, Riscos e Ética; 8. Segurança da Informação; 9. Fornecedores e Integrações; 10. Monitoramento e Melhoria Contínua. A palestra demonstrará como organizar a adoção tecnológica de forma estruturada, conectando estratégia, pessoas, dados, riscos, tecnologia e resultados de negócio. (20 min)", speakers: [{ name: "Fábio Martins", role: "Fundador e CEO do IGOV.IA" }], track: "estrategia" },
  { time: "15h20", type: "painel", title: "Painel 6 — Inovação, Startups e o Futuro da IA", desc: "Como a Inteligência Artificial está redefinindo a inovação, impulsionando startups e criando novos modelos de negócio, com a governança como base para um crescimento sustentável, competitivo e responsável. O debate abordará a questão central: criar regras para a IA pode inibir a inovação ou a governança é o que permite às startups e empresas conquistar confiança, atrair investimentos e crescer de forma sustentável?", speakers: [{ name: "Alexandre Darzé", role: "LH Investimentos" }, { name: "Rodrigo Paolilo", role: "CEO do Grupo Rede Mais" }, { name: "Gabriel Salgado", role: "Executivo de Inovação do Banco do Nordeste" }, { name: "Fred Soares", role: "CEO da Exponencial Consultoria" }], track: "etica" },
  { time: "15h50", type: "painel", title: "Painel 7 — IA Começa pelos Dados: Qualidade, Governança e Inovação", desc: "Como a qualidade e a Governança de Dados sustentam o desenvolvimento de soluções de Inteligência Artificial confiáveis, impulsionando inovação, decisões estratégicas e geração de valor com segurança e responsabilidade. O painel discutirá as diferenças e complementaridades entre Governança de Dados e Governança de IA e como ambas contribuem para a confiabilidade das soluções.", speakers: [{ name: "Danilo Andrade", role: "Fundador e CEO da Horus CDA" }, { name: "Thales Almeida", role: "Superintendente de Inovação da SAEB" }, { name: "Ricardo Menezes", role: "Gerente de TI da Bahiagás" }], track: "riscos" },
  { time: "16h20", type: "painel", title: "Painel 8 — A IA e o Futuro do Trabalho: Pessoas, Comunidades e Culturas", desc: "Como a Inteligência Artificial está transformando a gestão de pessoas, a cultura organizacional e as competências do futuro, exigindo uma governança que promova inovação, desenvolvimento humano e liderança responsável.", speakers: [{ name: "Vitor Igdal", role: "Presidente da ABRH-BA" }, { name: "Ana Luiza", role: "Gerente Sênior de Pessoas & Organização, Região Nordeste, BRASKEM" }, { name: "Carlos Eduardo", role: "Gerente Nacional do Jurídico de Direito do Trabalho da Petrobras" }], track: "estrategia" },
  { time: "16h50", type: "keynote", title: "Keynote de Encerramento — Liderando Organizações na Era da IA", desc: "Como executivos, conselheiros e gestores devem preparar suas organizações para um futuro orientado por Inteligência Artificial, inovação e governança, fortalecendo a capacidade de adaptação, a liderança estratégica e a geração sustentável de valor. (40 min)", speakers: [], track: "all", featured: { name: "Jaime Gama", role: "Consultor, conselheiro executivo, professor e palestrante · Ex-Executive Partner do Gartner", img: jaimeUrl, bio: "Consultor, conselheiro executivo, professor e palestrante, com mais de 40 anos de experiência em tecnologia e negócios. Ex-Executive Partner do Gartner, possui formação multidisciplinar e atuação nacional e internacional em diversos setores." } },
  { time: "17h30", type: "break", title: "Encerramento Oficial", desc: "Síntese dos principais aprendizados, agradecimentos aos participantes, palestrantes e patrocinadores e convite para a próxima edição do AI Governance Forum.", speakers: [], track: "all" },
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
        <div className="mx-auto max-w-7xl px-6 h-44 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              src={logoUrl}
              alt="AI Governance Forum"
              className="h-56 w-auto rounded-md"
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
          <a
            href="https://www.sympla.com.br/evento/ai-governance-forum/3469406"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
          >
            Garantir ingresso
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative pt-44 pb-16 lg:pb-20 overflow-hidden border-b border-border">
        <div className="absolute inset-0 -z-10">
          <img
            src={fabioUrl}
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
            Um dia. Dez painéis.{" "}
            <span className="text-primary">Uma agenda densa</span> sobre Governança de IA.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl">
            12 de novembro de 2026, presencial no Hotel Quality Salvador. Palestra magna, dez
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
      <section className="sticky top-44 z-40 backdrop-blur-xl bg-background/85 border-b border-border">
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
                Dez painéis setoriais, duas keynotes e networking executivo.
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

                      {s.featured && (
                        <div className="mt-6 flex flex-col sm:flex-row items-start gap-5 rounded-2xl border border-primary/30 bg-primary/5 p-5">
                          <img
                            src={s.featured.img}
                            alt={s.featured.name}
                            className="h-28 w-28 shrink-0 rounded-2xl object-cover object-top ring-2 ring-primary/40"
                          />
                          <div>
                            <p className="text-base font-bold">{s.featured.name}</p>
                            <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-primary">
                              {s.featured.role}
                            </p>
                            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                              {s.featured.bio}
                            </p>
                          </div>
                        </div>
                      )}

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
            <a
              href="https://www.sympla.com.br/evento/ai-governance-forum/3469406"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Garantir meu ingresso
            </a>
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
