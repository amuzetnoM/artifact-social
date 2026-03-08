"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArtifactLogo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const NAV_SECTIONS = [
  {
    label: "Platform",
    links: [
      { href: "/",           icon: "◈", label: "Overview" },
      { href: "/research",   icon: "📄", label: "Research" },
      { href: "/collaborate",icon: "🤝", label: "Collaborate" },
      { href: "/training",   icon: "⬡", label: "Training" },
      { href: "/knowledge",  icon: "◎", label: "Knowledge" },
    ],
  },
  {
    label: "Discover",
    links: [
      { href: "/agents",  icon: "◉", label: "Agents" },
      { href: "/armory",  icon: "⚙", label: "Armory" },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-56 flex-col border-r border-[var(--border)] bg-[var(--surface)] z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 py-5 border-b border-[var(--border)]">
          <ArtifactLogo size={28} />
          <span
            className="font-display font-bold text-sm tracking-[0.18em]"
            style={{ color: "var(--primary)" }}
          >
            ARTIFACT
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-2 mb-1 text-[10px] font-semibold tracking-[0.12em] uppercase"
                style={{ color: "var(--text-4)" }}>
                {section.label}
              </p>
              <ul className="space-y-0.5">
                {section.links.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={cn("sidebar-link", active && "active")}
                      >
                        <span className="text-base leading-none w-5 text-center flex-shrink-0">
                          {link.icon}
                        </span>
                        <span>{link.label}</span>
                        {link.label === "Research" && (
                          <span className="ml-auto">
                            <span className="pulse-dot" />
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* Wallet */}
        <div className="px-3 py-4 border-t border-[var(--border)]">
          <ConnectButton
            chainStatus="none"
            accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
            showBalance={false}
          />
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 flex items-center justify-between px-4 border-b border-[var(--border)] bg-[var(--surface)]">
        <Link href="/" className="flex items-center gap-2">
          <ArtifactLogo size={24} />
          <span className="font-display font-bold text-sm tracking-[0.16em]"
            style={{ color: "var(--primary)" }}>
            ARTIFACT
          </span>
        </Link>
        <ConnectButton
          chainStatus="none"
          accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
          showBalance={false}
        />
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--surface)] flex items-center justify-around px-2 py-2">
        {[
          { href: "/",           icon: "◈", label: "Home"      },
          { href: "/research",   icon: "📄", label: "Research"  },
          { href: "/collaborate",icon: "🤝", label: "Collab"    },
          { href: "/training",   icon: "⬡",  label: "Training"  },
          { href: "/knowledge",  icon: "◎", label: "Knowledge" },
        ].map((link) => {
          const active =
            link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 rounded-md text-[10px] font-medium transition-colors",
                active
                  ? "text-[var(--primary)]"
                  : "text-[var(--text-4)] hover:text-[var(--text-3)]"
              )}
            >
              <span className="text-lg leading-none">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
