import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { assetUrl } from "@/lib/asset-url";
import video from "@/assets/edicao-salvador.mp4.asset.json";
import p1 from "@/assets/salvador-2026-publico.jpg.asset.json";
import p2 from "@/assets/salvador-fabio-martins-3.jpg.asset.json";
import p3 from "@/assets/salvador-2026-pierre-semantix.jpg.asset.json";
import p4 from "@/assets/salvador-painel-chip.jpg.asset.json";
import p5 from "@/assets/salvador-painel-solutis.jpg.asset.json";
import p6 from "@/assets/salvador-painel-exponencial.jpg.asset.json";
import p7 from "@/assets/salvador-2026-ricardo-detran.jpg.asset.json";
import p8 from "@/assets/salvador-2026-andrea-tecnoativa.jpg.asset.json";
import p9 from "@/assets/salvador-2026-fred-luis-gaban.jpg.asset.json";
import p10 from "@/assets/salvador-fabio-martins-2.jpg.asset.json";
import p11 from "@/assets/salvador-2026-publico-2.jpg.asset.json";

const photos = [
  [p1, "Público do AI Governance Forum Salvador"],
  [p2, "Fábio Martins na abertura"],
  [p3, "Pierre Muto na Palestra Magna Semantix"],
  [p4, "Painel CHIP"],
  [p5, "Painel Solutis"],
  [p6, "Painel Exponencial"],
  [p7, "Ricardo Fontoura, Detran-BA"],
  [p8, "Andréa Campelo, Painel Tecnoativa"],
  [p9, "Fred Soares e Luis Gaban"],
  [p10, "Fábio Martins"],
  [p11, "Plateia do fórum"],
] as const;

const videos = [
  ["zDUUJub4B_g", "AI Governance Forum Salvador — vídeo 1"],
  ["wwK7_xw5VJc", "AI Governance Forum Salvador — vídeo 2"],
];

const TIBAHIA =
  "https://tibahia.com/eventos/primeiro-forum-de-governanca-de-ia-da-bahia-reune-tribunais-governo-industria-e-empresas-de-tecnologia-em-salvador/";

export function EdicaoSalvador() {
  return (
    <section id="edicao-salvador" className="py-24 lg:py-32 bg-card/40 border-y border-border">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Edição Salvador · 12/11/2026</p>
        <h2 className="mt-4 text-4xl lg:text-5xl font-bold">Veja como foi o AI Governance Forum Salvador</h2>

        <div className="mt-10 overflow-hidden rounded-2xl border border-border bg-background">
          <video src={assetUrl(video.url)} controls playsInline preload="metadata" className="w-full max-h-[70vh] bg-background" />
        </div>

        <div className="mt-8 grid md:grid-cols-2 gap-6">
          {videos.map(([id, title]) => (
            <div key={id} className="aspect-video overflow-hidden rounded-2xl border border-border">
              <iframe
                src={`https://www.youtube.com/embed/${id}`}
                title={title}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          ))}
        </div>

        <h3 className="mt-16 text-2xl lg:text-3xl font-bold">Fotos da edição de Salvador</h3>
        <Carousel opts={{ align: "start", loop: true }} className="mt-8 mx-12">
          <CarouselContent>
            {photos.map(([p, alt]) => (
              <CarouselItem key={p.url} className="basis-full sm:basis-1/2 lg:basis-1/3">
                <img src={assetUrl(p.url)} alt={alt} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover border border-border" />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div id="imprensa" className="mt-24">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Imprensa</p>
          <h3 className="mt-4 text-3xl lg:text-4xl font-bold">O que falam sobre nós</h3>
          <a
            href={TIBAHIA}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 grid md:grid-cols-[2fr_3fr] overflow-hidden rounded-2xl border border-border bg-background hover:border-primary transition"
          >
            <img src={assetUrl(p1.url)} alt="Público do fórum" className="h-full w-full object-cover min-h-56" />
            <div className="p-8">
              <p className="text-sm font-semibold text-primary">TI Bahia · 13 de novembro de 2026</p>
              <h4 className="mt-3 text-xl lg:text-2xl font-bold">
                Primeiro fórum de governança de IA da Bahia reúne tribunais, governo, indústria e empresas de tecnologia em Salvador
              </h4>
              <blockquote className="mt-4 border-l-2 border-primary pl-4 text-muted-foreground italic">
                “Hoje foi o primeiro passo dado para a criação de um grande ecossistema voltado para a governança de inteligência artificial.” — Fábio Martins
              </blockquote>
              <span className="mt-6 inline-block text-sm font-semibold text-primary">Ler matéria completa →</span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
