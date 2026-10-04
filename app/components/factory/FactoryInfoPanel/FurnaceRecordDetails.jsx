"use client";

import InfoRow from "./InfoRow";

export default function FurnaceRecordDetails({
  record,
  onClose,
}) {
  if (!record) {
    return null;
  }

  const statusClass =
    record.status === "critical"
      ? "bg-red-500/10 text-red-400"
      : record.status === "warning"
      ? "bg-yellow-500/10 text-yellow-400"
      : "bg-green-500/10 text-green-400";

  return (
    <section className="mt-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs font-medium text-green-400">
            SELECTED RECORD
          </div>

          <h3 className="mt-1 text-sm font-bold text-white">
            جزئیات رکورد
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
        >
          بستن
        </button>
      </div>

      <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-4">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div>
            <div className="text-base font-bold text-white">
              {record.sensorLabel}
            </div>

            <div className="mt-1 text-[11px] text-slate-500">
              {record.id}
            </div>
          </div>

          <div
            className={`rounded-lg px-3 py-2 text-[10px] ${statusClass}`}
          >
            {record.statusLabel}
          </div>
        </div>

        <div className="space-y-2">
          <InfoRow
            label="شناسه رکورد"
            value={record.id}
          />

          <InfoRow
            label="شناسه سنسور"
            value={record.sensorId}
          />

          <InfoRow
            label="نوع سنسور"
            value={record.sensorLabel}
          />

          <InfoRow
            label="مقدار"
            value={`${record.value?.toLocaleString(
              "fa-IR"
            )} ${record.unit || ""}`}
          />

          <InfoRow
            label="وضعیت"
            value={record.statusLabel}
          />

          <InfoRow
            label="اپراتور"
            value={record.operator}
          />

          <InfoRow
            label="موقعیت"
            value={record.location}
          />

          <InfoRow
            label="شماره بچ"
            value={record.batchNumber}
          />

          <InfoRow
            label="زمان ثبت"
            value={
              record.timestamp
                ? new Date(
                    record.timestamp
                  ).toLocaleString("fa-IR")
                : "-"
            }
          />
        </div>
      </div>
    </section>
  );
}
