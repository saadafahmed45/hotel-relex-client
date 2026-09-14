"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  PlusCircle,
  CalendarCheck,
  Sliders,
  ArrowUpRight,
  Sparkles,
  ShieldCheck,
  Compass,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      name: "Manage Sanctuaries",
      href: "/dashboard/manageHotel",
      icon: BedDouble,
    },
    {
      name: "Add Sanctuary",
      href: "/dashboard/addHotel",
      icon: PlusCircle,
    },
    {
      name: "Reservations",
      href: "/dashboard/booking",
      icon: CalendarCheck,
    },
    {
      name: "Settings",
      href: "/dashboard/setting",
      icon: Sliders,
    },
  ];

  const isActive = (item) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname.startsWith(item.href);
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-[#141210] border-r border-[#262320] flex flex-col justify-between min-h-screen text-stone-300 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-[#262320]">
        <Link href="/" className="group block space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold tracking-widest text-white group-hover:text-amber-300 transition">
              HOTEL RELEX
            </span>
          </div>
          <span className="text-[9px] font-semibold tracking-[0.25em] uppercase text-amber-400/90 block">
            CONCIERGE CMS & SUITE
          </span>
        </Link>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 py-6 px-3 space-y-6 overflow-y-auto">
        {/* Main Portal Links */}
        <div className="space-y-1.5">
          <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            MANAGEMENT
          </span>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase transition-all duration-200 ${
                    active
                      ? "bg-[#231F1C] text-amber-300 border-l-2 border-amber-400 shadow-sm"
                      : "text-stone-400 hover:text-stone-100 hover:bg-[#1C1917]"
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 ${
                      active ? "text-amber-400" : "text-stone-500"
                    }`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Public Website Shortcuts */}
        <div className="space-y-1.5 pt-4 border-t border-[#262320]">
          <span className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-500 block">
            PUBLIC SANCTUARY
          </span>
          <nav className="space-y-1">
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase text-stone-400 hover:text-stone-100 hover:bg-[#1C1917] transition"
            >
              <div className="flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Live Website</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </Link>

            <Link
              href="/rooms"
              target="_blank"
              className="flex items-center justify-between px-3.5 py-2.5 rounded-sm text-xs font-medium tracking-wider uppercase text-stone-400 hover:text-stone-100 hover:bg-[#1C1917] transition"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-stone-400" />
                <span>Guest Catalog</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </Link>
          </nav>
        </div>
      </div>

      {/* Footer Profile & Live Status */}
      <div className="p-4 border-t border-[#262320] bg-[#0E0D0C] space-y-3">
        {/* System Status Pill */}
        <div className="flex items-center justify-between px-2 py-1.5 rounded-sm bg-[#181614] border border-[#2A2724] text-[10px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-stone-300">MongoDB Live</span>
          </div>
          <span className="text-stone-500 font-mono">5000</span>
        </div>

        {/* User Card */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-9 h-9 rounded-full bg-amber-700/30 border border-amber-500/50 flex items-center justify-center text-amber-300 font-serif font-bold text-xs">
            SA
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium text-stone-200 truncate">
              Saad Ahmed
            </p>
            <p className="text-[10px] text-stone-500 truncate uppercase tracking-wider">
              General Manager
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
