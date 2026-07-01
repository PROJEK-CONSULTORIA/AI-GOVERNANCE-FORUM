import { createFileRoute, Link, ClientOnly } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
import logoAsset from "@/assets/logo-dark.png.asset.json";
import fabioAsset from "@/assets/fabio-martins.png.asset.json";
import darzeAsset from "@/assets/alexandre-darze.jpg.asset.json";
import vitorAsset from "@/assets/vitor-igdal.jpg.asset.json";
import daniloAsset from "@/assets/danilo-andrade.jpg.asset.json";
import rodrigoAsset from "@/assets/rodrigo-britto.jpg.asset.json";
import nelioAsset from "@/assets/nelio-castro.jpg.asset.json";
import yuriAsset from "@/assets/yuri-araujo.png.asset.json";
import igoviaAsset from "@/assets/igovia.png.asset.json";
import horusAsset from "@/assets/horus.png.asset.json";
import excellenceAsset from "@/assets/excellence.png.asset.json";
import { assetUrl } from "@/lib/asset-url";

const logoUrl = assetUrl(logoAsset.url);
const fabioUrl = assetUrl(fabioAsset.url);
const darzeUrl = assetUrl(darzeAsset.url);
const vitorUrl = assetUrl(vitorAsset.url);
const daniloUrl = assetUrl(daniloAsset.url);
const rodrigoUrl = assetUrl(rodrigoAsset.url);
const nelioUrl = assetUrl(nelioAsset.url);
const yuriUrl = assetUrl(yuriAsset.url);

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

