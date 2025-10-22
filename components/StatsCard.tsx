import type React from "react";

interface StatsCardProps {
  icon: React.ReactNode;
  value: number;
  unit: string;
}

export default function StatsCard({ icon, value, unit }: StatsCardProps) {
  return (
    <div className="flex flex-col items-center gap-2 p-3 bg-secondary rounded-xl">
      <div className="text-muted-foreground">{icon}</div>
      <div className="text-center">
        <p className="text-xl font-bold text-foreground">{value}</p>
        <p className="text-xs text-muted-foreground">{unit}</p>
      </div>
    </div>
  );
}
