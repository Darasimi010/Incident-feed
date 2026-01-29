import React from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  accentColor?: string;
}

export function StatCard({
  label,
  value,
  icon,
  trend,
  accentColor,
}: StatCardProps) {
  return (
    <div className="bg-surface rounded-lg p-4 border border-border hover:border-foreground-subtle transition-colors duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-foreground-muted text-sm font-medium mb-1">
            {label}
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: accentColor || "var(--foreground)" }}
          >
            {value}
          </p>
          {trend && (
            <p
              className={`text-xs mt-1 ${trend.isPositive ? "text-success" : "text-danger"}`}
            >
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}% from last
              week
            </p>
          )}
        </div>
        <div
          className="p-2 rounded-lg"
          style={{
            backgroundColor: accentColor
              ? `${accentColor}20`
              : "var(--surface-hover)",
            color: accentColor || "var(--foreground-muted)",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
