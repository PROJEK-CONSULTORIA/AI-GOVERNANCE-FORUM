import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import logoLight from "@/assets/logo-horizontal-light.png";
import logoDark from "@/assets/logo-horizontal-dark.png";

export type SiteSection = "sobre" | "salvador-2027" | "edicoes" | "programacao";

type SiteChromeProps = {
  variant: "light" | "dark";
  active?: SiteSection;
  withSaveTheDate?: boolean;
};

const navItems = [
  { to: "/", label: "Sobre", section: "sobre", hash: undefined },
  { to: "/salvador-2027", label: "Salvador 2027", section: "salvador-2027", hash: undefined },
  { to: "/edicoes/salvador-2026", label: "Edições Anteriores", section: "edicoes", hash: undefined },
  { to: "/", hash: "contato", label: "Contato", section: "contato" },
] as const;

export function SaveTheDateBanner() {
  return (
    <Link
      to="/salvador-2027"
      className="fixed inset-x-0 top-0 z-[60] flex h-12 items-center justify-center gap-1.5 whitespace-nowrap bg-primary px-3 text-center text-[9px] font-bold uppercase tracking-[0.05em] text-primary-foreground transition hover:opacity-95 max-[359px]:gap-1 max-[359px]:text-[8px] max-[359px]:tracking-[0.02em] sm:gap-3 sm:px-4 sm:text-xs sm:tracking-[0.18em]"
    >
      <span>AI Governance Forum</span>
      <span aria-hidden>·</span>
      <span>Save the Date</span>
      <span aria-hidden>·</span>
      <span>23 e 24 de setembro de 2027</span>
      <ArrowUpRight className="hidden h-4 w-4 sm:block" strokeWidth={1.8} />
    </Link>
  );
}

export function SiteHeader({ variant, active, withSaveTheDate = false }: SiteChromeProps) {
  const [open, setOpen] = useState(false);
  const logo = variant === "light" ? logoLight : logoDark;

  return (
    <header className={`fixed inset-x-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl ${withSaveTheDate ? "top-12" : "top-0"}`}>
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-6 px-6">
        <Link
          to="/"
          aria-label="AI Governance Forum — Sobre"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="AI Governance Forum" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              hash={item.hash}
              className={
                active === item.section
                  ? "text-sm font-semibold text-primary"
                  : "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          to="/edicoes/salvador-2026"
          className="hidden items-center gap-2 whitespace-nowrap rounded-full bg-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wide text-primary-foreground transition hover:opacity-90 sm:inline-flex"
        >
          AI Governance Forum Salvador 2026
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border text-foreground xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Menu principal móvel" className="border-t border-border bg-background px-6 py-5 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                hash={item.hash}
                onClick={() => setOpen(false)}
                className={
                  active === item.section
                    ? "rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground"
                    : "rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                }
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/edicoes/salvador-2026"
              onClick={() => setOpen(false)}
              className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-primary px-4 py-3 text-xs font-bold uppercase tracking-wide text-primary-foreground"
            >
              AI Governance Forum Salvador 2026
              <ArrowUpRight className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export function SiteFooter({ variant }: Pick<SiteChromeProps, "variant">) {
  const logo = variant === "light" ? logoLight : logoDark;

  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <Link to="/" aria-label="AI Governance Forum — Sobre">
            <img src={logo} alt="AI Governance Forum" className="h-12 w-auto" loading="lazy" />
          </Link>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            O Futuro da IA começa pela Governança.
          </p>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          <a className="block font-medium text-foreground hover:text-primary" href="mailto:fabio.martins@igovia.com.br">
            fabio.martins@igovia.com.br
          </a>
          <a className="mt-2 block hover:text-primary" href="https://wa.me/5571988419093" target="_blank" rel="noopener noreferrer">
            +55 (71) 9.8841.9093
          </a>
          <p className="mt-4 text-xs">© AI Governance Forum.</p>
        </div>
      </div>
    </footer>
  );
}
