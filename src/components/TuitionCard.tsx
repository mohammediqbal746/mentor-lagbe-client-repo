import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, MapPin, User, ArrowRight, Globe } from "lucide-react";

export interface TuitionItem {
  _id: string;
  title: string;
  subject: string;
  classLevel: string;
  mode: "Online" | "Offline";
  location: string;
  monthlyFee: number;
  daysPerWeek: number;
  bannerImage: string;
  description: string;
  tutorName: string;
  tutorEmail: string;
  approvalStatus?: string;
  isActive?: boolean;
}

export default function TuitionCard({ tuition }: { tuition: TuitionItem }) {
  return (
    <Card className="group flex flex-col h-full overflow-hidden border-border/60 hover:border-primary/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300">
      {/* Uniform Banner Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={
            tuition.bannerImage ||
            "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
          }
          alt={tuition.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-indigo-600/90 hover:bg-indigo-600 text-white backdrop-blur-sm">
            {tuition.subject}
          </Badge>
          <Badge
            variant="secondary"
            className="bg-background/90 backdrop-blur-sm flex items-center gap-1"
          >
            {tuition.mode === "Online" ? (
              <Globe className="h-3 w-3 text-emerald-500" />
            ) : (
              <MapPin className="h-3 w-3 text-amber-500" />
            )}
            {tuition.mode}
          </Badge>
        </div>
      </div>

      {/* Card Body */}
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
          <span className="flex items-center gap-1 font-medium text-primary">
            <BookOpen className="h-3.5 w-3.5" /> {tuition.classLevel}
          </span>
          <span>{tuition.daysPerWeek} days/week</span>
        </div>
        <h3 className="text-lg font-bold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {tuition.title}
        </h3>
      </CardHeader>

      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground flex items-center gap-1.5">
          <User className="h-4 w-4 text-primary/70 shrink-0" />
          <span className="truncate">{tuition.tutorName}</span>
        </p>
      </CardContent>

      {/* Card Footer */}
      <CardFooter className="pt-3 border-t flex items-center justify-between bg-muted/20">
        <div>
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
            Monthly Fee
          </p>
          <p className="text-lg font-extrabold text-primary">
            ৳{tuition.monthlyFee.toLocaleString()}
          </p>
        </div>
        <Link href={`/tuitions/${tuition._id}`}>
          <Button
            size="sm"
            className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white gap-1"
          >
            View Details <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}