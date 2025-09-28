"use client";

import Image from "next/image";

export default function SettingsHiringTemplatesPage() {
  return (
    <section className="rounded-xl border border-[#e5e7eb] bg-white shadow-sm">
      <div className="block md:flex items-center justify-between gap-4 px-4 sm:px-6 py-4 border-b border-[#eef2f7]">
        <div className="block items-center justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-semibold text-[#1f2937]">Templates</h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-[#6b7280] max-w-3xl">
            Save your hiring preferences as a template to apply them instantly to your next hire. Templates can help reduce your time to hire and
            promote consistent, fair hiring policies around the world.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border mt-4 md:mt-0 px-4 py-2 text-sm font-medium text-[#5E2A8C] border-[#5E2A8C] hover:bg-[#5E2A8C] hover:text-white active:bg-[#4c1d95] transition-colors"
          aria-label="Create new hiring template"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          New template
        </button>
      </div>

      <div className="px-4 sm:px-6 py-10 sm:py-16">
        <div className="mx-auto flex max-w-md flex-col items-center text-center">
          <Image src="/scope.png" alt="Empty templates" width={180} height={150} className="h-auto w-[126px] sm:w-[180px]" />
          <h3 className="mt-6 text-sm sm:text-base font-semibold text-[#111827]">You haven’t created any hiring templates</h3>
          <p className="mt-2 text-xs sm:text-sm text-[#6b7280]">You can create and manage hiring templates here</p>
        </div>
      </div>
    </section>
  );
}



