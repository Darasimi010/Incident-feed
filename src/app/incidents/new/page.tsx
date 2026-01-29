"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layout";
import { Button, SeverityBadge, StatusBadge } from "@/components/ui";
import { IncidentFormData, IncidentSeverity, IncidentStatus } from "@/types";

export default function CreateIncidentPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<IncidentFormData>({
    title: "",
    body: "",
    severity: "medium",
    status: "open",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof IncidentFormData, string>>
  >({});

  const severityOptions: IncidentSeverity[] = [
    "critical",
    "high",
    "medium",
    "low",
    "info",
  ];
  const statusOptions: IncidentStatus[] = [
    "open",
    "investigating",
    "resolved",
    "closed",
  ];

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof IncidentFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters";
    }

    if (!formData.body.trim()) {
      newErrors.body = "Description is required";
    } else if (formData.body.length < 20) {
      newErrors.body = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call - replace with TanStack Query mutation
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Incident created successfully!");
      router.push("/");
    }, 1500);
  };

  const handleChange = (field: keyof IncidentFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
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

      <div className="max-w-2xl animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Report New Incident
          </h1>
          <p className="text-foreground-muted">
            Provide details about the security incident for investigation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Incident Title <span className="text-danger">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              placeholder="Brief description of the incident"
              className={`
                w-full px-4 py-3 bg-surface border rounded-lg
                text-foreground placeholder-foreground-subtle
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-all duration-200
                ${errors.title ? "border-danger" : "border-border"}
              `}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-danger">{errors.title}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Description <span className="text-danger">*</span>
            </label>
            <textarea
              id="body"
              value={formData.body}
              onChange={(e) => handleChange("body", e.target.value)}
              placeholder="Provide detailed information about the incident, including what happened, when it was detected, affected systems, and any initial observations..."
              rows={6}
              className={`
                w-full px-4 py-3 bg-surface border rounded-lg
                text-foreground placeholder-foreground-subtle
                focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                transition-all duration-200 resize-none
                ${errors.body ? "border-danger" : "border-border"}
              `}
            />
            {errors.body && (
              <p className="mt-1 text-sm text-danger">{errors.body}</p>
            )}
            <p className="mt-1 text-xs text-foreground-subtle">
              {formData.body.length} characters
            </p>
          </div>

          {/* Severity and Status Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Severity */}
            <div>
              <label
                htmlFor="severity"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Severity Level
              </label>
              <select
                id="severity"
                value={formData.severity}
                onChange={(e) => handleChange("severity", e.target.value)}
                className="
                  w-full px-4 py-3 bg-surface border border-border rounded-lg
                  text-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                "
              >
                {severityOptions.map((severity) => (
                  <option key={severity} value={severity}>
                    {severity.charAt(0).toUpperCase() + severity.slice(1)}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <SeverityBadge severity={formData.severity} size="sm" />
              </div>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-foreground mb-2"
              >
                Initial Status
              </label>
              <select
                id="status"
                value={formData.status}
                onChange={(e) => handleChange("status", e.target.value)}
                className="
                  w-full px-4 py-3 bg-surface border border-border rounded-lg
                  text-foreground
                  focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                  transition-all duration-200
                "
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                <StatusBadge status={formData.status} size="sm" />
              </div>
            </div>
          </div>

          {/* Preview Card */}
          <div className="bg-background-tertiary rounded-lg border border-border p-4">
            <p className="text-xs font-medium text-foreground-subtle uppercase tracking-wide mb-3">
              Preview
            </p>
            <div className="bg-surface rounded-lg border border-border p-4">
              <div className="flex items-center gap-2 mb-2">
                <SeverityBadge severity={formData.severity} size="sm" />
                <StatusBadge status={formData.status} size="sm" />
              </div>
              <h3 className="text-foreground font-medium mb-1">
                {formData.title || "Incident Title"}
              </h3>
              <p className="text-foreground-muted text-sm line-clamp-2">
                {formData.body || "Incident description will appear here..."}
              </p>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
            <Link href="/">
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
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
                  Creating...
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
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Create Incident
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
