"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardContent from "@/components/DashboardContent";
import { useEffect, useState } from "react";

// Mock data for visual demonstration
// Replace this with TanStack Query fetch later

// const mockIncidents: Incident[] = Array.from({ length: 10 }, (_, i) => ({
//   id: i + 1,
//   userId: (i % 5) + 1,
//   title: [
//     "Unauthorized Access Attempt Detected on Production Server",
//     "SQL Injection Pattern Detected in Web Application",
//     "Suspicious Outbound Traffic to Known Malicious IP",
//     "Critical Vulnerability Found in Authentication Module",
//     "Malware Signature Detected in Email Attachment",
//     "Brute Force Attack on Admin Portal",
//     "Data Exfiltration Attempt Blocked by DLP",
//     "Privilege Escalation Detected on Database Server",
//     "Cross-Site Scripting (XSS) Vulnerability Reported",
//     "Ransomware Activity Detected in Network Segment",
//   ][i],
//   body: [
//     'Multiple failed login attempts detected from IP 192.168.1.105. The attempted username was "admin" with various password combinations. This activity triggered our brute force detection system.',
//     "Our WAF detected a potential SQL injection attack targeting the user login endpoint. The payload contained typical SQL metacharacters attempting to bypass authentication.",
//     "Network monitoring detected unusual outbound connections to IP addresses associated with known command and control servers. Investigation is underway.",
//     "Security scan revealed CVE-2024-1234 in the authentication module. This vulnerability could allow attackers to bypass authentication under specific conditions.",
//     "Email gateway detected a malicious attachment in an email sent to the finance department. The file was quarantined and the sender has been blocked.",
//     "Over 1000 failed login attempts detected on the admin portal within a 10-minute window. Source IP has been temporarily blocked.",
//     "Data Loss Prevention system blocked an attempt to transfer sensitive customer data to an external cloud storage service.",
//     "Unusual privilege escalation detected on the primary database server. A service account attempted to gain root access.",
//     "Security researcher reported a stored XSS vulnerability in the comment section of the customer portal.",
//     "Endpoint protection detected ransomware behavior on workstation WS-FIN-003. The machine has been isolated from the network.",
//   ][i],
// })).map(enrichIncident);

export default function DashboardPage() {
  const [queryClient] = useState(() => new QueryClient());
  // This code is for all users
  useEffect(() => {
    window.__TANSTACK_QUERY_CLIENT__ = queryClient;
  }, [queryClient]);

  return (
    <QueryClientProvider client={queryClient}>
      <DashboardContent />
    </QueryClientProvider>
  );
}