const contactSchema = z.object({
  name: z.string().trim().min(1, "Informe seu nome").max(100),
  email: z.string().trim().email("E-mail inválido").max(255),
  subject: z.string().trim().min(1, "Informe o assunto").max(150),
  message: z.string().trim().min(1, "Escreva sua mensagem").max(1000),
});

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = contactSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Verifique os campos");
      return;
    }
    setSubmitting(true);
    const { name, email, subject, message } = result.data;
    const body = `Nome: ${name}%0AE-mail: ${email}%0A%0A${encodeURIComponent(message)}`;
    window.location.href = `mailto:fabio.martins@igovia.com.br?subject=${encodeURIComponent(
      subject,
    )}&body=${body}`;
    toast.success("Abrindo seu cliente de e-mail…");
    setForm({ name: "", email: "", subject: "", message: "" });
    setSubmitting(false);
  }

  const inputCls =
    "mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none focus:border-primary";

  return (
    <form onSubmit={handleSubmit} className="rounded-3xl border border-border bg-card p-6 lg:p-8 space-y-4">
      <div>
        <label htmlFor="cf-name" className="text-xs uppercase tracking-wider text-muted-foreground">Nome</label>
        <input id="cf-name" className={inputCls} placeholder="Seu nome" maxLength={100}
          value={form.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div>
        <label htmlFor="cf-email" className="text-xs uppercase tracking-wider text-muted-foreground">E-mail</label>
        <input id="cf-email" type="email" className={inputCls} placeholder="voce@empresa.com" maxLength={255}
          value={form.email} onChange={(e) => update("email", e.target.value)} />
      </div>
      <div>
        <label htmlFor="cf-subject" className="text-xs uppercase tracking-wider text-muted-foreground">Assunto</label>
        <input id="cf-subject" className={inputCls} placeholder="Qual o tema do seu contato?" maxLength={150}
          value={form.subject} onChange={(e) => update("subject", e.target.value)} />
      </div>
      <div>
        <label htmlFor="cf-message" className="text-xs uppercase tracking-wider text-muted-foreground">Mensagem</label>
        <textarea id="cf-message" rows={4} maxLength={1000}
          className={`${inputCls} resize-none`} placeholder="Como podemos ajudar?"
          value={form.message} onChange={(e) => update("message", e.target.value)} />
      </div>
      <button type="submit" disabled={submitting}
        className="w-full rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition disabled:opacity-60">
        {submitting ? "Enviando…" : "Enviar mensagem"}
      </button>
    </form>
  );
}

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
  { time: "09h20", title: "Palestra Magna — Governança de IA: o principal desafio estratégico da próxima década.", desc: "Visão executiva sobre impactos da IA, desafios da governança e tendências regulatórias nacionais e internacionais. Fábio Martins" },
  { time: "10h00", title: "Painel 1 — Indústria Inteligente: pessoas, dados e Inteligência Artificial.", desc: "Como estruturar a governança da Inteligência Artificial para aumentar a produtividade, otimizar operações, fortalecer a gestão de riscos e impulsionar a competitividade da indústria com segurança e responsabilidade." },
  { time: "10h30", title: "Painel 2 —\u00a0Governança, Ética e IA: os novos desafios da Justiça.", desc: "Como o Poder Judiciário pode adotar a Inteligência Artificial de forma segura, transparente e responsável, conciliando inovação, eficiência operacional, conformidade regulatória, gestão de riscos e preservação dos direitos fundamentais.\u00a0\u00a0 \u00a0\n\n\nDr. Rodrigo Britto - TJBA e Yuri Araújo - MPBA" },
  { time: "11h00", title: "Painel 3 — Governança de IA para Cidades e Estados Inteligentes: inovação com responsabilidade.", desc: "Como utilizar a Inteligência Artificial para tornar as cidades e estados mais eficientes, sustentáveis e centradas no cidadão, com governança, transparência, segurança, gestão de dados e decisões orientadas por evidências.     (Danilo Andrade - Horus CDA)" },
  { time: "11h30", title: "Painel 4 — Cibersegurança e Governança de IA: desafios para organizações inteligentes.", desc: "Como proteger dados, modelos e sistemas de IA por meio da governança, gestão de riscos, conformidade e cibersegurança, garantindo inovação com confiança e resiliência.\n\n\n\n" },
  { time: "12h00", title: "Almoço & Networking", desc: "Relacionamento entre participantes, palestrantes e patrocinadores\u00a0" },
  { time: "14h00", title: "Painel 5 —\u00a0IA no Digital e Entretenimento: criatividade, inovação e governança.", desc: "Como a Inteligência Artificial está redefinindo a criação de conteúdo, a experiência do público e os modelos de negócio, exigindo uma governança que equilibre inovação, ética, proteção da propriedade intelectual e confiança no ecossistema digital." },
  { time: "14h30", title: "Painel 6 —\u00a0As Megatendências da IA e seus impactos nos negócios", desc: "Uma análise das principais tendências que estão moldando o futuro da Inteligência Artificial e seus impactos na estratégia, na competitividade, nos modelos de negócio e na governança das organizações." },
  { time: "15h00", title: "Painel 7 — Inovação, Startups e o Futuro da IA", desc: "Como a Inteligência Artificial está redefinindo a inovação, impulsionando startups e criando novos modelos de negócio, com a governança como base para um crescimento sustentável, competitivo e responsável. (Alexandre Darzé - LH Investimentos.)" },
  { time: "15h30", title: "Painel 8 — IA começa pelos Dados: qualidade, governança e inovação.", desc: "Como a qualidade e a governança dos dados sustentam o desenvolvimento de soluções de Inteligência Artificial confiáveis, impulsionando inovação, decisões estratégicas e geração de valor com segurança e responsabilidade." },
  { time: "16h00", title: "Painel 9 — A IA e o Futuro do Trabalho: pessoas, comunidades e culturas.", desc: "Como a Inteligência Artificial está transformando a gestão de pessoas, a cultura organizacional e as competências do futuro, exigindo uma governança que promova inovação, desenvolvimento humano e liderança responsável.\n\n\nVitor Igdal - Presidente da ABRH-BA" },
  { time: "16h30", title: "Keynote de Encerramento — Liderando Organizações na Era da IA", desc: "Como executivos, conselheiros e gestores devem preparar organizações para um futuro orientado por IA, inovação e governança. (40 min)" },
  { time: "17h10", title: "Encerramento Oficial", desc: "Síntese dos insights, agradecimentos e convite para a próxima edição do AI Governance Forum." },
];

