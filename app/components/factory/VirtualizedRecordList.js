"use client";

import { useEffect, useMemo, useState } from "react";
import { List } from "react-window";

const PAGE_SIZE = 20;

export default function VirtualizedRecordList({ records = [], onSelect }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [paginationMode, setPaginationMode] = useState(false);

  const totalPages = Math.max(1, Math.ceil(records.length / PAGE_SIZE));

  useEffect(() => {
    setCurrentPage(1);
  }, [records]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const visibleRecords = useMemo(() => {
    if (!paginationMode) {
      return records;
    }

    const start = (currentPage - 1) * PAGE_SIZE;

    return records.slice(start, start + PAGE_SIZE);
  }, [records, paginationMode, currentPage]);

  const startRecord =
    records.length === 0
      ? 0
      : paginationMode
        ? (currentPage - 1) * PAGE_SIZE + 1
        : 1;

  const endRecord =
    records.length === 0
      ? 0
      : paginationMode
        ? Math.min(currentPage * PAGE_SIZE, records.length)
        : records.length;

  const changePage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) {
      return;
    }

    setCurrentPage(page);
  };

  const toggleMode = () => {
    setPaginationMode((value) => {
      const nextValue = !value;

      if (nextValue) {
        setCurrentPage(1);
      }

      return nextValue;
    });
  };

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-slate-900/40">
      {/* Top bar */}{" "}
      <div className="flex h-12 items-center justify-between border-b border-white/[0.06] px-3">
        {" "}
        <div className="flex items-center gap-2">
          {" "}
          <span className="h-1.5 w-1.5 rounded-full bg-purple-400" />
          <span className="text-[11px] font-medium text-slate-300">
            رکوردها
          </span>
          <span className="text-[10px] text-slate-600">
            {records.length.toLocaleString("fa-IR")}
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg border border-white/[0.07] bg-white/[0.025] p-1">
          <button
            type="button"
            onClick={() => {
              setPaginationMode(false);
              setCurrentPage(1);
            }}
            className={`rounded-md px-2.5 py-1.5 text-[10px] transition ${
              !paginationMode
                ? "bg-white/[0.08] text-slate-200 shadow-sm"
                : "text-slate-600 hover:text-slate-300"
            }`}
          >
            اسکرول
          </button>

          <button
            type="button"
            onClick={() => {
              setPaginationMode(true);
              setCurrentPage(1);
            }}
            className={`rounded-md px-2.5 py-1.5 text-[10px] transition ${
              paginationMode
                ? "bg-purple-500/15 text-purple-300 shadow-sm"
                : "text-slate-600 hover:text-slate-300"
            }`}
          >
            صفحه‌بندی
          </button>
        </div>
      </div>
      {/* List */}
      <div className="h-[390px] w-full">
        {visibleRecords.length > 0 ? (
          <List
            key={paginationMode ? `page-${currentPage}` : "scroll"}
            rowComponent={RecordRow}
            rowCount={visibleRecords.length}
            rowHeight={74}
            rowProps={{
              records: visibleRecords,
              onSelect,
            }}
            style={{
              width: "100%",
              height: "390px",
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-xs text-slate-600">رکوردی یافت نشد</span>
          </div>
        )}
      </div>
      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] px-3 py-2.5">
        {paginationMode ? (
          <div className="flex items-center justify-between gap-3">
            <div className="shrink-0 text-[10px] text-slate-600">
              {startRecord.toLocaleString("fa-IR")}
              {" - "}
              {endRecord.toLocaleString("fa-IR")}
              {" از "}
              {records.length.toLocaleString("fa-IR")}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onChange={changePage}
            />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-600">
              نمایش {records.length.toLocaleString("fa-IR")} رکورد
            </span>

            <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500/70" />
              اسکرول
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function RecordRow({ index, style, records, onSelect }) {
  const record = records[index];

  if (!record) {
    return null;
  }

  return (
    <div style={style} className="px-2 pb-2">
      <button
        type="button"
        onClick={() => onSelect?.(record)}
        className="group flex h-full w-full items-center justify-between gap-4 rounded-lg border border-white/[0.06] bg-white/[0.015] px-3 text-right transition duration-150 hover:border-purple-500/25 hover:bg-purple-500/[0.05]"
      >
        {/* Sensor information */}{" "}
        <div className="min-w-0 flex-1">
          {" "}
          <div className="flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${getStatusColor(
                record.status,
              )}`}
            />

            <span className="truncate text-[11px] font-medium text-slate-300 transition group-hover:text-white">
              {record.sensorLabel}
            </span>
          </div>
          <div className="mt-1 truncate text-[9px] text-slate-600">
            {record.id}
          </div>
        </div>
        {/* Value */}
        <div className="shrink-0 text-left">
          <div className="whitespace-nowrap text-xs font-semibold text-slate-200">
            {typeof record.value === "number"
              ? record.value.toLocaleString("fa-IR")
              : record.value}

            <span className="mr-1 text-[9px] font-normal text-slate-600">
              {record.unit}
            </span>
          </div>

          <div
            className={`mt-0.5 text-[9px] ${getStatusTextColor(record.status)}`}
          >
            {record.statusLabel}
          </div>
        </div>
      </button>
    </div>
  );
}

function Pagination({ currentPage, totalPages, onChange }) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className="flex items-center gap-0.5">
      <PageButton
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        ‹{" "}
      </PageButton>

      {pages.map((page, index) => {
        if (page === "...") {
          return (
            <span
              key={`dots-${index}`}
              className="px-1 text-[9px] text-slate-700"
            >
              …
            </span>
          );
        }

        return (
          <PageButton
            key={page}
            active={page === currentPage}
            onClick={() => onChange(page)}
          >
            {page.toLocaleString("fa-IR")}
          </PageButton>
        );
      })}

      <PageButton
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        ›
      </PageButton>

      <span className="mr-1 text-[9px] text-slate-600 text-white">
        {currentPage.toLocaleString("fa-IR")}
        {" / "}
        {totalPages.toLocaleString("fa-IR")}
      </span>
    </div>
  );
}

function PageButton({ children, active = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[10px] transition ${
        active
          ? "bg-white/10 text-white"
          : "text-slate-600 hover:bg-white/[0.05] hover:text-slate-300"
      } ${disabled ? "cursor-not-allowed opacity-20" : ""}`}
    >
      {children}{" "}
    </button>
  );
}

function getPaginationPages(currentPage, totalPages) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "...", currentPage, "...", totalPages];
}

function getStatusColor(status) {
  switch (status) {
    case "critical":
      return "bg-red-400";

    case "warning":
      return "bg-amber-400";

    default:
      return "bg-emerald-400";
  }
}

function getStatusTextColor(status) {
  switch (status) {
    case "critical":
      return "text-red-400";

    case "warning":
      return "text-amber-400";

    default:
      return "text-emerald-400";
  }
}
