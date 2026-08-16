import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Github,
  Instagram,
  Linkedin,
  Mail,
  Store,
  Twitter,
  Heart,
} from "lucide-react";

export function FooterSection() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Point of Sale", href: "/#features" },
      { name: "Inventory Management", href: "/#features" },
      { name: "Sales Analytics", href: "/#features" },
      { name: "Order & Payments", href: "/#features" },
      { name: "Pricing Plans", href: "/pricing" },
    ],
    solutions: [
      { name: "Coffee Shop & Cafe", href: "#" },
      { name: "Restaurant & Eatery", href: "#" },
      { name: "Retail & Boutique", href: "#" },
      { name: "Multi-Outlet Chains", href: "#" },
      { name: "Pop-up & Events", href: "#" },
    ],
    resources: [
      { name: "Documentation", href: "#" },
      { name: "API Reference", href: "#" },
      { name: "Help Center", href: "#" },
      { name: "Release Notes", href: "#" },
      { name: "System Status", href: "#", badge: "Operational" },
    ],
    company: [
      { name: "About Us", href: "/#about" },
      { name: "Contact Sales", href: "mailto:support@cravepos.com" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  };

  const socialLinks = [
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Github, href: "https://github.com", label: "GitHub" },
    { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { icon: Mail, href: "mailto:hello@cravepos.com", label: "Email" },
  ];

  return (
    <footer className="relative border-t border-border/60 bg-card/40 backdrop-blur-md bg-primary">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-8">
          {/* Brand Column (Spans 2 cols on lg) */}
          <div className="space-y-5 lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="flex size-9 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                <img src="/dark-mode-logo.png" />
              </div>
              <span className="text-xl font-bold tracking-tight text-background">
                Crave <span className="text-background">POS</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-background">
              Powerful, intuitive, and modern point of sale system. Designed to streamline
              checkouts, inventory tracking, and sales analytics for growing businesses.
            </p>

            {/* System Status Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-background/80 px-3 py-1 text-xs text-background shadow-xs">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex size-8 items-center justify-center rounded-lg border border-border/60 bg-background/60 text-background transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-background">
              Product
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-background">
              Solutions
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.solutions.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-background">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1.5 text-background transition-colors hover:text-primary"
                  >
                    <span>{link.name}</span>
                    {link.badge ? (
                      <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-500 border border-emerald-500/20">
                        {link.badge}
                      </span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-background">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-background transition-colors hover:text-primary"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
