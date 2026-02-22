"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { topics } from "@/data/subjects";

function renderCell(value: string): React.ReactNode {
  if (!value.includes("`")) return value;
  const parts = value.split(/`([^`]+)`/);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <code key={i} style={{
            fontFamily: "'Geist Mono', 'Courier New', monospace",
            backgroundColor: "#eef0f6",
            color: "#3d4f15",
            padding: "1px 5px",
            borderRadius: "3px",
            fontSize: "0.82em",
          }}>
            {part}
          </code>
        ) : part
      )}
    </>
  );
}

function parseNote(note: string): { term: string; body: string } | null {
  const colonIdx = note.indexOf(": ");
  if (colonIdx !== -1 && colonIdx <= 65) {
    return { term: note.slice(0, colonIdx), body: note.slice(colonIdx + 2) };
  }
  return null;
}

export default function TopicPage() {
  const { topic } = useParams();
  const router = useRouter();
  const topicData = topics.find((t) => t.id === topic);

  const [flipped, setFlipped] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  if (!topicData) {
    return (
      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 20px" }}>
        <p>Topic not found.</p>
      </main>
    );
  }

  const card = topicData.flashcards[current];
  const hasSections = topicData.sections && topicData.sections.length > 0;

  return (
    <main style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 20px" }}>

      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        style={{
          background: "none",
          border: "none",
          color: "#6b7c2d",
          cursor: "pointer",
          fontSize: "0.9rem",
          marginBottom: "28px",
          padding: "0",
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <h1 style={{ fontSize: "1.7rem", fontWeight: "700", marginBottom: "36px", color: "#6b7c2d" }}>
        {topicData.title}
      </h1>

      {/* Study Notes */}
      <section style={{ marginBottom: "48px" }}>
        <div style={{
          backgroundColor: "#6b7c2d",
          color: "white",
          padding: "9px 16px",
          borderRadius: "6px 6px 0 0",
          fontWeight: "600",
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}>
          Study Notes
        </div>

        {hasSections ? (
          /* ── Rich sectioned table layout ── */
          <div style={{
            border: "1px solid #ddd",
            borderTop: "none",
            borderRadius: "0 0 6px 6px",
            overflow: "hidden",
          }}>
            {topicData.sections!.map((section, sIdx) => (
              <div
                key={sIdx}
                style={{
                  borderBottom: sIdx < topicData.sections!.length - 1 ? "1px solid #ccc" : "none",
                }}
              >
                {/* Section label */}
                <div style={{
                  padding: "8px 16px",
                  backgroundColor: "#f0f3e6",
                  fontSize: "0.71rem",
                  fontWeight: "700",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#5a6b22",
                  borderBottom: "1px solid #ccc",
                }}>
                  {section.heading}
                </div>

                {/* Column headers */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: `repeat(${section.columns.length}, 1fr)`,
                  backgroundColor: "#fafbf6",
                  borderBottom: "1px solid #e0e0d8",
                }}>
                  {section.columns.map((col, cIdx) => (
                    <div key={cIdx} style={{
                      padding: "6px 14px",
                      fontSize: "0.72rem",
                      fontWeight: "700",
                      color: "#6b7c2d",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      borderRight: cIdx < section.columns.length - 1 ? "1px solid #e0e0d8" : "none",
                    }}>
                      {col}
                    </div>
                  ))}
                </div>

                {/* Data rows */}
                {section.rows.map((row, rIdx) => (
                  <div key={rIdx} style={{
                    display: "grid",
                    gridTemplateColumns: `repeat(${section.columns.length}, 1fr)`,
                    backgroundColor: rIdx % 2 === 0 ? "#ffffff" : "#f8f9f3",
                    borderTop: "1px solid #ebebeb",
                  }}>
                    {row.map((cell, cIdx) => (
                      <div key={cIdx} style={{
                        padding: "9px 14px",
                        fontSize: "0.85rem",
                        color: cIdx === 0 ? "#3d4f15" : "#2a2a2a",
                        fontWeight: cIdx === 0 ? "600" : "400",
                        lineHeight: "1.55",
                        borderRight: cIdx < row.length - 1 ? "1px solid #ebebeb" : "none",
                      }}>
                        {renderCell(cell)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ) : (
          /* ── Flat notes fallback (all other topics) ── */
          <>
            <div style={{
              display: "flex",
              backgroundColor: "#f0f3e6",
              borderLeft: "1px solid #ddd",
              borderRight: "1px solid #ddd",
              borderBottom: "1px solid #ccc",
            }}>
              <div style={{
                width: "230px",
                minWidth: "230px",
                padding: "7px 16px",
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#5a6b22",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                borderRight: "1px solid #ddd",
              }}>
                Concept
              </div>
              <div style={{
                flex: 1,
                padding: "7px 16px",
                fontSize: "0.75rem",
                fontWeight: "700",
                color: "#5a6b22",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}>
                Description
              </div>
            </div>

            <div style={{
              border: "1px solid #ddd",
              borderTop: "none",
              borderRadius: "0 0 6px 6px",
              overflow: "hidden",
            }}>
              {topicData.notes.map((note, i) => {
                const parsed = parseNote(note);
                const rowBg = i % 2 === 0 ? "#ffffff" : "#f8f9f3";
                return (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      backgroundColor: rowBg,
                      borderTop: i === 0 ? "none" : "1px solid #ebebeb",
                    }}
                  >
                    {parsed ? (
                      <>
                        <div style={{
                          width: "230px",
                          minWidth: "230px",
                          padding: "10px 16px",
                          fontWeight: "700",
                          color: "#3d4f15",
                          fontSize: "0.85rem",
                          lineHeight: "1.45",
                          borderRight: "1px solid #e0e0d8",
                        }}>
                          {parsed.term}
                        </div>
                        <div style={{
                          flex: 1,
                          padding: "10px 16px",
                          color: "#2a2a2a",
                          fontSize: "0.875rem",
                          lineHeight: "1.65",
                        }}>
                          {parsed.body}
                        </div>
                      </>
                    ) : (
                      <div style={{
                        flex: 1,
                        padding: "10px 16px",
                        color: "#2a2a2a",
                        fontSize: "0.875rem",
                        lineHeight: "1.65",
                        fontStyle: "italic",
                      }}>
                        {note}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* Flashcards */}
      <section>
        <div style={{
          backgroundColor: "#6b7c2d",
          color: "white",
          padding: "9px 16px",
          borderRadius: "6px 6px 0 0",
          fontWeight: "600",
          fontSize: "0.85rem",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
          <span>Flashcards</span>
          <span style={{ fontWeight: "400", opacity: 0.85, fontSize: "0.8rem" }}>
            {current + 1} / {topicData.flashcards.length}
          </span>
        </div>

        <div style={{
          border: "1px solid #ddd",
          borderTop: "none",
          borderRadius: "0 0 6px 6px",
          overflow: "hidden",
        }}>
          {/* Card face */}
          <div
            onClick={() => setFlipped(flipped === current ? null : current)}
            style={{
              backgroundColor: "#ffffff",
              padding: "40px",
              cursor: "pointer",
              minHeight: "150px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#f8f9f3")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ffffff")}
          >
            {flipped === current ? (
              <>
                <p style={{
                  fontSize: "0.7rem",
                  color: "#6b7c2d",
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

          {/* Navigation bar */}
          <div style={{
            display: "flex",
            borderTop: "1px solid #e0e0d8",
            backgroundColor: "#f8f9f3",
          }}>
            <button
              onClick={() => { setCurrent((prev) => Math.max(prev - 1, 0)); setFlipped(null); }}
              disabled={current === 0}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                borderRight: "1px solid #e0e0d8",
                backgroundColor: "transparent",
                cursor: current === 0 ? "not-allowed" : "pointer",
                color: current === 0 ? "#ccc" : "#6b7c2d",
                fontSize: "0.88rem",
                fontWeight: "600",
              }}
            >
              ← Previous
            </button>
            <button
              onClick={() => { setCurrent((prev) => Math.min(prev + 1, topicData.flashcards.length - 1)); setFlipped(null); }}
              disabled={current === topicData.flashcards.length - 1}
              style={{
                flex: 1,
                padding: "12px",
                border: "none",
                backgroundColor: "transparent",
                cursor: current === topicData.flashcards.length - 1 ? "not-allowed" : "pointer",
                color: current === topicData.flashcards.length - 1 ? "#ccc" : "#6b7c2d",
                fontSize: "0.88rem",
                fontWeight: "600",
              }}
            >
              Next →
            </button>
          </div>
        </div>
      </section>

    </main>
  );
}
