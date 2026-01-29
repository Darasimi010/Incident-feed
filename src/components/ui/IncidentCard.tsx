import Link from "next/link";
import { Incident } from "@/types";
import { SeverityBadge } from "./SeverityBadge";
import { StatusBadge } from "./StatusBadge";
import { truncateText, formatRelativeTime } from "@/lib/utils";

interface IncidentCardProps {
  incident: Incident;
}

export function IncidentCard({ incident }: IncidentCardProps) {
  return (
    <Link href={`/incidents/${incident.id}`}>
      <article
        className="
        bg-surface rounded-lg border border-border p-4
        hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5
        transition-all duration-200 cursor-pointer group
      "
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            {incident.severity && (
              <SeverityBadge severity={incident.severity} size="sm" />
            )}
            {incident.status && (
              <StatusBadge status={incident.status} size="sm" />
            )}
          </div>
          <span className="text-xs text-foreground-subtle shrink-0">
            INC-{String(incident.id).padStart(4, "0")}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-foreground font-medium mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {incident.title}
        </h3>

        {/* Description */}
        <p className="text-foreground-muted text-sm line-clamp-2">
          {truncateText(incident.body, 120)}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border-muted">
          <span className="text-xs text-foreground-subtle">
            {incident.createdAt && formatRelativeTime(incident.createdAt)}
          </span>
          <span className="text-xs text-foreground-subtle flex items-center gap-1">
            <svg
              className="w-3 h-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            User {incident.userId}
          </span>
        </div>
      </article>
    </Link>
  );
}
