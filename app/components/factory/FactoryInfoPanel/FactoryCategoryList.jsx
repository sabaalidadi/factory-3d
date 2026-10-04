
"use client";

import { Eye } from "lucide-react";

export default function FactoryCategoryList({
  categories = [],
  onSelect,
}) {
  return (
    <div className="overflow-y-auto p-5">
      <div className="grid gap-2">
        {categories.map((category) => (
          <button
            key={category.key}
            type="button"
            onClick={() => onSelect(category)}
            className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-right transition hover:border-purple-500/40 hover:bg-purple-500/10"
          >
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-200 group-hover:text-white">
                <span>
                  {category.title}
                </span>

                <span className="text-[11px] text-slate-500">
                  {category.data?.length || 0} رکورد
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-xs text-slate-500 transition group-hover:text-purple-400">
              <span>مشاهده</span>

              <Eye
                size={15}
                strokeWidth={1.8}
                className="transition-transform group-hover:scale-110"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
