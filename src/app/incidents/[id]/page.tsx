"use client";

import { use, useState } from "react";
import Link from "next/link";
import { DashboardLayout } from "@/components/layout";
import {
  Button,
  SeverityBadge,
  StatusBadge,
  IncidentDetailSkeleton,
  ConfirmModal,
} from "@/components/ui";
import { Incident } from "@/types";
import { enrichIncident, formatDate } from "@/lib/utils";

// Mock data for demonstration (would be fetched via TanStack Query)
const getMockIncident = (id: number): Incident => {
  const incidents = [
    {
      title: "Unauthorized Access Attempt Detected on Production Server",
      body: 'Multiple failed login attempts detected from IP 192.168.1.105. The attempted username was "admin" with various password combinations. This activity triggered our brute force detection system. The source IP has been geo-located to a suspicious region known for cyber attacks. Our security team has implemented temporary IP blocking and is monitoring for further attempts. Additional investigation is underway to determine if any accounts were compromised.',
    },
    {
      title: "SQL Injection Pattern Detected in Web Application",
      body: "Our WAF detected a potential SQL injection attack targeting the user login endpoint. The payload contained typical SQL metacharacters attempting to bypass authentication. The attack originated from multiple IP addresses suggesting a coordinated effort. All attempts were successfully blocked by our security infrastructure.",
    },
    {
      title: "Suspicious Outbound Traffic to Known Malicious IP",
      body: "Network monitoring detected unusual outbound connections to IP addresses associated with known command and control servers. Investigation is underway to identify the affected systems and potential data exfiltration.",
    },
    {
      title: "Critical Vulnerability Found in Authentication Module",
      body: "Security scan revealed CVE-2024-1234 in the authentication module. This vulnerability could allow attackers to bypass authentication under specific conditions. Patching is in progress.",
    },
    {
      title: "Malware Signature Detected in Email Attachment",
      body: "Email gateway detected a malicious attachment in an email sent to the finance department. The file was quarantined and the sender has been blocked.",
    },
    {
      title: "Brute Force Attack on Admin Portal",
      body: "Over 1000 failed login attempts detected on the admin portal within a 10-minute window. Source IP has been temporarily blocked.",
    },
    {
      title: "Data Exfiltration Attempt Blocked by DLP",
      body: "Data Loss Prevention system blocked an attempt to transfer sensitive customer data to an external cloud storage service.",
    },
    {
      title: "Privilege Escalation Detected on Database Server",
      body: "Unusual privilege escalation detected on the primary database server. A service account attempted to gain root access.",
    },
    {
      title: "Cross-Site Scripting (XSS) Vulnerability Reported",
      body: "Security researcher reported a stored XSS vulnerability in the comment section of the customer portal.",
    },
    {
      title: "Ransomware Activity Detected in Network Segment",
      body: "Endpoint protection detected ransomware behavior on workstation WS-FIN-003. The machine has been isolated from the network. Forensic analysis is in progress.",
    },
  ];

  const index = (id - 1) % 10;
  return enrichIncident({
    id,
    userId: (id % 5) + 1,
    title: incidents[index].title,
    body: incidents[index].body,
  });
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function IncidentDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const incidentId = parseInt(id, 10);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isResolving, setIsResolving] = useState(false);

  // Simulating loading state
  const isLoading = false;

  // Mock incident data (replace with TanStack Query)
  const incident = getMockIncident(incidentId);

  const handleResolve = () => {
    setIsResolving(true);
    // Simulate API call - replace with TanStack Query mutation
    setTimeout(() => {
      setIsResolving(false);
      alert("Incident marked as resolved!");
    }, 1000);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(false);
    // Replace with TanStack Query mutation
    alert("Incident deleted!");
  };

  return (
    <DashboardLayout>
      {/* Back Navigation */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-foreground-muted hover:text-foreground mb-6 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Dashboard
      </Link>

      {isLoading ? (
        <IncidentDetailSkeleton />
      ) : (
        <div className="space-y-6 animate-fade-in">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-foreground-subtle font-mono">
                  INC-{String(incident.id).padStart(4, "0")}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground mb-3">
                {incident.title}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                {incident.severity && (
                  <SeverityBadge severity={incident.severity} />
                )}
                {incident.status && <StatusBadge status={incident.status} />}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 shrink-0">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleResolve}
                disabled={isResolving || incident.status === "resolved"}
              >
                {isResolving ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Resolving...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Resolve
                  </>
                )}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setIsDeleteModalOpen(true)}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Description */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Description
                </h2>
                <p className="text-foreground-muted leading-relaxed whitespace-pre-wrap">
                  {incident.body}
                </p>
              </div>

              {/* Activity Timeline Placeholder */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Activity Timeline
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Incident created
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        {incident.createdAt && formatDate(incident.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-warning/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-4 h-4 text-warning"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Investigation started
                      </p>
                      <p className="text-xs text-foreground-subtle">
                        Assigned to Security Team
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Details
                </h2>
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-foreground-subtle uppercase tracking-wide">
                      Incident ID
                    </dt>
                    <dd className="text-sm text-foreground font-mono mt-1">
                      INC-{String(incident.id).padStart(4, "0")}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-foreground-subtle uppercase tracking-wide">
                      Reported By
                    </dt>
                    <dd className="text-sm text-foreground mt-1">
                      User {incident.userId}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-foreground-subtle uppercase tracking-wide">
                      Created
                    </dt>
                    <dd className="text-sm text-foreground mt-1">
                      {incident.createdAt && formatDate(incident.createdAt)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium text-foreground-subtle uppercase tracking-wide">
                      Last Updated
                    </dt>
                    <dd className="text-sm text-foreground mt-1">
                      {incident.createdAt && formatDate(incident.createdAt)}
                    </dd>
                  </div>
                </dl>
              </div>

              {/* Quick Actions */}
              <div className="bg-surface rounded-lg border border-border p-6">
                <h2 className="text-lg font-semibold text-foreground mb-4">
                  Quick Actions
                </h2>
                <div className="space-y-2">
                  <Button variant="ghost" className="w-full justify-start">
                    <svg
                      className="w-4 h-4"
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
                    Assign to Team Member
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                    Add Tags
                  </Button>
                  <Button variant="ghost" className="w-full justify-start">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                      />
                    </svg>
                    Link Related Incidents
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Incident"
        message="Are you sure you want to delete this incident? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
      />
    </DashboardLayout>
  );
}
