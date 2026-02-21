"use client";

import Link from "next/link";

const topics = [
  { id: "networking", title: "Networking Fundamentals", description: "TCP/IP, DNS, firewalls and more" },
  { id: "cryptography", title: "Cryptography", description: "Encryption, hashing, PKI and protocols" },
  { id: "web-security", title: "Web Application Security", description: "OWASP, XSS, SQLi and vulnerabilities" },
  { id: "malware", title: "Malware Analysis", description: "Static & dynamic analysis, reverse engineering" },
  { id: "pentesting", title: "Penetration Testing", description: "Methodology, tools and reporting" },
  { id: "incident-response", title: "Incident Response", description: "Detection, containment and recovery" },
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