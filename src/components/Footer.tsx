import React from "react";
import Link from "next/link";
import { GraduationCap, Mail, Phone, MapPin, Facebook, Linkedin, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t bg-muted/30 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-md shadow-indigo-500/30">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                MentorLagbe
              </span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Bangladesh&apos;s smart tuition & mentorship platform connecting verified tutors with students for online and home batches.
            </p>
            {/* Social Media Links with NEW X Logo */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:border-primary hover:text-primary transition"
              >
                {/* New X Logo SVG */}
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:border-primary hover:text-primary transition">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:border-primary hover:text-primary transition">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube" className="flex h-9 w-9 items-center justify-center rounded-full border bg-background hover:border-primary hover:text-primary transition">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/tuitions" className="hover:text-primary transition">Browse Tuitions</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition">Pro Plans & Pricing</Link></li>
              <li><Link href="/#how-it-works" className="hover:text-primary transition">How It Works</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h4 className="font-semibold text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> support@mentorlagbe.com</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +880 1856-322144</li>
              <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Chattogram & Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} MentorLagbe. All rights reserved. Built for smarter learning.
        </div>
      </div>
    </footer>
  );
}