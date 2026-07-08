import { Sidebar } from "@/components/shared/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen">
            <Sidebar />
            {/* Offset for the fixed floating sidebar (~200px wide + 16px gap + 16px margin) */}
            <main className="pl-[232px] pr-6 py-6 min-h-screen">
                {children}
            </main>
        </div>
    );
}