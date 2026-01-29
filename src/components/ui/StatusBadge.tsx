import { IncidentStatus } from "@/types";

interface StatusBadgeProps {
  status: IncidentStatus;
  size?: "sm" | "md";
}

const statusConfig: Record<
  IncidentStatus,
  { label: string; bgClass: string; textClass: string }
> = {
  open: {
    label: "Open",
    bgClass: "bg-[var(--status-open-bg)]",
    textClass: "text-[var(--status-open)]",
  },
  investigating: {
    label: "Investigating",
    bgClass: "bg-[var(--status-investigating-bg)]",
    textClass: "text-[var(--status-investigating)]",
  },
  resolved: {
    label: "Resolved",
    bgClass: "bg-[var(--status-resolved-bg)]",
    textClass: "text-[var(--status-resolved)]",
  },
  closed: {
    label: "Closed",
    bgClass: "bg-[var(--status-closed-bg)]",
    textClass: "text-[var(--status-closed)]",
  },
};

export function StatusBadge({ status, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status];

  const sizeStyles = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full capitalize
        ${config.bgClass} ${config.textClass} ${sizeStyles[size]}
      `}
    >
      {config.label}
    </span>
  );
}
