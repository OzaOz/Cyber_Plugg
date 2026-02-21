"use client";

import Link from "next/link";

const topics = [
  { id: "networking", title: "Networking Fundamentals", description: "TCP/IP, DNS, firewalls and more" },
  { id: "cryptography", title: "Cryptography", description: "Encryption, hashing, PKI and protocols" },
  { id: "web-security", title: "Web Application Security", description: "OWASP, XSS, SQLi and vulnerabilities" },
  { id: "malware", title: "Malware Analysis", description: "Static & dynamic analysis, reverse engineering" },
  { id: "pentesting", title: "Penetration Testing", description: "Methodology, tools and reporting" },
  { id: "incident-response", title: "Incident Response", description: "Detection, containment and recovery" },
  { id: "cissp-mindset", title: "CISSP – Think Like a Manager", description: "Due diligence, due care, planning horizons and exam mindset" },
  { id: "cissp-domain1", title: "CISSP – Domain 1: Security & Risk Management", description: "CIA Triad, risk analysis, NIST RMF, formulas and threat modelling" },
  { id: "cissp-domain2", title: "CISSP – Domain 2: Asset Security", description: "Data lifecycle, classification, ownership, destruction and GDPR" },
  { id: "cissp-domain3", title: "CISSP – Domain 3: Security Architecture & Engineering", description: "Security models, cryptography, zero trust, physical security" },
  { id: "cissp-domain4", title: "CISSP – Domain 4: Communication & Network Security", description: "OSI model, TCP/UDP, firewalls, IDS/IPS, wireless and VPNs" },
  { id: "cissp-domain5", title: "CISSP – Domain 5: Identity & Access Management", description: "Authentication factors, access control models, SSO, PAM" },
  { id: "cissp-domain6", title: "CISSP – Domain 6: Security Assessment & Testing", description: "Vulnerability assessments, pentesting, SAST/DAST, audits" },
  { id: "cissp-domain7", title: "CISSP – Domain 7: Security Operations", description: "Incident response, SIEM/SOAR, DR sites, chain of custody" },
  { id: "cissp-domain8", title: "CISSP – Domain 8: Software Development Security", description: "Secure SDLC, SAST/DAST, CI/CD, database attacks, malware" },
];

export default function Home() {
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
        gap: "20px"
      }}>
        {topics.map((topic) => (
          <Link key={topic.id} href={`/topics/${topic.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              backgroundColor: "#ffffff",
              border: "1px solid #ddd",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = "#6b7c2d")}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#ddd")}
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
      </div>
    </main>
  );
}