"use client";

import React from "react";

export default function DeadlinesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div id="header" className="flex flex-row justify-between items-center w-full">
        <div>
          <p
            className="font-semibold text-2xl"
            style={{ fontFamily: "var(--font-sora)", color: "var(--on-surface)" }}
          >
            Deadlines
          </p>
          <p className="font-light text-sm" style={{ color: "var(--on-surface-variant)" }}>
            Visa, insurance, and immigration dates — the ones that actually matter.
          </p>
        </div>
        <button
          onClick={() => {
            console.log("add deadline");
          }}
          className="flex flex-row items-center gap-2 cursor-pointer px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: "var(--primary)",
            color: "var(--primary-foreground)",
            fontFamily: "var(--font-sora)",
          }}
        >
          <span>+</span>
          <span>Add Deadline</span>
        </button>
      </div>

      {/* Placeholder content — to be replaced with DeadlineList component */}
      <div
        className="rounded-2xl p-6 border"
        style={{
          background: "var(--card)",
          borderColor: "var(--outline-variant)",
        }}
      >
        <p style={{ color: "var(--on-surface-variant)" }} className="text-sm">
          No deadlines yet. Add a visa, insurance, or other important date to get started.
        </p>
      </div>
    </div>
  );
}
