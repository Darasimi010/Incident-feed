import { IncidentSeverity } from "@/types";

interface SeverityBadgeProps {
  severity: IncidentSeverity;
  size?: "sm" | "md";
}

const severityConfig: Record<
  IncidentSeverity,
  { label: string; bgClass: string; textClass: string }
> = {
  critical: {
    label: "Critical",
    bgClass: "bg-[var(--severity-critical-bg)]",
    textClass: "text-[var(--severity-critical)]",
  },
  high: {
    label: "High",
    bgClass: "bg-[var(--severity-high-bg)]",
    textClass: "text-[var(--severity-high)]",
  },
  medium: {
    label: "Medium",
    bgClass: "bg-[var(--severity-medium-bg)]",
    textClass: "text-[var(--severity-medium)]",
  },
  low: {
    label: "Low",
    bgClass: "bg-[var(--severity-low-bg)]",
    textClass: "text-[var(--severity-low)]",
  },
  info: {
    label: "Info",
    bgClass: "bg-[var(--severity-info-bg)]",
    textClass: "text-[var(--severity-info)]",
  },
};

export function SeverityBadge({ severity, size = "md" }: SeverityBadgeProps) {
  const config = severityConfig[severity];

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-full uppercase tracking-wide
        ${config.bgClass} ${config.textClass} ${sizeStyles[size]}
      `}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${size === "sm" ? "w-1 h-1 mr-1" : ""}`}
        style={{ backgroundColor: `var(--severity-${severity})` }}
      />
      {config.label}
    </span>
  );
}
