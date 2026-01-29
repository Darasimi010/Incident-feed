import { Incident, IncidentSeverity, IncidentStatus, DashboardStats } from '@/types';

// Derive severity from incident ID for consistent demo data
export function getIncidentSeverity(id: number): IncidentSeverity {
  const severities: IncidentSeverity[] = ['critical', 'high', 'medium', 'low', 'info'];
  return severities[id % severities.length];
}

// Derive status from incident ID for consistent demo data
export function getIncidentStatus(id: number): IncidentStatus {
  const statuses: IncidentStatus[] = ['open', 'investigating', 'resolved', 'closed'];
  return statuses[(id * 3) % statuses.length];
}

// Generate a fake date based on incident ID
export function getIncidentDate(id: number): string {
  const baseDate = new Date('2026-01-15');
  baseDate.setDate(baseDate.getDate() - (id % 30));
  return baseDate.toISOString();
}

// Enrich incident with derived fields
export function enrichIncident(incident: Incident): Incident {
  return {
    ...incident,
    severity: getIncidentSeverity(incident.id),
    status: getIncidentStatus(incident.id),
    createdAt: getIncidentDate(incident.id),
  };
}

// Format date for display
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Format relative time
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  return `${Math.floor(diffDays / 30)} months ago`;
}

// Truncate text with ellipsis
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

// Calculate dashboard stats from incidents
export function calculateStats(incidents: Incident[]): DashboardStats {
  return {
    total: incidents.length,
    critical: incidents.filter(i => i.severity === 'critical').length,
    high: incidents.filter(i => i.severity === 'high').length,
    open: incidents.filter(i => i.status === 'open').length,
    resolved: incidents.filter(i => i.status === 'resolved').length,
  };
}

// Severity color mapping
export function getSeverityColor(severity: IncidentSeverity): string {
  const colors: Record<IncidentSeverity, string> = {
    critical: 'var(--severity-critical)',
    high: 'var(--severity-high)',
    medium: 'var(--severity-medium)',
    low: 'var(--severity-low)',
    info: 'var(--severity-info)',
  };
  return colors[severity];
}

// Status color mapping
export function getStatusColor(status: IncidentStatus): string {
  const colors: Record<IncidentStatus, string> = {
    open: 'var(--status-open)',
    investigating: 'var(--status-investigating)',
    resolved: 'var(--status-resolved)',
    closed: 'var(--status-closed)',
  };
  return colors[status];
}
