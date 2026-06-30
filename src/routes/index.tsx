import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-dark.png.asset.json";
import fabioAsset from "@/assets/fabio-martins.png.asset.json";
import { assetUrl } from "@/lib/asset-url";

const logoUrl = assetUrl(logoAsset.url);
const fabioUrl = assetUrl(fabioAsset.url);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Governance Forum — Governança em Inteligência Artificial" },
      {
        name: "description",
        content:
          "Encontro executivo sobre Governança de IA: estratégia, riscos, compliance, ética e regulamentação para líderes que conduzem a transformação digital.",
      },
      { property: "og:title", content: "AI Governance Forum" },
      {
        property: "og:description",
        content:
          "Encontro executivo sobre Governança de Inteligência Artificial para líderes e tomadores de decisão.",
      },
    ],
  }),
  component: Index,
});

const BRAND_GREEN = "#7AC143";

const navLinks = [
  { href: "#sobre", label: "Sobre" },
  { href: "#palestrantes", label: "Palestrantes" },
  { href: "#local", label: "Local" },
  { href: "#patrocinadores", label: "Patrocinadores" },
  { href: "#contato", label: "Contato" },
];

const schedule = [
  { time: "08h00", title: "Credenciamento & Welcome Coffee", desc: "Recepção dos participantes, networking e visita aos estandes dos patrocinadores." },
  { time: "09h00", title: "Cerimônia de Abertura", desc: "Boas-vindas da organização e apresentação dos objetivos do AI Governance Forum." },
  { time: "09h20", title: "Palestra Magna — Governança de IA: o principal desafio estratégico da próxima década", desc: "Visão executiva sobre impactos da IA, desafios da governança e tendências regulatórias nacionais e internacionais. (40 min)" },
  { time: "10h00", title: "Painel 1 — Governança de IA na Indústria", desc: "Automação inteligente, segurança operacional, IA na cadeia produtiva, ESG e gestão de riscos industriais." },
  { time: "10h30", title: "Painel 2 — Governança de IA em Serviços", desc: "Atendimento inteligente, experiência do cliente, automação de processos, IA aplicada aos negócios e qualidade dos serviços." },
  { time: "11h00", title: "Painel 3 — Governança de IA na Saúde", desc: "IA no apoio ao diagnóstico, ética e responsabilidade clínica, segurança de dados, LGPD e medicina personalizada." },
  { time: "11h30", title: "Painel 4 — Governança de IA no Agronegócio", desc: "Agricultura de precisão, monitoramento inteligente, IA aplicada ao campo, sustentabilidade e eficiência operacional." },
  { time: "12h00", title: "Almoço & Networking", desc: "Relacionamento entre participantes, palestrantes, patrocinadores e visitas aos estandes (2 horas)." },
  { time: "14h00", title: "Painel 5 — Governança de IA na Mineração", desc: "Segurança operacional, monitoramento ambiental, mineração inteligente, ESG e gestão de riscos." },
  { time: "14h30", title: "Painel 6 — Governança de IA no Entretenimento e Economia Criativa", desc: "IA generativa, direitos autorais, conteúdo sintético, criatividade assistida e propriedade intelectual." },
  { time: "15h00", title: "Painel 7 — Inovação, Startups e o Futuro da IA", desc: "Ecossistema de inovação, startups, novos modelos de negócio, venture capital e IA como diferencial competitivo." },
  { time: "15h30", title: "Painel 8 — Governança de IA no Setor Público e Sistema de Justiça", desc: "Judiciário, Ministério Público, Executivo, transparência algorítmica e melhoria dos serviços públicos." },
  { time: "16h00", title: "Painel 9 — O Futuro da Governança de IA", desc: "Regulamentação, soberania digital, liderança, competências do futuro e o papel dos conselhos." },
  { time: "16h30", title: "Keynote de Encerramento — Liderando Organizações na Era da IA", desc: "Como executivos, conselheiros e gestores devem preparar organizações para um futuro orientado por IA, inovação e governança. (40 min)" },
  { time: "17h10", title: "Encerramento Oficial", desc: "Síntese dos insights, agradecimentos e convite para a próxima edição do AI Governance Forum." },
];

