import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Mail,
  Network,
  PanelsTopLeft,
  Phone,
  Rocket,
  Scale,
  UsersRound,
} from "lucide-react";
import { SaveTheDateBanner, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Countdown2027 } from "@/components/countdown-2027";
import publicoAsset from "@/assets/salvador-2026-publico.jpg.asset.json";
import logoLight from "@/assets/logo-horizontal-light.png";
import { assetUrl } from "@/lib/asset-url";

const publicoUrl = assetUrl(publicoAsset.url);

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sobre — AI Governance Forum" },
      {
        name: "description",
        content:
          "Conheça o AI Governance Forum e reserve as datas de Salvador 2027: 23 e 24 de setembro de 2027, com contagem regressiva para a nova edição.",
      },
      { property: "og:title", content: "Sobre — AI Governance Forum" },
      {
        property: "og:description",
        content:
          "Governança, inteligência, conexão e futuro: conheça o propósito do AI Governance Forum e suas edições em Salvador.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ethical-ai-forum.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ethical-ai-forum.lovable.app/" }],
  }),
  component: SobrePage,
});

const pillars = [
  {
    icon: Scale,
    title: "Governança",
    text: "Responsabilidade, direção, controle e tomada de decisão no uso da Inteligência Artificial.",
  },
  {
    icon: BrainCircuit,
    title: "Inteligência",
    text: "Conhecimento, análise, tecnologia e capacidade de antecipação para orientar escolhas organizacionais.",
  },
  {
    icon: Network,
    title: "Conexão",
    text: "O encontro entre empresas, instituições públicas, especialistas, reguladores e lideranças.",
  },
  {
    icon: Rocket,
    title: "Futuro",
    text: "Preparação para uma economia cada vez mais impactada pela Inteligência Artificial.",
  },
];

const audiences = [
  "Presidentes, conselheiros e executivos",
  "Gestores públicos e privados",
  "Profissionais de tecnologia, dados e inovação",
  "Especialistas em riscos, compliance e direito",
  "Reguladores, pesquisadores e instituições",
  "Empreendedores e líderes de transformação digital",
];

