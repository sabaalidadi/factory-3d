
"use client";

import InfoRow from "./InfoRow";
import {
  formatLabel,
  formatValue,
} from "./factoryInfoUtils";

export default function FactoryRecordDetails({
  asset = {},
  data = {},
  selectedObject,
  showHeader = true,
  record,
  onBack,
}) {

  if (record) {
    return (
      <>
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <button
            type="button"
            onClick={onBack}
            className="text-xs text-purple-400 transition hover:text-purple-300"
          >
            بازگشت / لیست →
          </button>

          <div className="text-sm font-bold">
            جزئیات
          </div>
        </div>

        <div className="overflow-y-auto p-5">
          <div className="space-y-2">
            {Object.entries(record).map(
              ([key, value]) => {
                if (
                  value === null ||
                  value === undefined
                ) {
                  return null;
                }

                if (
                  typeof value === "object"
                ) {
                  return (
                    <div
                      key={key}
                      className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-3"
                    >
                      <div className="mb-3 text-xs font-bold text-purple-400">
                        {formatLabel(key)}
                      </div>

                      <div className="space-y-2">
                        {Object.entries(
                          value
                        ).map(
                          ([
                            childKey,
                            childValue,
                          ]) => {
                            if (
                              childValue ===
                                null ||
                              childValue ===
                                undefined
                            ) {
                              return null;
                            }

                            return (
                              <InfoRow
                                key={childKey}
                                label={formatLabel(
                                  childKey
                                )}
                                value={formatValue(
                                  childValue
                                )}
                              />
                            );
                          }
                        )}
                      </div>
                    </div>
                  );
                }

                return (
                  <InfoRow
                    key={key}
                    label={formatLabel(key)}
                    value={formatValue(value)}
                  />
                );
              }
            )}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Asset */}
      {Object.keys(asset).length > 0 && (
        <section className="mt-6">
          {showHeader && (
            <h3 className="mb-3 text-sm font-bold text-white">
              اطلاعات تجهیز
            </h3>
          )}

          <div className="space-y-2">
            {Object.entries(asset).map(
              ([key, value]) => {
                if (
                  value === null ||
                  value === undefined ||
                  typeof value === "object" ||
                  key === "name" ||
                  key === "nameFa" ||
                  key === "nameEn"
                ) {
                  return null;
                }

                return (
                  <InfoRow
                    key={key}
                    label={formatLabel(key)}
                    value={formatValue(value)}
                  />
                );
              }
            )}
          </div>
        </section>
      )}

      {/* Related Data */}
      {Object.entries(data).map(
        ([key, value]) => {
          if (
            key === "asset" ||
            value === null ||
            value === undefined
          ) {
            return null;
          }

        
          if (
            selectedObject?.type === "furnace" &&
            [
              "sensors",
              "production",
              "energy",
              "maintenance",
            ].includes(key)
          ) {
            return null;
          }

          if (Array.isArray(value)) {
            if (value.length === 0) {
              return null;
            }

            return (
              <section
                key={key}
                className="mt-6"
              >
                <h3 className="mb-3 text-sm font-bold text-white">
                  {formatLabel(key)}
                </h3>

                <div className="space-y-2">
                  {value.map(
                    (item, index) => {
                      const itemKey =
                        item?.id ||
                        item?._id ||
                        item?.code ||
                        index;

                      return (
                        <div
                          key={itemKey}
                          className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                        >
                          {typeof item ===
                          "object" ? (
                            Object.entries(
                              item
                            ).map(
                              ([
                                childKey,
                                childValue,
                              ]) => {
                                if (
                                  childValue ===
                                    null ||
                                  childValue ===
                                    undefined ||
                                  typeof childValue ===
                                    "object"
                                ) {
                                  return null;
                                }

                                return (
                                  <InfoRow
                                    key={
                                      childKey
                                    }
                                    label={formatLabel(
                                      childKey
                                    )}
                                    value={formatValue(
                                      childValue
                                    )}
                                  />
                                );
                              }
                            )
                          ) : (
                            <span className="text-xs text-slate-200">
                              {formatValue(item)}
                            </span>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </section>
            );
          }

          if (
            typeof value === "object"
          ) {
            return (
              <section
                key={key}
                className="mt-6"
              >
                <h3 className="mb-3 text-sm font-bold text-white">
                  {formatLabel(key)}
                </h3>

                <div className="space-y-2">
                  {Object.entries(
                    value
                  ).map(
                    ([
                      childKey,
                      childValue,
                    ]) => {
                      if (
                        childValue ===
                          null ||
                        childValue ===
                          undefined ||
                        typeof childValue ===
                          "object"
                      ) {
                        return null;
                      }

                      return (
                        <InfoRow
                          key={childKey}
                          label={formatLabel(
                            childKey
                          )}
                          value={formatValue(
                            childValue
                          )}
                        />
                      );
                    }
                  )}
                </div>
              </section>
            );
          }

          return null;
        }
      )}
    </>
  );
}
