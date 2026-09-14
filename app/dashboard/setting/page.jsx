"use client";

import React, { useState, useEffect } from "react";
import {
  UploadCloud,
  CheckCircle,
  Save,
  ExternalLink,
  ShieldCheck,
  Key,
  Server,
  Sparkles,
} from "lucide-react";
import { getCloudinaryConfig, saveCloudinaryConfig } from "@/lib/cloudinary";
import Swal from "sweetalert2";

export default function SettingPage() {
  const [cloudName, setCloudName] = useState("");
  const [uploadPreset, setUploadPreset] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const cfg = getCloudinaryConfig();
    setCloudName(cfg.cloudName);
    setUploadPreset(cfg.uploadPreset);
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    saveCloudinaryConfig(cloudName, uploadPreset);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);

    Swal.fire({
      icon: "success",
      title: "Cloudinary Configuration Saved",
      text: "Your Cloud Name and Upload Preset are now active for all image uploads.",
      confirmButtonColor: "#1C1917",
      timer: 2000,
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-stone-300">
        <span className="text-xs font-semibold tracking-[0.2em] text-amber-700 uppercase block">
          HOTEL RELEX CONCIERGE PREFERENCES
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif text-stone-900 font-normal mt-1">
          System & Media Settings
        </h1>
        <p className="text-stone-600 text-sm mt-1">
          Configure external cloud hosting services and administrative environment parameters.
        </p>
      </div>

      {/* Cloudinary Configuration Card */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-stone-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-semibold text-stone-900">
                Cloudinary Media Hosting
              </h2>
              <p className="text-xs text-stone-500 font-light">
                Direct browser-to-cloud file uploads with automatic image optimization and CDN delivery.
              </p>
            </div>
          </div>

          <a
            href="https://console.cloudinary.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-amber-800 hover:text-amber-950 uppercase tracking-wider font-semibold transition"
          >
            <span>Cloudinary Console</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Cloud Name *
              </label>
              <input
                type="text"
                value={cloudName}
                onChange={(e) => setCloudName(e.target.value)}
                placeholder="e.g. dxyz12345"
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition font-mono text-xs"
              />
              <p className="text-[11px] text-stone-400">
                Your unique Cloudinary cloud identifier from your dashboard.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs uppercase tracking-wider font-semibold text-stone-700 block">
                Unsigned Upload Preset *
              </label>
              <input
                type="text"
                value={uploadPreset}
                onChange={(e) => setUploadPreset(e.target.value)}
                placeholder="e.g. hotel_relex_unsigned"
                required
                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-300 rounded-sm text-sm focus:outline-none focus:border-stone-900 transition font-mono text-xs"
              />
              <p className="text-[11px] text-stone-400">
                Created in Cloudinary Settings → Upload → Upload Presets (Unsigned).
              </p>
            </div>
          </div>

          <div className="p-4 bg-stone-50 rounded-sm border border-stone-200 text-xs text-stone-600 space-y-2">
            <span className="font-semibold text-stone-800 block">
              How to create an Unsigned Upload Preset in Cloudinary:
            </span>
            <ol className="list-decimal list-inside space-y-1 text-stone-600 font-light">
              <li>Log in to your <a href="https://console.cloudinary.com" target="_blank" className="text-amber-800 underline">Cloudinary Console</a>.</li>
              <li>Click the <strong>Settings (Gear icon)</strong> at top right and select the <strong>Upload</strong> tab.</li>
              <li>Scroll down to <strong>Upload presets</strong> and click <strong>Add upload preset</strong>.</li>
              <li>Set <strong>Signing Mode</strong> to <span className="font-semibold text-stone-800">Unsigned</span> and copy the preset name.</li>
              <li>Paste the preset name and your Cloud Name into the fields above and click Save.</li>
            </ol>
          </div>

          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              {cloudName && uploadPreset ? (
                <div className="flex items-center gap-1.5 text-emerald-700 font-medium">
                  <CheckCircle className="w-4 h-4" />
                  <span>Cloudinary is active and ready for direct uploads</span>
                </div>
              ) : (
                <span className="text-amber-700 font-medium">
                  Enter credentials above to activate file uploads
                </span>
              )}
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 bg-stone-900 hover:bg-black text-amber-100 uppercase tracking-wider text-xs font-semibold rounded-sm transition flex items-center gap-2 shadow"
            >
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </button>
          </div>
        </form>
      </div>

      {/* Server & API Diagnostics */}
      <div className="bg-white p-6 sm:p-8 rounded-sm border border-stone-200 shadow-sm space-y-4">
        <h2 className="text-base font-serif font-semibold text-stone-900 flex items-center gap-2 pb-2 border-b border-stone-100">
          <Server className="w-4 h-4 text-stone-600" />
          <span>Connected Infrastructure & API Endpoints</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-stone-50 rounded-sm border border-stone-200 space-y-1">
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Backend Server</span>
            <span className="font-mono font-medium text-stone-800">http://localhost:5000</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-sm border border-stone-200 space-y-1">
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">MongoDB Status</span>
            <span className="text-emerald-700 font-medium">Connected (Atlas Cluster0)</span>
          </div>
          <div className="p-3 bg-stone-50 rounded-sm border border-stone-200 space-y-1">
            <span className="text-stone-400 uppercase tracking-wider block text-[10px]">Image Hosting</span>
            <span className="text-amber-800 font-medium">Cloudinary CDN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
