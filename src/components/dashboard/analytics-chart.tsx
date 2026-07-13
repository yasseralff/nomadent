import React from "react";

export function AnalyticsChart() {
  return (
    <div className="lg:col-span-2 bg-surface-container rounded-3xl border border-outline-variant p-8 flex flex-col justify-between min-h-[350px]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold text-on-surface font-sora">Expense Analytics</h2>
          <p className="text-xs text-muted-foreground font-sans">Visual summary of your monthly spending habits</p>
        </div>
      </div>
      
      {/* Mock Chart Area */}
      <div className="flex-1 border border-dashed border-outline-variant/60 rounded-2xl flex flex-col items-center justify-center p-6 bg-surface-container-lowest/50">
        <div className="flex gap-4 items-end justify-center h-40 w-full max-w-sm">
          <div className="w-12 bg-primary/20 hover:bg-primary transition-colors rounded-t-lg h-[40%]" />
          <div className="w-12 bg-primary/30 hover:bg-primary transition-colors rounded-t-lg h-[60%]" />
          <div className="w-12 bg-primary/25 hover:bg-primary transition-colors rounded-t-lg h-[50%]" />
          <div className="w-12 bg-primary/45 hover:bg-primary transition-colors rounded-t-lg h-[85%]" />
          <div className="w-12 bg-primary hover:bg-primary/80 transition-colors rounded-t-lg h-[70%]" />
        </div>
        <div className="flex gap-4 justify-center w-full max-w-sm mt-3 text-[10px] text-muted-foreground uppercase font-sora font-semibold">
          <span className="w-12 text-center">Feb</span>
          <span className="w-12 text-center">Mar</span>
          <span className="w-12 text-center">Apr</span>
          <span className="w-12 text-center">May</span>
          <span className="w-12 text-center">Jun</span>
        </div>
      </div>
    </div>
  );
}
