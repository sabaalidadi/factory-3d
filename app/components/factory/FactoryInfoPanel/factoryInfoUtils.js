
export function formatLabel(key) {
  const labels = {
    id: "شناسه",
    _id: "شناسه",
    code: "کد",

    name: "نام",
    nameFa: "نام فارسی",
    nameEn: "نام انگلیسی",
    title: "عنوان",

    capacity: "ظرفیت",
    productionCapacity: "ظرفیت تولید",

    temperature: "دما",
    currentTemperature: "دمای فعلی",

    power: "توان",
    voltage: "ولتاژ",
    current: "جریان",

    efficiency: "راندمان",
    healthScore: "امتیاز سلامت",
    rpm: "دور موتور",
    pressure: "فشار",

    weight: "وزن",
    material: "جنس",
    model: "مدل",
    manufacturer: "سازنده",

    department: "واحد",
    departmentId: "شناسه واحد",

    location: "موقعیت",
    type: "نوع",
    status: "وضعیت",

    lastMaintenance: "آخرین تعمیر",
    nextMaintenance: "تعمیر بعدی",
    installationDate: "تاریخ نصب",

    operatingHours: "ساعات کار",
    cost: "هزینه",

    machineId: "شناسه ماشین",
    furnaceId: "شناسه کوره",
    motorId: "شناسه موتور",
    sensorId: "شناسه سنسور",
    assetId: "شناسه تجهیز",

    date: "تاریخ",
    timestamp: "زمان",

    quantity: "مقدار",
    unit: "واحد",
  };

  return labels[key] || key;
}

export function formatValue(value) {
  if (
    value === null ||
    value === undefined
  ) {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "بله" : "خیر";
  }

  if (typeof value === "number") {
    return value.toLocaleString("fa-IR");
  }

  return String(value);
}
