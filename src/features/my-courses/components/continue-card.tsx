"use client";

import { Clock, Video, Play } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/shared/components/ui/card";
import { ProgressBar } from "@/shared/components/ui/progress-bar";

interface ContinueCardProps {
  title?: string;
  module?: string;
  progress?: number;
  lessons?: number;
  hours?: number;
}

export function ContinueCard({
  title = "Design de UI Avançado",
  module = "Módulo 3: Microinterações",
  progress = 45,
  lessons = 24,
  hours = 6,
}: ContinueCardProps) {
  return (
    <Card className="group transition-colors hover:bg-card/80">
      <CardHeader>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Info */}
          <div>
            <CardDescription>Continuar de onde parou</CardDescription>
            <CardTitle className="text-xl mt-1 group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="mt-1">{module}</CardDescription>
          </div>

          {/* Metrics + Button */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Video size={14} />
                {lessons} aulas
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={14} />
                {hours}h
              </span>
            </div>
            <button className="flex items-center gap-2 rounded-sm bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
              <Play size={16} />
              Continuar
            </button>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ProgressBar progress={progress} />
      </CardContent>
    </Card>
  );
}
