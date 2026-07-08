// Server Component — no client-side hooks needed for a skeleton layout
export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Page header */}
      <div className="flex flex-row justify-between items-center">
        <div>
          <h1 className="font-semibold text-2xl text-on-surface">Dashboard</h1>
          <p className="text-sm text-on-surface-variant mt-0.5">
            Monitor your spending habits.
          </p>
        </div>
      </div>

      {/* Main content grid — placeholder cards until widgets are built */}
      <div className="flex flex-row gap-4">
        {/* Large card — expense chart placeholder */}
        <div className="w-2/3 h-[40vh] bg-surface-container rounded-2xl p-6 border border-outline-variant" />

        {/* Sidebar cards — task + goal placeholders */}
        <div className="w-1/3 h-[40vh] flex flex-col gap-4">
          <div className="h-1/2 bg-surface-container rounded-2xl p-6 border border-outline-variant" />
          <div className="h-1/2 bg-surface-container rounded-2xl p-6 border border-outline-variant" />
        </div>
      </div>

      {/* Second row — deadlines / quick actions placeholders */}
      <div className="flex flex-row gap-4">
        <div className="flex-1 h-32 bg-surface-container rounded-2xl p-6 border border-outline-variant" />
        <div className="flex-1 h-32 bg-surface-container rounded-2xl p-6 border border-outline-variant" />
      </div>
    </div>
  );
}
