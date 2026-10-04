"use client";

import { useMemo, useState } from "react";

import { factoryData } from "../factoryData";

import {
  getFurnaceRecords,
  getFurnaceRecordStats,
} from "../largeMockData";

import FactoryCategoryList from "./FactoryCategoryList";
import FactoryCategoryRecords from "./FactoryCategoryRecords";
import FactoryRecordDetails from "./FactoryRecordDetails";
import FurnaceDataSection from "./FurnaceDataSection";

export default function FactoryInfoPanel({
  selectedObject,
  onClose,
}) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [
    {
      key: "machines",
      title: "ماشین‌آلات تولید",
      data: factoryData.machines,
    },
    {
      key: "furnaces",
      title: "کوره‌ها",
      data: factoryData.furnaces,
    },
    {
      key: "motors",
      title: "موتورها",
      data: factoryData.motors,
    },
    {
      key: "alloys",
      title: "آلیاژها",
      data: factoryData.alloys,
    },
    {
      key: "sensors",
      title: "سنسورها",
      data: factoryData.sensors,
    },
    {
      key: "production",
      title: "تولید",
      data: factoryData.production,
    },
    {
      key: "energy",
      title: "انرژی",
      data: factoryData.energy,
    },
    {
      key: "maintenance",
      title: "تعمیرات",
      data: factoryData.maintenance,
    },
    {
      key: "employees",
      title: "کارکنان",
      data: factoryData.employees,
    },
    {
      key: "departments",
      title: "دپارتمان‌ها",
      data: factoryData.departments,
    },
    {
      key: "safety",
      title: "ایمنی",
      data: factoryData.safety,
    },
  ];

  const furnaceRecords = useMemo(() => {
    if (
      selectedObject?.type !== "furnace" ||
      !selectedObject?.id
    ) {
      return [];
    }

    return getFurnaceRecords(selectedObject.id);
  }, [selectedObject]);

  const furnaceStats = useMemo(() => {
    if (
      selectedObject?.type !== "furnace" ||
      !selectedObject?.id
    ) {
      return null;
    }

    return getFurnaceRecordStats(selectedObject.id);
  }, [selectedObject]);

  const filteredFurnaceRecords = useMemo(() => {
    const normalizedSearch = search
      .trim()
      .toLowerCase();

    return furnaceRecords.filter((record) => {
      const matchesSearch =
        !normalizedSearch ||
        record.id
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        record.sensorLabel
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        record.sensorId
          ?.toLowerCase()
          .includes(normalizedSearch) ||
        record.batchNumber
          ?.toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        record.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [
    furnaceRecords,
    search,
    statusFilter,
  ]);

  const openCategory = (category) => {
    setActiveCategory(category);
    setSelectedRecord(null);
  };

  const closeCategory = () => {
    setActiveCategory(null);
    setSelectedRecord(null);
  };

  const openRecord = (record) => {
    setSelectedRecord(record);
  };

  const closeRecord = () => {
    setSelectedRecord(null);
  };

  /*
   * =========================================
   * NO SELECTED OBJECT
   * =========================================
   */

  if (!selectedObject) {
    return (
      <div className="absolute left-5 top-5 z-50 flex max-h-[calc(100vh-40px)] w-[380px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl">
        <div className="border-b border-white/10 px-5 py-5">
          <h2 className="text-lg font-bold">
            اطلاعات کارخانه
          </h2>
        </div>

        {!activeCategory && (
          <FactoryCategoryList
            categories={categories}
            onSelect={openCategory}
          />
        )}

        {activeCategory && !selectedRecord && (
          <FactoryCategoryRecords
            category={activeCategory}
            onBack={closeCategory}
            onSelect={openRecord}
          />
        )}

        {activeCategory && selectedRecord && (
          <FactoryRecordDetails
            record={selectedRecord}
            onBack={closeRecord}
          />
        )}
      </div>
    );
  }

  /*
   * =========================================
   * SELECTED OBJECT
   * =========================================
   */

  const data = selectedObject.data || {};
  const asset = data.asset || {};

  return (
    <div className="absolute left-5 top-5 z-50 flex max-h-[calc(100vh-40px)] w-[400px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950/95 text-white shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div>
          <h2 className="text-base font-bold">
            {asset.nameFa ||
              asset.name ||
              asset.nameEn ||
              selectedObject.title ||
              "تجهیز کارخانه"}
          </h2>

          {(asset.nameEn ||
            asset.code ||
            asset.id) && (
            <p className="mt-1 text-xs text-slate-500">
              {asset.nameEn ||
                asset.code ||
                asset.id}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-xl text-slate-400 transition hover:bg-red-500/20 hover:text-red-400"
        >
          ×
        </button>
      </div>

      <div className="overflow-y-auto p-5">
        {/* Furnace */}
        {selectedObject.type === "furnace" && (
          <>
            <FurnaceDataSection
              stats={furnaceStats}
              records={filteredFurnaceRecords}
              search={search}
              statusFilter={statusFilter}
              onSearchChange={setSearch}
              onStatusChange={setStatusFilter}
              onSelectRecord={setSelectedRecord}
            />

            {selectedRecord && (
              <FactoryRecordDetails
                record={selectedRecord}
                onClose={closeRecord}
              />
            )}
          </>
        )}

        {/* Normal asset */}
        <FactoryRecordDetails
          asset={asset}
          data={data}
          selectedObject={selectedObject}
          showHeader={false}
        />
      </div>
    </div>
  );
}