function SobrePage() {
  return (
    <div className="light-theme min-h-screen bg-background text-foreground">
      <SaveTheDateBanner />
      <SiteHeader variant="light" active="sobre" withSaveTheDate />

      <main>
        <section className="relative overflow-hidden border-b border-border pt-36">
          <div className="brand-grid pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 opacity-45 lg:block" />
          <div className="relative mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-28">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Sobre o AI Governance Forum</p>
              <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                O Futuro da IA começa pela <span className="text-primary">Governança.</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Um espaço de diálogo e decisão para quem conduz a adoção da Inteligência Artificial nas organizações.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  to="/salvador-2027"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Conheça Salvador 2027
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </Link>
                <Link
                  to="/edicoes/salvador-2026"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Reveja a edição 2026
                </Link>
              </div>
              <div className="mt-10">
                <Countdown2027 />
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-5 -top-5 h-full w-full border border-primary" aria-hidden />
              <div className="relative flex min-h-80 flex-col justify-between border border-border bg-background p-8 sm:p-10">
                <img src={logoLight} alt="AI Governance Forum" className="w-full" />
                <div className="mt-12 border-t border-border pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Nosso compromisso</p>
                  <p className="mt-3 text-2xl font-semibold leading-snug">
                    Menos elementos.<br />Mais autoridade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">O que é</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.025em] lg:text-5xl">
                Um fórum sobre decisões, não apenas sobre tecnologia.
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                O AI Governance Forum conecta líderes, executivos, especialistas, empresas, instituições públicas,
                reguladores e profissionais responsáveis pelas decisões que moldam o uso da Inteligência Artificial.
              </p>
              <p>
                O encontro aproxima visões de negócio, governo, tecnologia e sociedade para discutir como inovar com
                responsabilidade, segurança, ética e propósito. A programação combina experiência prática, debates
                setoriais e conexões que ajudam organizações a transformar princípios em ação.
              </p>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-7xl border-y border-border px-6 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar, index) => (
              <article key={pillar.title} className="border-b border-border py-8 sm:border-b-0 sm:px-8 sm:first:pl-0 lg:border-r lg:last:border-r-0">
                <div className="flex items-center justify-between">
                  <pillar.icon className="h-7 w-7 text-primary" strokeWidth={1.4} />
                  <span className="text-xs font-semibold tracking-widest text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-y border-border bg-muted/55 py-24 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Como acontece</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.025em]">Conhecimento, debate e conexão.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Diferentes formatos aproximam referências e tornam a governança de IA uma conversa aplicável à realidade das organizações.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: PanelsTopLeft,
                  title: "Palestras e keynotes",
                  text: "Visões estratégicas e experiências de especialistas sobre os desafios que definem a era da IA.",
                },
                {
                  icon: UsersRound,
                  title: "Painéis setoriais",
                  text: "Diferentes perspectivas sobre regulação, dados, segurança, pessoas, inovação e transformação.",
                },
                {
                  icon: Network,
                  title: "Networking executivo",
                  text: "Encontros e conversas que fortalecem o ecossistema e criam novas oportunidades de colaboração.",
                },
              ].map((item) => (
                <article key={item.title} className="border border-border bg-background p-8">
                  <item.icon className="h-8 w-8 text-primary" strokeWidth={1.4} />
                  <h3 className="mt-8 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Para quem</p>
              <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-[-0.025em] lg:text-5xl">
                Quem decide precisa participar da conversa.
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                O fórum reúne os diferentes papéis envolvidos na construção de uma Inteligência Artificial útil, confiável e responsável.
              </p>
            </div>
            <ul className="border-t border-border">
              {audiences.map((audience, index) => (
                <li key={audience} className="flex items-center gap-5 border-b border-border py-5">
                  <span className="w-8 text-xs font-semibold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{audience}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-foreground py-20 text-background lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Próxima edição</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em] lg:text-5xl">AI Governance Forum Salvador 2027</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/70">
                Uma nova oportunidade para aproximar lideranças e avançar na construção de um futuro com IA responsável.
              </p>
            </div>
            <Link
              to="/salvador-2027"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Conhecer a próxima edição
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Edições anteriores</p>
                <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">A história já começou.</h2>
              </div>
              <Link to="/edicoes/salvador-2026" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
                Ver a edição completa <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
              </Link>
            </div>
            <Link to="/edicoes/salvador-2026" className="group grid overflow-hidden border border-border bg-background lg:grid-cols-2">
              <div className="overflow-hidden">
                <img
                  src={publicoUrl}
                  alt="Público do AI Governance Forum Salvador 2026"
                  className="h-full min-h-72 w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-14">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Salvador · 12 de novembro de 2026</p>
                <h3 className="mt-5 text-3xl font-semibold leading-tight">AI Governance Forum Salvador 2026</h3>
                <p className="mt-5 leading-relaxed text-muted-foreground">
                  A primeira edição reuniu tribunais, governo, indústria e empresas de tecnologia para discutir governança de IA.
                </p>
                <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Rever fotos, vídeos e programação <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
                </span>
              </div>
            </Link>
          </div>
        </section>

        <section id="contato" className="border-t border-border bg-muted/55 py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Contato</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">Converse com a organização.</h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                Para informações sobre as próximas edições, participação, imprensa ou patrocínio.
              </p>
            </div>
            <div className="space-y-4">
              <a href="mailto:fabio.martins@igovia.com.br" className="flex items-center gap-4 font-semibold hover:text-primary">
                <Mail className="h-5 w-5 text-primary" strokeWidth={1.4} /> fabio.martins@igovia.com.br
              </a>
              <a href="https://wa.me/5571988419093" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 font-semibold hover:text-primary">
                <Phone className="h-5 w-5 text-primary" strokeWidth={1.4} /> +55 (71) 9.8841.9093
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter variant="light" />
    </div>
  );
}
