"use client";

import { useState } from "react";
import Link from "next/link";

const regularTopics = [
  { id: "networking", title: "Networking Fundamentals", description: "TCP/IP, DNS, firewalls and more" },
  { id: "cryptography", title: "Cryptography", description: "Encryption, hashing, PKI and protocols" },
  { id: "web-security", title: "Web Application Security", description: "OWASP, XSS, SQLi and vulnerabilities" },
  { id: "malware", title: "Malware Analysis", description: "Static & dynamic analysis, reverse engineering" },
  { id: "pentesting", title: "Penetration Testing", description: "Methodology, tools and reporting" },
  { id: "incident-response", title: "Incident Response", description: "Detection, containment and recovery" },
];

const cissTopics = [
  { id: "cissp-mindset", title: "Think Like a Manager", description: "Due diligence, due care, planning horizons and exam mindset" },
  { id: "cissp-domain1", title: "Domain 1: Security & Risk Management", description: "CIA Triad, risk analysis, NIST RMF, formulas and threat modelling" },
  { id: "cissp-domain2", title: "Domain 2: Asset Security", description: "Data lifecycle, classification, ownership, destruction and GDPR" },
  { id: "cissp-domain3", title: "Domain 3: Security Architecture & Engineering", description: "Security models, cryptography, zero trust, physical security" },
  { id: "cissp-domain4", title: "Domain 4: Communication & Network Security", description: "OSI model, TCP/UDP, firewalls, IDS/IPS, wireless and VPNs" },
  { id: "cissp-domain5", title: "Domain 5: Identity & Access Management", description: "Authentication factors, access control models, SSO, PAM" },
  { id: "cissp-domain6", title: "Domain 6: Security Assessment & Testing", description: "Vulnerability assessments, pentesting, SAST/DAST, audits" },
  { id: "cissp-domain7", title: "Domain 7: Security Operations", description: "Incident response, SIEM/SOAR, DR sites, chain of custody" },
  { id: "cissp-domain8", title: "Domain 8: Software Development Security", description: "Secure SDLC, SAST/DAST, CI/CD, database attacks, malware" },
];

export default function Home() {
  const [cissOpen, setCissOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "10px", color: "#6b7c2d" }}>
        Cyber Study
      </h1>
      <p style={{ color: "#555", marginBottom: "40px" }}>
        Select a topic to study
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
        gap: "20px",
      }}>
        {regularTopics.map((topic) => (
          <Link key={topic.id} href={`/topics/${topic.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                backgroundColor: "#ffffff",
                border: `1px solid ${hoveredId === topic.id ? "#6b7c2d" : "#ddd"}`,
                borderRadius: "12px",
                padding: "24px",
                cursor: "pointer",
                transition: "border-color 0.2s",
                height: "100%",
              }}
              onMouseEnter={() => setHoveredId(topic.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "8px", color: "#6b7c2d" }}>
                {topic.title}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#777" }}>
                {topic.description}
              </p>
            </div>
          </Link>
        ))}

        {/* CISSP parent tile — spans all columns */}
        <div
          style={{ gridColumn: "1 / -1" }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              border: `1px solid ${cissOpen || hoveredId === "cissp-group" ? "#6b7c2d" : "#ddd"}`,
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={() => setHoveredId("cissp-group")}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setCissOpen(!cissOpen)}
          >
            {/* Header row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px", color: "#6b7c2d" }}>
                  CISSP Exam Preparation
                </h2>
                <p style={{ fontSize: "0.85rem", color: "#777" }}>
                  {cissOpen
                    ? "8 domains + exam mindset"
                    : "8 domains + exam mindset — click to expand"}
                </p>
              </div>
              <span style={{
                fontSize: "1.1rem",
                color: "#6b7c2d",
                display: "inline-block",
                transition: "transform 0.2s",
                transform: cissOpen ? "rotate(180deg)" : "rotate(0deg)",
                marginLeft: "16px",
                flexShrink: 0,
              }}>
                ▾
              </span>
            </div>

            {/* Expanded inner grid */}
            {cissOpen && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: "14px",
                  marginTop: "20px",
                  paddingTop: "20px",
                  borderTop: "1px solid #ebebeb",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {cissTopics.map((topic) => (
                  <Link key={topic.id} href={`/topics/${topic.id}`} style={{ textDecoration: "none" }}>
                    <div
                      style={{
                        backgroundColor: "#f8f9f3",
                        border: `1px solid ${hoveredId === topic.id ? "#6b7c2d" : "#e0e0d8"}`,
                        borderRadius: "10px",
                        padding: "16px 18px",
                        cursor: "pointer",
                        transition: "border-color 0.2s",
                        height: "100%",
                      }}
                      onMouseEnter={() => setHoveredId(topic.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <h3 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "6px", color: "#6b7c2d" }}>
                        {topic.title}
                      </h3>
                      <p style={{ fontSize: "0.8rem", color: "#777" }}>
                        {topic.description}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
