"use client";

import { useState } from "react";
import Link from "next/link";
import { topics } from "@/data/subjects";

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

const baseFlashcards = cissTopics.flatMap((t) => {
  const topicData = topics.find((td) => td.id === t.id);
  return (topicData?.flashcards ?? []).map((fc) => ({
    question: fc.question,
    answer: fc.answer,
    topicTitle: t.title,
  }));
});

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Home() {
  const [tab, setTab] = useState<"reading" | "quiz">("reading");

  // Reading tab state
  const [cissOpen, setCissOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Quiz tab state
  const [cards, setCards] = useState(() => shuffleArray(baseFlashcards));
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizFlipped, setQuizFlipped] = useState(false);

  const card = cards[quizIdx];

  function handleShuffle() {
    setCards(shuffleArray(baseFlashcards));
    setQuizIdx(0);
    setQuizFlipped(false);
  }

  function handlePrev() {
    setQuizIdx((i) => Math.max(i - 1, 0));
    setQuizFlipped(false);
  }

  function handleNext() {
    setQuizIdx((i) => Math.min(i + 1, cards.length - 1));
    setQuizFlipped(false);
  }

  return (
    <main style={{ maxWidth: "900px", margin: "0 auto", padding: "60px 20px" }}>
      <h1 style={{ fontSize: "2rem", fontWeight: "700", marginBottom: "10px", color: "#1a7a5c" }}>
        Cyber Study
      </h1>
      <p style={{ color: "#555", marginBottom: "28px" }}>
        Select a topic to study
      </p>

      {/* Tabs */}
      <div style={{ display: "flex", gap: "4px", marginBottom: "24px" }}>
        {(["reading", "quiz"] as const).map((t) => {
          const labels = { reading: "Reading Material", quiz: "Quizzes" };
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: "8px 20px",
                border: `1px solid ${active ? "#1a7a5c" : "#ddd"}`,
                borderRadius: "6px",
                backgroundColor: active ? "#1a7a5c" : "#ffffff",
                color: active ? "#ffffff" : "#1a7a5c",
                fontWeight: "600",
                fontSize: "0.85rem",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {labels[t]}
            </button>
          );
        })}
      </div>

      {tab === "quiz" ? (
        /* ── Quiz tile ── */
        <div style={{
          backgroundColor: "#ffffff",
          border: "1px solid #ddd",
          borderRadius: "12px",
          overflow: "hidden",
        }}>
          {/* Header */}
          <div style={{
            backgroundColor: "#1a7a5c",
            color: "white",
            padding: "12px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}>
            <div>
              <span style={{ fontWeight: "600", fontSize: "0.9rem", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                CISSP Flashcards — All Domains
              </span>
              <span style={{ marginLeft: "12px", opacity: 0.8, fontSize: "0.8rem" }}>
                {quizIdx + 1} / {cards.length}
              </span>
            </div>
            <button
              onClick={handleShuffle}
              style={{
                background: "rgba(255,255,255,0.15)",
                border: "1px solid rgba(255,255,255,0.35)",
                borderRadius: "5px",
                color: "white",
                padding: "5px 12px",
                fontSize: "0.78rem",
                fontWeight: "600",
                cursor: "pointer",
                letterSpacing: "0.03em",
              }}
            >
              Shuffle
            </button>
          </div>

          {/* Domain label */}
          <div style={{
            padding: "7px 20px",
            backgroundColor: "#e8f5f0",
            borderBottom: "1px solid #e0e0d8",
            fontSize: "0.72rem",
            fontWeight: "700",
            color: "#156349",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}>
            {card.topicTitle}
          </div>

          {/* Card face */}
          <div
            onClick={() => setQuizFlipped((f) => !f)}
            style={{
              padding: "44px 40px",
              minHeight: "160px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              cursor: "pointer",
              backgroundColor: "#ffffff",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f1f9f6")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#ffffff")}
          >
            {quizFlipped ? (
              <>
                <p style={{
                  fontSize: "0.7rem",
                  color: "#1a7a5c",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: "700",
                }}>
                  Answer
                </p>
                <p style={{ fontSize: "0.95rem", color: "#1a1a1a", lineHeight: "1.65", maxWidth: "680px" }}>
                  {card.answer}
                </p>
              </>
            ) : (
              <>
                <p style={{
                  fontSize: "0.7rem",
                  color: "#aaa",
                  marginBottom: "14px",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontWeight: "700",
                }}>
                  Question — click to reveal
                </p>
                <p style={{ fontSize: "0.95rem", color: "#1a1a1a", lineHeight: "1.65", maxWidth: "680px" }}>
                  {card.question}
                </p>
              </>
            )}
          </div>

          {/* Navigation */}
          <div style={{
            display: "flex",
            borderTop: "1px solid #e0e0d8",
            backgroundColor: "#f1f9f6",
          }}>
            <button
              onClick={handlePrev}
              disabled={quizIdx === 0}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRight: "1px solid #e0e0d8",
                backgroundColor: "transparent",
                cursor: quizIdx === 0 ? "not-allowed" : "pointer",
                color: quizIdx === 0 ? "#ccc" : "#1a7a5c",
                fontSize: "0.88rem",
                fontWeight: "600",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={handleNext}
              disabled={quizIdx === cards.length - 1}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                backgroundColor: "transparent",
                cursor: quizIdx === cards.length - 1 ? "not-allowed" : "pointer",
                color: quizIdx === cards.length - 1 ? "#ccc" : "#1a7a5c",
                fontSize: "0.88rem",
                fontWeight: "600",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      ) : (
        /* ── Reading Material tile ── */
        <div
          style={{
            backgroundColor: "#ffffff",
            border: `1px solid ${cissOpen || hoveredId === "cissp-group" ? "#1a7a5c" : "#ddd"}`,
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
              <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "4px", color: "#1a7a5c" }}>
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
              color: "#1a7a5c",
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
                      backgroundColor: "#f1f9f6",
                      border: `1px solid ${hoveredId === topic.id ? "#1a7a5c" : "#e0e0d8"}`,
                      borderRadius: "10px",
                      padding: "16px 18px",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                      height: "100%",
                    }}
                    onMouseEnter={() => setHoveredId(topic.id)}
                    onMouseLeave={() => setHoveredId(null)}
                  >
                    <h3 style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "6px", color: "#1a7a5c" }}>
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

          {/* Sources */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              marginTop: "20px",
              paddingTop: "14px",
              borderTop: "1px solid #ebebeb",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              flexWrap: "wrap",
              fontSize: "0.78rem",
              color: "#aaa",
            }}
          >
            <span>Sources:</span>
            <a
              href="https://github.com/jefferywmoore/CISSP-Study-Resources/tree/main"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a7a5c", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              jefferywmoore/CISSP-Study-Resources
            </a>
            <span style={{ color: "#ddd" }}>·</span>
            <a
              href="https://www.youtube.com/watch?v=_nyZhYnCNLA&t=2s"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1a7a5c", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
            >
              Pete Zerger — CISSP Course (YouTube)
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
