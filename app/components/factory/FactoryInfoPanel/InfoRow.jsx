
"use client";

export default function InfoRow({
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2.5">
      <span className="text-xs text-slate-400">
        {label}
      </span>

      <span className="max-w-[210px] break-words text-left text-xs font-medium text-slate-200">
        {value}
      </span>
    </div>
  );
}
