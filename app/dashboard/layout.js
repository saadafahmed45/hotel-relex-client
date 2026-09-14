"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ExternalLink, ShieldCheck, Sparkles } from "lucide-react";

export default function DashboardLayout({ children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === "/dashboard/manageHotel") return "Sanctuary Directory";
    if (pathname === "/dashboard/addHotel") return "Publish Sanctuary";
    if (pathname === "/dashboard/booking") return "Reservations Desk";
    if (pathname === "/dashboard/setting") return "System Settings";
    return "Executive Overview";
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] flex flex-col md:flex-row antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative z-50">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Executive Header Bar */}
        <header className="h-16 bg-white border-b border-stone-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          {/* Left: Mobile trigger & Breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
              className="p-2 text-stone-600 hover:text-stone-900 md:hidden"
              aria-label="Toggle Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs">
              <span className="text-stone-400 uppercase tracking-widest hidden sm:inline">
                Dashboard
              </span>
              <span className="text-stone-300 hidden sm:inline">/</span>
              <span className="font-serif text-sm sm:text-base font-semibold text-stone-900">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live System</span>
            </div>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-sm text-xs uppercase tracking-wider font-medium transition"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-500" />
            </Link>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
