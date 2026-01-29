"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout";
import {
  StatCard,
  SearchBar,
  IncidentCard,
  IncidentCardSkeleton,
  StatCardSkeleton,
  EmptyState,
  Button,
} from "@/components/ui";
import { Incident } from "@/types";
import { enrichIncident, calculateStats } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";

async function fetchIncidents() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }
  const data = await response.json();
  return data
    .map((item: any) => ({
      id: item.id,
      userId: item.userId,
      title: item.title,
      body: item.body,
      createdAt: new Date().toISOString(),
      severity: "medium",
      status: "open",
      assignee: "Unassigned",
      tags: ["network", "security"],
    }))
    .map(enrichIncident);
}

export default function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("");

  const {
    isPending,
    error,
    data: incidents = [],
    isFetching,
  } = useQuery({
    queryKey: ["incidents"],
    queryFn: fetchIncidents,
  });

  // Filter incidents based on search
  const filteredIncidents = incidents.filter(
    (incident: Incident) =>
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const stats = calculateStats(incidents);

  if (isPending) {
    return (
      <DashboardLayout>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <EmptyState
          title="Error"
          description="Failed to fetch incidents"
          icon={
            <svg
              className="w-12 h-12 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          }
        />
      </DashboardLayout>
    );
  }

  // Simulating loading state - set to true to see skeletons
  const isLoading = false;

  return (
    <DashboardLayout>
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Security Dashboard
        </h1>
        <p className="text-foreground-muted">
          Monitor and manage cybersecurity incidents across your organization
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {isLoading ? (
          <>
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </>
        ) : (
          <>
            <StatCard
              label="Total Incidents"
              value={stats.total}
              accentColor="var(--primary)"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Critical"
              value={stats.critical}
              accentColor="var(--severity-critical)"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Open"
              value={stats.open}
              accentColor="var(--status-open)"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
            <StatCard
              label="Resolved"
              value={stats.resolved}
              accentColor="var(--status-resolved)"
              icon={
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
            />
          </>
        )}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search incidents by title or description..."
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
            <option value="info">Info</option>
          </select>
          <select className="bg-surface border border-border rounded-lg px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">All Status</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Incidents Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <IncidentCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredIncidents.length === 0 ? (
        <EmptyState
          title="No incidents found"
          description={
            searchQuery
              ? `No incidents match "${searchQuery}". Try adjusting your search terms.`
              : "There are no incidents to display at this time."
          }
          action={
            searchQuery && (
              <Button variant="secondary" onClick={() => setSearchQuery("")}>
                Clear search
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredIncidents.map((incident: Incident, index: number) => (
            <div
              key={incident.id}
              className={`animate-slide-up stagger-${Math.min(index + 1, 5)}`}
              style={{ opacity: 0 }}
            >
              <IncidentCard incident={incident} />
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
