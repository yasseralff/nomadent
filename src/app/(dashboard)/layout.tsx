import { Sidebar } from "@/components/shared/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex flex-row">
            <Sidebar />

            <main className="flex-1">
                {children}
            </main>
        </div>
    );
}