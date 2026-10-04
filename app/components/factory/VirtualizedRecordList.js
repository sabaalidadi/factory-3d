"use client";

import { List } from "react-window";

export default function VirtualizedRecordList({
  records = [],
  onSelect,
}) {
  const Row = ({ index, style }) => {
    const record = records[index];

    if (!record) {
      return null;
    }

    return (
      <div style={style} className="px-1 pb-2">
        <button
          type="button"
          onClick={() => onSelect?.(record)}
          className="w-full rounded-xl border border-white/10 bg-white/[0.03] p-3 text-right transition hover:border-purple-500/40 hover:bg-purple-500/10"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-medium text-slate-200">
                {record.sensorLabel}
              </div>

              <div className="mt-1 text-[11px] text-slate-500">
                {record.id}
              </div>
            </div>

            <div className="shrink-0 text-left">
              <div className="text-sm font-bold text-white">
                {record.value.toLocaleString("fa-IR")} {record.unit}
              </div>

              <div
                className={
                  record.status === "critical"
                    ? "mt-1 text-[10px] text-red-400"
                    : record.status === "warning"
                    ? "mt-1 text-[10px] text-yellow-400"
                    : "mt-1 text-[10px] text-green-400"
                }
              >
                {record.statusLabel}
              </div>
            </div>
          </div>
        </button>
      </div>
    );
  };

  return (
    <div className="h-[420px] w-full">
      <List
        rowComponent={Row}
        rowCount={records.length}
        rowHeight={78}
        rowProps={{}}
        style={{
          width: "100%",
          height: "420px",
        }}
      />
    </div>
  );
}