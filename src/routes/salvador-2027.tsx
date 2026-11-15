import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, CalendarDays, Mail, MapPin, PanelsTopLeft, Phone } from "lucide-react";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Countdown2027 } from "@/components/countdown-2027";
import logoDark from "@/assets/logo-horizontal-dark.png";

export const Route = createFileRoute("/salvador-2027")({
  head: () => ({
    meta: [
      { title: "AI Governance Forum Salvador 2027" },
      {
        name: "description",
        content:
          "AI Governance Forum Salvador 2027: 23 e 24 de setembro de 2027 no Quality Hotel & Suítes São Salvador (Stiep), Salvador – BA. Acompanhe a contagem regressiva e fale com a organização.",
      },
      { property: "og:title", content: "AI Governance Forum Salvador 2027" },
      {
        property: "og:description",
        content:
          "Save the Date: 23 e 24 de setembro de 2027. A próxima edição conectará lideranças para discutir governança, estratégia, ética e inovação em IA.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://ethical-ai-forum.lovable.app/salvador-2027" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://ethical-ai-forum.lovable.app/salvador-2027" }],
  }),
  component: Salvador2027Page,
});

const contactLink = "mailto:fabio.martins@igovia.com.br?subject=AI%20Governance%20Forum%20Salvador%202027";

const venueName = "Quality Hotel & Suítes São Salvador";
const venueStreet = "Rua Dr. José Peroba, 244 – Stiep";
const venueCity = "Salvador – BA · CEP 41770-235";
const venueMapsUrl =
  "https://www.google.com/maps/search/?api=1&query=Quality%20Hotel%20%26%20Su%C3%ADtes%20S%C3%A3o%20Salvador%2C%20Rua%20Dr.%20Jos%C3%A9%20Peroba%2C%20244%20-%20Stiep%2C%20Salvador%20-%20BA%2C%20CEP%2041770-235";
const venueEmbedUrl =
  "https://www.google.com/maps?q=Rua%20Dr.%20Jos%C3%A9%20Peroba%2C%20244%20-%20Stiep%2C%20Salvador%20-%20BA%2C%2041770-235&output=embed";

const themes = [
  {
    number: "01",
    title: "Estratégia e liderança",
    text: "Discussões sobre direção, tomada de decisão e o papel das lideranças na adoção responsável da Inteligência Artificial.",
  },
  {
    number: "02",
    title: "Riscos, ética e regulação",
    text: "Conversas sobre confiança, conformidade, direitos, segurança e os limites necessários para inovar com responsabilidade.",
  },
  {
    number: "03",
    title: "Dados, pessoas e inovação",
    text: "Conexões entre tecnologia, qualidade de dados, cultura organizacional, futuro do trabalho e novos modelos de negócio.",
  },
];

function Salvador2027Page() {
  return (
    <div className="light-theme min-h-screen bg-background text-foreground">
      <SiteHeader variant="light" active="salvador-2027" />

      <main>
        <section className="relative overflow-hidden border-b border-border pt-24">
          <div className="brand-grid pointer-events-none absolute inset-0 opacity-35" />
          <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:py-28">
            <div>
              <div className="inline-flex items-center gap-3 border border-primary/40 bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Save the Date · Salvador
              </div>
              <h1 className="mt-7 max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
                AI Governance Forum <span className="text-primary">Salvador 2027</span>
              </h1>
              <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted-foreground">
                Uma nova edição do encontro que conecta pessoas, organizações e ideias para construir o futuro da Inteligência Artificial com responsabilidade.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={contactLink}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                >
                  Quero receber informações
                  <ArrowRight className="h-4 w-4" strokeWidth={1.8} />
                </a>
                <a
                  href="https://wa.me/5571988419093?text=Ol%C3%A1%2C%20quero%20informa%C3%A7%C3%B5es%20sobre%20o%20AI%20Governance%20Forum%20Salvador%202027."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-7 py-3.5 text-sm font-semibold transition hover:border-primary hover:text-primary"
                >
                  Falar com a organização
                </a>
              </div>
              <div className="mt-10">
                <Countdown2027 />
              </div>
            </div>

            <div className="relative overflow-hidden bg-foreground p-8 text-background sm:p-12">
              <div className="absolute right-0 top-0 h-24 w-2 bg-primary" aria-hidden />
              <img src={logoDark} alt="AI Governance Forum" className="w-full" />
              <div className="mt-16 border-t border-background/20 pt-8">
                <p className="text-sm font-medium uppercase tracking-[0.28em] text-primary">Salvador</p>
                <p className="mt-2 text-7xl font-bold tracking-[-0.06em] text-background sm:text-8xl">2027</p>
                <p className="mt-6 max-w-sm text-sm font-semibold leading-relaxed text-background/75">
                  23 e 24 de setembro de 2027
                </p>
              </div>
            </div>
          </div>
        </section>

        <section aria-label="Informações da edição" className="border-b border-border bg-muted/55">
          <div className="mx-auto grid max-w-7xl gap-6 px-6 py-8 md:grid-cols-2">
            <div className="flex items-center gap-4">
              <CalendarDays className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.4} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Data</p>
                <p className="mt-1 font-semibold">23 e 24 de setembro de 2027</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="h-6 w-6 shrink-0 text-primary" strokeWidth={1.4} />
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Local</p>
                <p className="mt-1 font-semibold">Quality Hotel &amp; Suítes São Salvador · Stiep, Salvador – BA</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">A curadoria do fórum</p>
              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.025em] lg:text-5xl">
                Temas que orientam decisões reais.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                O AI Governance Forum aborda a Inteligência Artificial a partir dos desafios enfrentados por organizações públicas e privadas.
              </p>
            </div>
            <div className="border-t border-border">
              {themes.map((theme) => (
                <article key={theme.number} className="grid gap-4 border-b border-border py-8 sm:grid-cols-[48px_1fr]">
                  <span className="text-sm font-semibold text-primary">{theme.number}</span>
                  <div>
                    <h3 className="text-2xl font-semibold">{theme.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{theme.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/55 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Faça parte</p>
              <h2 className="mt-5 text-4xl font-semibold tracking-[-0.025em]">Diferentes formas de participar.</h2>
              <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                Fale com a organização para manifestar seu interesse e receber as próximas informações da edição.
              </p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {[
                { title: "Participantes", text: "Receba as novidades sobre data, local, programação e participação." },
                { title: "Palestrantes", text: "Apresente sua experiência e converse com a curadoria do fórum." },
                { title: "Patrocinadores", text: "Conheça as possibilidades de relacionamento e visibilidade para sua marca." },
              ].map((item) => (
                <a
                  key={item.title}
                  href={`mailto:fabio.martins@igovia.com.br?subject=${encodeURIComponent(`${item.title} — AI Governance Forum Salvador 2027`)}`}
                  className="group border border-border bg-background p-8 transition hover:border-primary"
                >
                  <PanelsTopLeft className="h-7 w-7 text-primary" strokeWidth={1.4} />
                  <h3 className="mt-8 text-2xl font-semibold">{item.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{item.text}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Manifestar interesse <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5" strokeWidth={1.8} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-foreground py-20 text-background lg:py-24">
          <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Enquanto isso</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">Reveja a edição Salvador 2026.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-background/70">
                Fotos, vídeos, palestrantes, patrocinadores e toda a programação da primeira edição.
              </p>
            </div>
            <Link
              to="/edicoes/salvador-2026"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Acessar edições anteriores
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
            </Link>
          </div>
        </section>

        <section id="contato-2027" className="py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary">Contato da organização</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.025em]">Vamos conversar sobre 2027.</h2>
            </div>
            <div className="space-y-4">
              <a href={contactLink} className="flex items-center gap-4 font-semibold hover:text-primary">
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
