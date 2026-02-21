"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { topics } from "@/data/subjects";

export default function TopicPage() {
  const { topic } = useParams();
  const router = useRouter();
  const topicData = topics.find((t) => t.id === topic);

  const [flipped, setFlipped] = useState<number | null>(null);
  const [current, setCurrent] = useState(0);

  if (!topicData) {
    return (
      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
        <p>Topic not found.</p>
      </main>
    );
  }

  const card = topicData.flashcards[current];

  return (
    <main style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 20px" }}>
      
      {/* Back button */}
      <button
        onClick={() => router.push("/")}
        style={{
          background: "none",
          border: "none",
          color: "#6b7c2d",
          cursor: "pointer",
          fontSize: "0.9rem",
          marginBottom: "32px",
          padding: "0",
        }}
      >
        ← Back
      </button>

      {/* Title */}
      <h1 style={{ fontSize: "1.8rem", fontWeight: "700", marginBottom: "40px", color: "#6b7c2d" }}>
        {topicData.title}
      </h1>

      {/* Study Notes */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", color: "#1a1a1a" }}>
          Study Notes
        </h2>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          {topicData.notes.map((note, i) => (
            <li
              key={i}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "14px 18px",
                fontSize: "0.95rem",
                color: "#333",
                lineHeight: "1.5",
              }}
            >
              {note}
            </li>
          ))}
        </ul>
      </section>

      {/* Flashcards */}
      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: "600", marginBottom: "16px", color: "#1a1a1a" }}>
          Flashcards
        </h2>
        <p style={{ fontSize: "0.85rem", color: "#888", marginBottom: "20px" }}>
          Card {current + 1} of {topicData.flashcards.length} — click the card to reveal the answer
        </p>

        {/* Card */}
        <div
          onClick={() => setFlipped(flipped === current ? null : current)}
          style={{
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "40px",
            cursor: "pointer",
            minHeight: "160px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: "20px",
            transition: "border-color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#6b7c2d")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#ddd")}
        >
          {flipped === current ? (
            <>
              <p style={{ fontSize: "0.75rem", color: "#6b7c2d", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Answer</p>
              <p style={{ fontSize: "1rem", color: "#1a1a1a", lineHeight: "1.6" }}>{card.answer}</p>
            </>
          ) : (
            <>
              <p style={{ fontSize: "0.75rem", color: "#888", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Question</p>
              <p style={{ fontSize: "1rem", color: "#1a1a1a", lineHeight: "1.6" }}>{card.question}</p>
            </>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button
            onClick={() => { setCurrent((prev) => Math.max(prev - 1, 0)); setFlipped(null); }}
            disabled={current === 0}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              cursor: current === 0 ? "not-allowed" : "pointer",
              color: current === 0 ? "#bbb" : "#1a1a1a",
              fontSize: "0.9rem",
            }}
          >
            Previous
          </button>
          <button
            onClick={() => { setCurrent((prev) => Math.min(prev + 1, topicData.flashcards.length - 1)); setFlipped(null); }}
            disabled={current === topicData.flashcards.length - 1}
            style={{
              padding: "10px 24px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              backgroundColor: "#fff",
              cursor: current === topicData.flashcards.length - 1 ? "not-allowed" : "pointer",
              color: current === topicData.flashcards.length - 1 ? "#bbb" : "#1a1a1a",
              fontSize: "0.9rem",
            }}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}