const speakers = [
  {
    name: "Fábio Martins",
    role: "Keynote Speaker — Founder do IGOV.IA - Instituto de Governança em Inteligência Artificial",
    img: fabioUrl,
    bio: "Founder do IGOV.IA - Instituto de Governança em Inteligência Artificial, Head de IA, executivo, escritor, consultor, professor e palestrante, autor dos livros Governança em Inteligência Artificial: as 10 dimensões da jornada de adoção tecnológica e Inteligência Artificial: Os Desafios do Mundo Exponencial. Graduado em Ciência da Computação e Ciências Contábeis, especialista em Gestão de Projetos, Mestre em Administração Estratégica e Doutorando em Modelagem Computacional e Tecnologia Industrial. Possui mais de 30 anos de experiência em projetos de alta complexidade nos setores público e privado, liderando equipes de alta performance.",
  },
  {
    name: "Alexandre Darzé",
    role: "Managing Partner — LH Invest & Lucen Capital",
    img: darzeUrl,
    bio: "Engenheiro civil pela UFBA e mestre em Finanças pelo COPPEAD/UFRJ, com mais de 25 anos de experiência em investimentos, finanças estruturadas e desenvolvimento de empresas. Ex-executivo da IFC (Grupo Banco Mundial), liderou investimentos em Itaú, Nubank, Mercado Livre e Creditas. Hoje é investidor em cerca de 30 empresas e conselheiro de organizações de tecnologia, engenharia e inovação — referência em venture capital, private equity e mercados de capitais na América Latina.",
  },
  {
    name: "Vitor Igdal",
    role: "Co-Fundador da Philos e Presidente da ABRH Bahia",
    img: vitorUrl,
    bio: "Especialista em Cultura Organizacional, Gestão de Comunidades e Conexões Estratégicas, Vitor Igdal é cofundador da Philos e Presidente da ABRH Bahia. Atua no desenvolvimento de lideranças, fortalecimento da cultura organizacional, engajamento de pessoas e construção de ecossistemas colaborativos que impulsionam inovação e resultados. É TEDx Speaker, palestrante e referência em estratégias para conectar pessoas, organizações e comunidades por meio de relações de confiança e propósito.",
  },
  {
    name: "Danilo Andrade",
    role: "Diretor da Horus CDA",
    img: daniloUrl,
    bio: "Diretor da horus CDA e especialista em tecnologia, inovação e ciência de dados, com atuação voltada à transformação digital e ao uso estratégico de dados para tomada de decisão. Integra a liderança da horus CDA, contribuindo para soluções em analytics, inteligência artificial e modernização de processos em organizações públicas e privadas. Formado em Ciência da Computação, com especializações em gestão empresarial e estatística, atua também na disseminação de conhecimento e no fortalecimento do ecossistema de tecnologia na Bahia.",
  },
  {
    name: "Dr. Rodrigo Britto",
    role: "Juiz de Direito do TJBA — Especialista em Inteligência Artificial",
    img: rodrigoUrl,
    bio: "Dr. Rodrigo Souza Britto é Juiz de Direito do Tribunal de Justiça do Estado da Bahia (TJBA), titular da 5ª Vara Cível e Comercial de Vitória da Conquista e foi Assessor Especial da Presidência nas áreas de Tecnologia, Informação e Dados. Liderou projetos estratégicos, como a implantação do EPROC e a adoção de soluções de Inteligência Artificial no Judiciário. Graduado em Direito pela UNIFACS, especialista em Direito Tributário pela UFBA, é professor da UNICORP, palestrante e especialista em Direito, inovação tecnológica, produtividade e Justiça Restaurativa.",
  },
  {
    name: "Nélio Castro",
    role: "Especialista em Digital e IA na Rede Bahia",
    img: nelioUrl,
    bio: "Especialista em Digital e IA na Rede Bahia. Com 30 anos de experiência em tecnologia e inovação e passagens por startups de destaque como JusBrasil e Agilize, Nélio lidera o desenvolvimento de produtos e projetos estratégicos que transformam ideias em soluções digitais de sucesso através de dados e IA.",
  },
  {
    name: "Yuri Gonzalez Araujo",
    role: "Diretor de TI do MP-BA e Presidente Executivo da SUCESU Nacional",
    img: yuriUrl,
    bio: "Atual Diretor de Tecnologia da Informação do Ministério Público do Estado da Bahia (MP-BA) e Presidente Executivo da SUCESU Nacional. Com mais de 20 anos de experiência no setor de Tecnologia da Informação e Comunicação (TIC), destaca-se nacionalmente como uma liderança voltada à transformação digital, governança de TI e inovação no setor público.",
  },
  {
    name: "A confirmar",
    role: "Compliance & Regulamentação de IA",
    img: null,
    bio: null,
  },
];

