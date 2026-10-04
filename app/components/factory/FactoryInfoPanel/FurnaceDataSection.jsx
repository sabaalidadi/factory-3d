
"use client";

import VirtualizedRecordList from "../VirtualizedRecordList";

export default function FurnaceDataSection({
  stats,
  records = [],
  search,
  statusFilter,
  onSearchChange,
  onStatusChange,
  onSelectRecord,
}) {
  const filters = [
    {
      value: "all",
      label: "همه",
    },
    {
      value: "normal",
      label: "نرمال",
    },
    {
      value: "warning",
      label: "هشدار",
    },
    {
      value: "critical",
      label: "بحرانی",
    },
  ];

  return (
    <section>
      <div className="mb-4">
        <h3 className="text-sm font-bold text-white">
          داده‌های سنسور کوره
        </h3>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-2">
        <StatCard
          label="کل"
          value={stats?.total}
        />

        <StatCard
          label="نرمال"
          value={stats?.normal}
          variant="success"
        />

        <StatCard
          label="بحرانی"
          value={stats?.critical}
          variant="danger"
        />
      </div>

      {/* Search */}
      <div className="mt-4">
        <input
          type="text"
          value={search}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="جستجو در 1000 رکورد..."
          className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs text-white outline-none placeholder:text-slate-600 transition focus:border-purple-500/50"
        />
      </div>

      {/* Filters */}
      <div className="mt-3 flex flex-wrap gap-2">
        {filters.map((filter) => {
          const active =
            statusFilter === filter.value;

          return (
            <button
              key={filter.value}
              type="button"
              onClick={() =>
                onStatusChange(filter.value)
              }
              className={
                active
                  ? "rounded-lg bg-purple-500 px-3 py-2 text-[10px] font-medium text-white shadow-lg shadow-purple-500/10"
                  : "rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
              }
            >
              {filter.label}
            </button>
          );
        })}
      </div>

      {/* Results */}
      <div className="mb-2 mt-4 flex items-center justify-between">
        <span className="text-[10px] text-slate-500">
          نتایج
        </span>

        <span className="text-[10px] text-purple-400">
          {records.length.toLocaleString("fa-IR")} رکورد
        </span>
      </div>

      {/* Virtualized List */}
      <VirtualizedRecordList
        records={records}
        onSelect={onSelectRecord}
      />
    </section>
  );
}

function StatCard({
  label,
  value,
  variant = "default",
}) {
  const variants = {
    default: {
      wrapper:
        "border-white/10 bg-white/[0.03]",
      value: "text-white",
    },

    success: {
      wrapper:
        "border-green-500/20 bg-green-500/5",
      value: "text-green-400",
    },

    danger: {
      wrapper:
        "border-red-500/20 bg-red-500/5",
      value: "text-red-400",
    },
  };

  const current =
    variants[variant] || variants.default;

  return (
    <div
      className={`rounded-xl border p-3 ${current.wrapper}`}
    >
      <div className="text-[10px] text-slate-500">
        {label}
      </div>

      <div
        className={`mt-1 text-sm font-bold ${current.value}`}
      >
        {value?.toLocaleString("fa-IR") || "۰"}
      </div>
    </div>
  );
}
