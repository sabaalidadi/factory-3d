const SENSOR_TYPES = [
  {
    type: "temperature",
    label: "دما",
    unit: "°C",
    min: 850,
    max: 1350,
  },
  {
    type: "pressure",
    label: "فشار",
    unit: "bar",
    min: 8,
    max: 25,
  },
  {
    type: "vibration",
    label: "لرزش",
    unit: "mm/s",
    min: 1,
    max: 12,
  },
  {
    type: "power",
    label: "توان مصرفی",
    unit: "kW",
    min: 400,
    max: 1200,
  },
];

const STATUSES = [
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

function randomBetween(min, max) {
  return Math.round(
    Math.random() * (max - min) + min
  );
}

function getRandomStatus(index) {
  if (index % 17 === 0) {
    return STATUSES[2];
  }

  if (index % 7 === 0) {
    return STATUSES[1];
  }

  return STATUSES[0];
}

function generateFurnaceRecords(furnaceId, count = 1000) {
  return Array.from({ length: count }, (_, index) => {
    const sensor =
      SENSOR_TYPES[index % SENSOR_TYPES.length];

    const status = getRandomStatus(index);

    const value = randomBetween(
      sensor.min,
      sensor.max
    );

    const timestamp = new Date(
      Date.now() - index * 60 * 1000
    );

    return {
      id: `${furnaceId}-REC-${String(index + 1).padStart(4, "0")}`,

      furnaceId,

      sensorId: `SEN-${String(
        (index % 10) + 1
      ).padStart(4, "0")}`,

      sensorType: sensor.type,

      sensorLabel: sensor.label,

      value,

      unit: sensor.unit,

      status: status.value,

      statusLabel: status.label,

      timestamp: timestamp.toISOString(),

      operator: `اپراتور ${String(
        (index % 12) + 1
      ).padStart(2, "0")}`,

      location: `ناحیه تولید ${(
        (index % 5) +
        1
      ).toString()}`,

      batchNumber: `BATCH-${String(
        (index % 50) + 1
      ).padStart(3, "0")}`,
    };
  });
}

const furnaceRecords = {
  "FUR-001": generateFurnaceRecords(
    "FUR-001",
    1000
  ),

  "FUR-002": generateFurnaceRecords(
    "FUR-002",
    1000
  ),

  "FUR-003": generateFurnaceRecords(
    "FUR-003",
    1000
  ),

  "FUR-004": generateFurnaceRecords(
    "FUR-004",
    1000
  ),

  "FUR-005": generateFurnaceRecords(
    "FUR-005",
    1000
  ),
};

export function getFurnaceRecords(furnaceId) {
  return furnaceRecords[furnaceId] || [];
}

export function getFurnaceRecordStats(furnaceId) {
  const records = getFurnaceRecords(furnaceId);

  return {
    total: records.length,

    normal: records.filter(
      (item) => item.status === "normal"
    ).length,

    warning: records.filter(
      (item) => item.status === "warning"
    ).length,

    critical: records.filter(
      (item) => item.status === "critical"
    ).length,
  };
}