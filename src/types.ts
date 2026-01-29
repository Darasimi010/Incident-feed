// Types for the Incident Feed application
// Maps to JSONPlaceholder /posts endpoint structure

export type IncidentSeverity = "critical" | "high" | "medium" | "low" | "info";

export type IncidentStatus = "open" | "investigating" | "resolved" | "closed";

export interface Incident {
  id: number;
  userId: number;
  title: string;
  body: string;
  // Derived fields (computed client-side for demo purposes)
  severity?: IncidentSeverity;
  status?: IncidentStatus;
  createdAt?: string;
}

export interface IncidentFormData {
  title: string;
  body: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
}

export interface DashboardStats {
  total: number;
  critical: number;
  high: number;
  open: number;
  resolved: number;
}