const tickets = [
  {
    name: "Profissional",
    price: "490,00",
    perks: [
      "Acesso integral ao fórum",
      "Coffee breaks e almoço executivo",
      "Certificado de participação",
      "Material digital exclusivo",
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
      <section id="top" className="relative min-h-screen flex items-end lg:items-center pt-44 overflow-hidden">
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
              <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Um dia intenso, com conteúdo de alto nível.</h2>
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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">PAINELISTAS</p>
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
                  {s.bio && (
                    <p className="text-xs text-muted-foreground/90 mt-3 leading-relaxed">{s.bio}</p>
                  )}
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
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Um ambiente colaborativo.</h2>
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
      <section id="ingressos" className="py-24 lg:py-32 relative overflow-hidden">
        {/* ambient glow */}
        <div
          className="absolute -top-32 left-1/4 h-72 w-72 rounded-full blur-[120px] opacity-20 pointer-events-none"
          style={{ background: BRAND_GREEN }}
        />
        <div
          className="absolute -bottom-32 right-1/4 h-72 w-72 rounded-full blur-[120px] opacity-10 pointer-events-none"
          style={{ background: BRAND_GREEN }}
        />

        <div className="relative mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ingressos</p>
            <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Garanta seu lugar.</h2>
            <p className="mt-4 text-muted-foreground">
              Vagas limitadas para preservar o caráter executivo do encontro.
            </p>
          </div>

          <div className="mt-14 flex justify-center">
            {tickets.map((t) => (
              <div
                key={t.name}
                className="relative w-full max-w-md overflow-hidden rounded-[32px] border border-foreground/10 bg-card/40 p-8 backdrop-blur-xl shadow-2xl"
              >
                {/* badge */}
                <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 mb-6">
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-primary">
                    PRIMEIRO LOTE - ATÉ 30/07
                  </span>
                </div>

                {/* header */}
                <h3 className="text-3xl font-bold leading-tight">
                  Passaporte <span className="text-primary">{t.name}</span>
                </h3>
                <p className="mt-2 text-sm text-muted-foreground italic">AI Governance Forum 2026</p>

                {/* price */}
                <div className="mt-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-medium text-muted-foreground">R$</span>
                    <span className="text-5xl font-extrabold tracking-tighter text-foreground">{t.price}</span>
                  </div>
                  <p className="mt-1 text-[11px] text-muted-foreground">Pagamento único com acesso imediato</p>
                </div>

                {/* features */}
                <ul className="mt-8 space-y-4">
                  {t.perks.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-0.5 shrink-0 text-primary">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <span className="text-sm leading-snug text-foreground/80">{p}</span>
                    </li>
                  ))}
                </ul>

                {/* cta */}
                <a
                  href="#contato"
                  className="mt-10 flex w-full items-center justify-center rounded-2xl bg-primary px-6 py-4 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 active:scale-[0.98]"
                >
                  Garantir minha vaga
                </a>

                {/* visual accent */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                  <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-[10px] uppercase tracking-wide text-muted-foreground/70">
            Vagas limitadas • Ambiente seguro • 12 de novembro de 2026
          </p>
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

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-xl border border-border bg-black flex items-center justify-center p-8">
              <img
                src={assetUrl(igoviaAsset.url)}
                alt="IGOV.IA — Instituto de Governança em Inteligência Artificial"
                className="h-24 lg:h-28 w-auto object-contain"
              />
            </div>
            <div className="rounded-xl border border-border bg-black flex items-center justify-center p-8">
              <img
                src={assetUrl(horusAsset.url)}
                alt="Horus CDA — Decisões mais conscientes"
                className="h-48 lg:h-56 w-auto object-contain"
              />
            </div>
            <div className="rounded-xl border border-border bg-black flex items-center justify-center p-8">
              <img
                src={assetUrl(excellenceAsset.url)}
                alt="Excellence"
                className="h-24 lg:h-28 w-auto object-contain"
              />
            </div>
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
                  <a href="mailto:fabio.martins@igovia.com.br" className="font-semibold text-foreground hover:text-primary">
                    fabio.martins@igovia.com.br
                  </a>
                </li>
                <li>
                  <span className="block text-muted-foreground text-xs uppercase tracking-wider">WhatsApp</span>
                  <span className="font-semibold">+55 (71) 9.8841.9093</span>
                </li>
              </ul>
            </div>
            <ClientOnly fallback={<div className="rounded-3xl border border-border bg-card p-6 lg:p-8 h-48 animate-pulse" aria-hidden />}>
              <ContactForm />
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
