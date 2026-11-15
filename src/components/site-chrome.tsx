import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import logoLight from "@/assets/logo-horizontal-light.png";
import logoDark from "@/assets/logo-horizontal-dark.png";

export type SiteSection = "sobre" | "salvador-2027" | "edicoes" | "programacao";

type SiteChromeProps = {
  variant: "light" | "dark";
  active?: SiteSection;
};

const navItems = [
  { to: "/", label: "Sobre", section: "sobre", hash: undefined },
  { to: "/salvador-2027", label: "Salvador 2027", section: "salvador-2027", hash: undefined },
  { to: "/edicoes/salvador-2026", label: "Edições Anteriores", section: "edicoes", hash: undefined },
  { to: "/", hash: "contato", label: "Contato", section: "contato" },
] as const;

export function SiteHeader({ variant, active }: SiteChromeProps) {
  const [open, setOpen] = useState(false);
  const logo = variant === "light" ? logoLight : logoDark;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between gap-6 px-6">
        <Link
          to="/"
          aria-label="AI Governance Forum — Sobre"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <img src={logo} alt="AI Governance Forum" className="h-12 w-auto sm:h-14" />
        </Link>

        <nav aria-label="Menu principal" className="hidden items-center gap-7 lg:flex">
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
          to="/salvador-2027"
          className="hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 sm:inline-flex"
        >
          Edição 2027
          <ArrowUpRight className="h-4 w-4" strokeWidth={1.8} />
        </Link>

        <button
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Menu principal móvel" className="border-t border-border bg-background px-6 py-5 lg:hidden">
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
            Governando o futuro da Inteligência Artificial.
          </p>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          <a className="block font-medium text-foreground hover:text-primary" href="mailto:fabio.martins@igovia.com.br">
            fabio.martins@igovia.com.br
          </a>
          <a className="mt-2 block hover:text-primary" href="https://wa.me/5571988419093" target="_blank" rel="noopener noreferrer">
            +55 (71) 9.8841.9093
          </a>
          <p className="mt-4 text-xs">© {new Date().getFullYear()} AI Governance Forum.</p>
        </div>
      </div>
    </footer>
  );
}
