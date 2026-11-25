"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";
import TuitionCard, { TuitionItem } from "@/components/TuitionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Search,
  Sparkles,
  CheckCircle2,
  Users,
  BookOpen,
  Award,
  ArrowRight,
  ShieldCheck,
  Zap,
  Star,
} from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [tuitions, setTuitions] = useState<TuitionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${API_URL}/tuitions?limit=6&page=1`);
        const data = await res.json();
        setTuitions(data.tuitions || []);
      } catch (err) {
        console.error("Failed to fetch featured tuitions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      router.push(`/tuitions?search=${encodeURIComponent(searchText.trim())}`);
    } else {
      router.push("/tuitions");
    }
  };

  return (
    <div className="flex flex-col">
      {/* 1. HERO / BANNER SECTION */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-indigo-50/80 via-background to-background dark:from-indigo-950/30 dark:via-background dark:to-background">
        {/* Ambient Glow Effects */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-72 w-[36rem] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-32 right-10 h-56 w-56 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <Badge
                variant="secondary"
                className="px-3 py-1 text-xs font-semibold border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300"
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5 inline" />
                Bangladesh&apos;s #1 Smart Tuition &amp; Mentorship Platform
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                Find Your Ideal{" "}
                <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                  Tutor or Mentorship
                </span>{" "}
                Batch Today
              </h1>

              <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Connect with verified tutors for SSC, HSC, IELTS, and Programming.
                Filter by subject, class level, online/offline mode, and monthly budget.
              </p>

              {/* Quick Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto lg:mx-0 p-1.5 rounded-xl border bg-background/90 shadow-lg shadow-indigo-500/10"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search subject (e.g. Math, Physics, IELTS)..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="pl-9 border-0 shadow-none focus-visible:ring-0"
                  />
                </div>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white px-6"
                >
                  Find Tuitions
                </Button>
              </form>

              {/* Mini Trust Stats */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-emerald-500" /> Admin-Verified Posts
                </span>
                <span className="flex items-center gap-1.5">
                  <Users className="h-4 w-4 text-indigo-500" /> 1,200+ Active Learners
                </span>
                <span className="flex items-center gap-1.5">
                  <Zap className="h-4 w-4 text-amber-500" /> Instant Booking
                </span>
              </div>
            </div>

            {/* Hero Illustration / Photo */}
            <div className="relative hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden border shadow-2xl shadow-indigo-500/20">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900"
                  alt="Students learning with mentor"
                  className="w-full h-[420px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-background/90 backdrop-blur-md p-4 border shadow-lg">
                  <div>
                    <p className="text-xs text-muted-foreground">Verified Mentors</p>
                    <p className="text-lg font-bold text-primary">250+ Subject Experts</p>
                  </div>
                  <Badge className="bg-emerald-500 text-white">4.9 ★ Avg Rating</Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DYNAMIC FEATURED TUITIONS SECTION (6 Latest Approved) */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <Badge variant="outline" className="mb-2 text-primary border-primary/30">
              Featured Listings
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Latest Approved Tuitions
            </h2>
            <p className="text-muted-foreground mt-1">
              Explore top-rated online and home tuition batches verified by our team.
            </p>
          </div>
          <Link href="/tuitions">
            <Button variant="outline" className="gap-1.5 border-primary/30 hover:border-primary">
              Browse All Tuitions <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-5 space-y-3">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </Card>
            ))}
          </div>
        ) : tuitions.length === 0 ? (
          <div className="text-center py-12 border rounded-xl bg-muted/20">
            <p className="text-muted-foreground">No approved tuitions found yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tuitions.map((item) => (
              <TuitionCard key={item._id} tuition={item} />
            ))}
          </div>
        )}
      </section>

      {/* 3. EXTRA SECTION 1 — HOW MENTORLAGBE WORKS */}
      <section id="how-it-works" className="bg-muted/30 border-y py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="outline" className="mb-2 text-primary border-primary/30">
              Simple Workflow
            </Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              How MentorLagbe Works
            </h2>
            <p className="text-muted-foreground mt-2">
              Whether you are a student seeking guidance or a tutor growing your batch, getting started takes minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Create Your Account",
                desc: "Sign up in seconds and choose your role as a Student or Tutor.",
              },
              {
                step: "02",
                title: "Post or Browse Batches",
                desc: "Tutors post verified batches; Students filter by subject, class & mode.",
              },
              {
                step: "03",
                title: "Apply & Connect",
                desc: "Students apply with their preferred schedule; Tutors review and accept.",
              },
              {
                step: "04",
                title: "Start Learning",
                desc: "Track application status in real time and upgrade to Pro anytime.",
              },
            ].map((item) => (
              <Card key={item.step} className="relative overflow-hidden border-border/60 hover:border-primary/40 transition">
                <CardHeader>
                  <span className="text-4xl font-black text-indigo-500/20">{item.step}</span>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PRICING / SUBSCRIPTION SECTION */}
      <section className="container mx-auto px-4 py-16 md:py-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="outline" className="mb-2 text-primary border-primary/30">
            Flexible Plans
          </Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Upgrade to MentorLagbe Pro
          </h2>
          <p className="text-muted-foreground mt-2">
            Start for free and unlock unlimited power with secure Stripe checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Free Tier */}
          <Card className="flex flex-col border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Starter Free</CardTitle>
              <p className="text-3xl font-extrabold mt-2">$0 <span className="text-sm font-normal text-muted-foreground">/ forever</span></p>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Students: Apply to unlimited tuitions</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Students: Up to 5 saved bookmarks</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Tutors: Post up to 2 tuition batches</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/sign-up">
                <Button variant="outline" className="w-full">Get Started Free</Button>
              </Link>
            </div>
          </Card>

          {/* Pro Tutor */}
          <Card className="flex flex-col border-2 border-indigo-600 shadow-xl shadow-indigo-500/15 relative">
            <Badge className="absolute -top-3 right-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-xl">Pro Tutor Plan</CardTitle>
              <p className="text-3xl font-extrabold mt-2 text-primary">$15 <span className="text-sm font-normal text-muted-foreground">/ one-time</span></p>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Post unlimited tuition batches</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Verified Pro Tutor badge</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-indigo-500" /> Priority Admin moderation</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/pricing">
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white">
                  Subscribe with Stripe
                </Button>
              </Link>
            </div>
          </Card>

          {/* Pro Student */}
          <Card className="flex flex-col border-border/70">
            <CardHeader>
              <CardTitle className="text-xl">Pro Student Plan</CardTitle>
              <p className="text-3xl font-extrabold mt-2 text-primary">$10 <span className="text-sm font-normal text-muted-foreground">/ one-time</span></p>
            </CardHeader>
            <CardContent className="flex-1 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Unlimited tuition bookmarks</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Priority booking visibility</p>
              <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-500" /> Pro Student profile badge</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Link href="/pricing">
                <Button variant="outline" className="w-full border-primary/40 hover:border-primary">
                  Subscribe with Stripe
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      {/* 5. EXTRA SECTION 2 — TOP SUBJECTS & TESTIMONIALS */}
      <section className="bg-muted/30 border-t py-16 md:py-20">
        <div className="container mx-auto px-4 space-y-16">
          {/* Top Subjects */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold tracking-tight">Popular Subjects</h2>
              <p className="text-muted-foreground mt-1">Click any subject to explore verified batches immediately.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              {[
                { name: "Mathematics", count: "40+ Batches" },
                { name: "Physics", count: "28+ Batches" },
                { name: "Programming", count: "35+ Batches" },
                { name: "IELTS", count: "22+ Batches" },
              ].map((sub) => (
                <Link key={sub.name} href={`/tuitions?subject=${encodeURIComponent(sub.name)}`}>
                  <Card className="text-center p-5 hover:border-primary hover:shadow-md transition cursor-pointer">
                    <BookOpen className="h-7 w-7 mx-auto text-primary mb-2" />
                    <h3 className="font-bold">{sub.name}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{sub.count}</p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold tracking-tight">What Students &amp; Tutors Say</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  name: "Ariful Islam",
                  role: "HSC Student, Dhaka",
                  quote: "Found an amazing Higher Math tutor within 2 days. The schedule filter saved me so much time!",
                },
                {
                  name: "Dr. Tanvir Ahmed",
                  role: "Pro Tutor",
                  quote: "Managing my SSC and HSC batches and student applications from one dashboard is super clean.",
                },
                {
                  name: "Sadia Afrin",
                  role: "IELTS Candidate",
                  quote: "I loved how transparent the monthly fees and tutor profiles are. Highly recommended!",
                },
              ].map((t) => (
                <Card key={t.name} className="p-6 space-y-3">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">&ldquo;{t.quote}&rdquo;</p>
                  <div className="pt-2 flex items-center gap-2">
                    <Award className="h-4 w-4 text-primary" />
                    <div>
                      <p className="text-sm font-bold">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}