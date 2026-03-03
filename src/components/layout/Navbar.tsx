"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArtifactLogo } from "@/components/brand/Logo";

const navLinks = [
  { href: "/feed", label: "Feed" },
  { href: "/explore", label: "Explore" },
  { href: "/armory", label: "Armory" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-bg/70 backdrop-blur-2xl"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative">
              <ArtifactLogo size={32} className="group-hover:scale-105 transition-transform duration-200" />
            </div>
            <span className="font-display text-[17px] font-bold tracking-[0.15em] text-text hidden sm:block">
              ARTIFACT
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-[13px] font-medium text-text-muted hover:text-text rounded-xl hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Wallet + Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Mobile nav */}
            <div className="flex md:hidden items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-2.5 py-1.5 text-[11px] font-medium text-text-muted hover:text-text rounded-lg hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <ConnectButton
              chainStatus="icon"
              accountStatus={{ smallScreen: "avatar", largeScreen: "address" }}
              showBalance={false}
            />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
