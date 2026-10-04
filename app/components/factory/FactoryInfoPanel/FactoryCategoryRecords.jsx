"use client";

import { Eye } from "lucide-react";

export default function FactoryCategoryRecords({
  category,
  onBack,
  onSelect,
}) {
  if (!category) {
    return null;
  }

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-purple-400 transition hover:text-purple-300"
        >
          بازگشت →
        </button>

        <div className="text-sm font-bold">
          {category.title}
        </div>
      </div>

      <div className="overflow-y-auto p-5">
        {category.data?.length > 0 ? (
          <div className="space-y-2">
            {category.data.map((item, index) => {
              const itemId =
                item?.id ||
                item?._id ||
                item?.code ||
                item?.machineId ||
                item?.furnaceId ||
                item?.motorId ||
                item?.sensorId ||
                index;

              const itemName =
                item?.nameFa ||
                item?.name ||
                item?.nameEn ||
                item?.title ||
                item?.code ||
                itemId;

              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => onSelect(item)}
                  className="group w-full rounded-xl border border-white/10 bg-white/[0.03] p-4 text-right transition hover:border-green-500/40 hover:bg-green-500/10"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-slate-200 group-hover:text-green-300">
                        {itemName}
                      </div>

                      <div className="mt-1 text-[11px] text-slate-500">
                        {itemId}
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-1.5 text-xs text-slate-500 transition group-hover:text-green-400">
                      <span>
                        مشاهده جزئیات
                      </span>

                      <Eye
                        size={15}
                        strokeWidth={1.8}
                        className="transition-transform group-hover:scale-110"
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-center text-xs text-slate-500">
            رکوردی برای نمایش وجود ندارد.
          </div>
        )}
      </div>
    </>
  );
}