const speakers = [
  {
    name: "Fábio Martins",
    role: "Keynote Speaker — Governança & Transformação Digital",
    img: fabioUrl,
  },
  {
    name: "A confirmar",
    role: "Compliance & Regulamentação de IA",
    img: null,
  },
  {
    name: "A confirmar",
    role: "Segurança da Informação & Riscos",
    img: null,
  },
  {
    name: "A confirmar",
    role: "Ética e Responsabilidade Algorítmica",
    img: null,
  },
];

const tickets = [
  {
    name: "Profissional",
    price: "R$ 1.490",
    perks: [
      "Acesso integral ao fórum",
      "Coffee breaks e almoço executivo",
      "Certificado de participação",
      "Material digital exclusivo",
    ],
    highlight: false,
  },
  {
    name: "Executivo",
    price: "R$ 2.490",
    perks: [
      "Tudo do Profissional",
      "Assento preferencial",
      "Acesso ao coquetel de networking VIP",
      "Reunião privada com palestrantes",
    ],
    highlight: true,
  },
  {
    name: "Corporativo (5+)",
    price: "Sob consulta",
    perks: [
      "Pacote para times de liderança",
      "Branding institucional opcional",
      "Sessão de mentoria privativa",
      "Condições especiais para grupos",
    ],
    highlight: false,
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top Nav */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
        <div className="mx-auto max-w-7xl px-6 h-44 flex items-center justify-between gap-6">
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <img
              src={logoUrl}
              alt="AI Governance Forum"
              className="h-56 w-auto rounded-md"
            />
          </a>
          <nav className="hidden lg:flex items-center gap-8 text-sm">
            <Link
              to="/programacao"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Programação
            </Link>
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <a
            href="#ingressos"
            className="inline-flex items-center rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
          >
            Garantir ingresso
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="top" className="relative min-h-screen flex items-end lg:items-center pt-32 overflow-hidden">
        {/* background photo */}
        <div className="absolute inset-0 -z-10">
          <img
            src={fabioUrl}
            alt="Fábio Martins, palestrante"
            className="absolute right-0 bottom-0 h-[95%] lg:h-[110%] w-auto object-contain object-bottom opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          <div
            className="absolute -left-40 top-1/3 h-[500px] w-[500px] rounded-full blur-3xl opacity-30"
            style={{ background: BRAND_GREEN }}
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 py-20 lg:py-32 w-full">
          <div className="max-w-2xl">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-primary"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
              Encontro Executivo · 2026
            </span>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05]">
              AI Governance Forum <span className="text-primary">2026</span>
            </h1>
            <p className="mt-6 text-xl text-foreground/90 max-w-xl font-medium">
              Governança de Inteligência Artificial: Liderança, Estratégia e Transformação dos Negócios.
            </p>
            <p className="mt-4 text-base text-muted-foreground max-w-xl">
              12 de novembro de 2026 · Presencial · Hotel Quality Salvador. Encontro executivo para
              presidentes, diretores, conselheiros, gestores públicos e privados e especialistas em
              inovação, tecnologia, riscos, compliance e transformação digital.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#ingressos"
                className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90 transition"
              >
                Garantir meu ingresso
              </a>
              <Link
                to="/programacao"
                className="rounded-full border border-border bg-background/60 px-7 py-3.5 text-sm font-semibold hover:border-primary hover:text-primary transition"
              >
                Ver programação
              </Link>
            </div>
            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              {[
                ["09", "painéis"],
                ["20+", "palestrantes"],
                ["1 dia", "imersivo"],
              ].map(([k, v]) => (
                <div key={v}>
                  <dt className="text-3xl font-bold text-primary">{k}</dt>
                  <dd className="text-xs uppercase tracking-wider text-muted-foreground mt-1">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Sobre o fórum</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold">
            Mais do que tecnologia, um espaço estratégico de decisão.
          </h2>
          <div className="mt-8 grid lg:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
            <p>
              O AI Governance Forum é um encontro executivo criado para reunir líderes, executivos,
              gestores, conselheiros, especialistas e tomadores de decisão que estão conduzindo a
              transformação digital em suas organizações. Mais do que um evento sobre tecnologia, é
              um espaço para discutir como a Inteligência Artificial pode ser adotada de forma
              segura, ética, responsável e alinhada aos objetivos institucionais.
            </p>
            <p>
              Especialistas nacionais e convidados compartilham experiências, tendências e casos
              práticos abordando estratégia, gestão de riscos, compliance, ética, segurança da
              informação, qualidade de dados, regulamentação, impacto organizacional, inovação e o
              futuro do trabalho na era da IA — preparando lideranças para decisões mais
              conscientes.
            </p>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              "Estratégia & Liderança",
              "Riscos & Compliance",
              "Ética & Regulação",
              "Segurança & Dados",
            ].map((tag) => (
              <div
                key={tag}
                className="rounded-2xl border border-border bg-card p-5 hover:border-primary/60 transition"
              >
                <div className="h-1 w-8 rounded-full bg-primary" />
                <p className="mt-4 font-semibold">{tag}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programação */}
      <section id="programacao" className="py-24 lg:py-32 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-end justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Programação</p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Um dia denso, do board ao operacional.</h2>
            </div>
            <p className="text-sm text-muted-foreground">Programação preliminar · sujeita a ajustes.</p>
          </div>

          <ol className="mt-12 relative border-l border-border/70 ml-3">
            {schedule.map((item) => (
              <li key={item.time} className="pl-8 pb-10 last:pb-0 relative">
                <span className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-primary ring-4 ring-background" />
                <div className="flex flex-wrap items-baseline gap-4">
                  <span className="font-mono text-primary text-sm font-semibold">{item.time}</span>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground max-w-2xl">{item.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Palestrantes */}
      <section id="palestrantes" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Palestrantes</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Quem conduz a conversa.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Especialistas e executivos que já implementam governança de IA em organizações públicas
            e privadas.
          </p>

          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {speakers.map((s, i) => (
              <article
                key={i}
                className="group rounded-3xl overflow-hidden border border-border bg-card hover:border-primary/60 transition"
              >
                <div className="aspect-[4/5] bg-secondary relative overflow-hidden">
                  {s.img ? (
                    <img
                      src={s.img}
                      alt={s.name}
                      className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl text-muted-foreground/40 font-bold">
                      ?
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{s.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Local */}
      <section id="local" className="py-24 lg:py-32 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Local & Data</p>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Um ambiente à altura de quem decide.</h2>
            <p className="mt-6 text-muted-foreground">
              O fórum acontece em espaço executivo selecionado, com infraestrutura completa para
              painéis, networking estratégico e reuniões privativas entre lideranças.
            </p>
            <dl className="mt-8 space-y-5">
              <div className="flex gap-4">
                <span className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">📍</span>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-muted-foreground">Endereço</dt>
                  <dd className="font-semibold">Hotel Quality Salvador · Salvador — BA</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">📅</span>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-muted-foreground">Data</dt>
                  <dd className="font-semibold">12 de novembro de 2026</dd>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="h-10 w-10 rounded-full bg-primary/15 flex items-center justify-center text-primary">⏱</span>
                <div>
                  <dt className="text-sm uppercase tracking-wider text-muted-foreground">Formato</dt>
                  <dd className="font-semibold">Presencial · 08h00 às 17h10</dd>
                </div>
              </div>
            </dl>
          </div>
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-border">
            <iframe
              title="Mapa"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-38.49%2C-12.99%2C-38.45%2C-12.97&layer=mapnik&marker=-12.98%2C-38.47"
              className="w-full h-full grayscale contrast-125"
              loading="lazy"
            />
            <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-primary/10" />
          </div>
        </div>
      </section>

      {/* Ingressos */}
      <section id="ingressos" className="py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ingressos</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Garanta seu lugar.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Vagas limitadas para preservar o caráter executivo do encontro.
          </p>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {tickets.map((t) => (
              <div
                key={t.name}
                className={[
                  "relative rounded-3xl p-8 border transition",
                  t.highlight
                    ? "bg-primary text-primary-foreground border-primary shadow-2xl shadow-primary/20 lg:-translate-y-4"
                    : "bg-card border-border hover:border-primary/60",
                ].join(" ")}
              >
                {t.highlight && (
                  <span className="absolute top-5 right-5 text-[10px] font-bold uppercase tracking-widest bg-primary-foreground/15 px-3 py-1 rounded-full">
                    Mais procurado
                  </span>
                )}
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="mt-4 text-4xl font-bold">{t.price}</p>
                <ul className="mt-6 space-y-3 text-sm">
                  {t.perks.map((p) => (
                    <li key={p} className="flex gap-3">
                      <span className={t.highlight ? "text-primary-foreground" : "text-primary"}>✓</span>
                      <span className={t.highlight ? "" : "text-muted-foreground"}>{p}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contato"
                  className={[
                    "mt-8 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-semibold transition",
                    t.highlight
                      ? "bg-primary-foreground text-primary hover:opacity-90"
                      : "bg-primary text-primary-foreground hover:opacity-90",
                  ].join(" ")}
                >
                  Quero participar
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patrocinadores */}
      <section id="patrocinadores" className="py-24 lg:py-32 bg-card/40 border-y border-border">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Patrocinadores</p>
          <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Marcas que apoiam a discussão.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Conecte sua marca a um público de decisores qualificados em governança, riscos e
            inovação.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-xl border border-dashed border-border bg-background/40 flex items-center justify-center text-xs uppercase tracking-widest text-muted-foreground/60"
              >
                Sua marca
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-primary/40 bg-primary/5 p-8 lg:p-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold">Seja patrocinador do AI Governance Forum</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Cotas de patrocínio com diferentes níveis de exposição e ativação.
              </p>
            </div>
            <a
              href="#contato"
              className="rounded-full bg-primary text-primary-foreground px-7 py-3.5 text-sm font-semibold hover:opacity-90"
            >
              Solicitar cotas
            </a>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Contato</p>
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Fale com a organização.</h2>
              <p className="mt-6 text-muted-foreground">
                Tire dúvidas sobre inscrições, lotes corporativos, palestras ou oportunidades de
                patrocínio.
              </p>
              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider">E-mail</span>
                  <a href="mailto:contato@aigovernanceforum.com.br" className="font-semibold text-foreground hover:text-primary">
                    contato@aigovernanceforum.com.br
                  </a>
                </li>
                <li>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider">WhatsApp</span>
                  <span className="font-semibold">+55 (11) 0000-0000</span>
                </li>
              </ul>
            </div>
            <ClientOnly fallback={<div className="rounded-3xl border border-border bg-card p-6 lg:p-8 h-48 animate-pulse" aria-hidden />}>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="rounded-3xl border border-border bg-card p-6 lg:p-8 space-y-4"
              >
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Nome</label>
                  <input
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    placeholder="Seu nome"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">E-mail corporativo</label>
                  <input
                    type="email"
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary"
                    placeholder="voce@empresa.com"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted-foreground">Mensagem</label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary resize-none"
                    placeholder="Como podemos ajudar?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
                >
                  Enviar mensagem
                </button>
              </form>
            </ClientOnly>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-10">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="AI Governance Forum" className="h-16 w-auto rounded" />
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} AI Governance Forum. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
