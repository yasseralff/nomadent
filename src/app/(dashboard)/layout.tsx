"use client";

import React, { useState } from "react";
import { Sidebar } from "@/components/shared/sidebar";
import { Navbar } from "@/components/shared/navbar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen w-full bg-background text-foreground flex p-4 md:p-6 gap-6 relative">
            {/* Desktop Sidebar (Floating Pod) */}
            <Sidebar className="hidden lg:flex w-52 shrink-0 h-[calc(100vh-48px)] sticky top-6" />

            {/* Mobile Drawer Sidebar */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 lg:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                    {/* Drawer Content */}
                    <Sidebar 
                        className="fixed left-4 top-4 bottom-4 w-60 z-50 lg:hidden shadow-2xl animate-in slide-in-from-left duration-300" 
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                </>
            )}

            {/* Main content viewport */}
            <div className="flex-1 flex flex-col gap-6 min-w-0">
                <Navbar onMenuClick={() => setIsMobileMenuOpen(true)} />
                <main className="flex-1 flex flex-col gap-6 min-h-0">
                    {children}
                </main>
            </div>
        </div>
    );
}