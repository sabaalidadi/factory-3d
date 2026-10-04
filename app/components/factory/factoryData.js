import factory from "../../../data/factory.json";
import departments from "../../../data/departments.json";
import furnaces from "../../../data/furnaces.json";
import motors from "../../../data/motors.json";
import alloys from "../../../data/alloys.json";
import machines from "../../../data/machines.json";
import production from "../../../data/production.json";
import energy from "../../../data/energy.json";
import maintenance from "../../../data/maintenance.json";
import employees from "../../../data/employees.json";
import safety from "../../../data/safety.json";
import sensors from "../../../data/sensors.json";

export const factoryData = {
  factory,
  departments,
  furnaces,
  motors,
  alloys,
  machines,
  production,
  energy,
  maintenance,
  employees,
  safety,
  sensors,
};

function getId(item) {
  return (
    item?.id ||
    item?._id ||
    item?.code ||
    item?.machineId ||
    item?.furnaceId ||
    item?.motorId ||
    item?.sensorId
  );
}

export function findById(collection, id) {
  if (!id || !Array.isArray(collection)) {
    return null;
  }

  return (
    collection.find(
      (item) => String(getId(item)) === String(id)
    ) || null
  );
}

export function findManyByIds(collection, ids = []) {
  if (!Array.isArray(ids)) {
    return [];
  }

  return ids
    .map((id) => findById(collection, id))
    .filter(Boolean);
}

function normalizeIds(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value;
  }

  return [value];
}

export function resolveMachine(machineId) {
  const machine = findById(
    factoryData.machines,
    machineId
  );

  if (!machine) {
    return null;
  }

  const motorId =
    machine.motorId ||
    machine.motor ||
    machine.motorRef;

  const departmentId =
    machine.departmentId ||
    machine.department ||
    machine.departmentRef;

  const furnaceId =
    machine.furnaceId ||
    machine.furnace ||
    machine.furnaceRef;

  const sensorIds =
    machine.sensorIds ||
    machine.sensors ||
    [];

  const maintenanceIds =
    machine.maintenanceIds ||
    machine.maintenance ||
    [];

  const machineProduction = factoryData.production.filter(
    (item) =>
      item.machineId === machine.id ||
      item.assetId === machine.id
  );

  const machineEnergy = factoryData.energy.filter(
    (item) =>
      item.machineId === machine.id ||
      item.assetId === machine.id
  );

  const machineMaintenance =
    maintenanceIds.length > 0
      ? findManyByIds(
          factoryData.maintenance,
          normalizeIds(maintenanceIds)
        )
      : factoryData.maintenance.filter(
          (item) =>
            item.machineId === machine.id ||
            item.assetId === machine.id
        );

  return {
    asset: machine,

    motor: findById(
      factoryData.motors,
      motorId
    ),

    department: findById(
      factoryData.departments,
      departmentId
    ),

    furnace: findById(
      factoryData.furnaces,
      furnaceId
    ),

    sensors:
      sensorIds.length > 0
        ? findManyByIds(
            factoryData.sensors,
            normalizeIds(sensorIds)
          )
        : factoryData.sensors.filter(
            (item) =>
              item.machineId === machine.id ||
              item.assetId === machine.id
          ),

    production: machineProduction,

    energy: machineEnergy,

    maintenance: machineMaintenance,
  };
}

export function resolveFurnace(furnaceId) {
  const furnace = findById(
    factoryData.furnaces,
    furnaceId
  );

  if (!furnace) {
    return null;
  }

  const sensorIds =
    furnace.sensorIds ||
    furnace.sensors ||
    [];

  const maintenanceIds =
    furnace.maintenanceIds ||
    furnace.maintenance ||
    [];

  return {
    asset: furnace,

    sensors:
      sensorIds.length > 0
        ? findManyByIds(
            factoryData.sensors,
            normalizeIds(sensorIds)
          )
        : factoryData.sensors.filter(
            (item) =>
              item.furnaceId === furnace.id ||
              item.assetId === furnace.id
          ),

    production: factoryData.production.filter(
      (item) =>
        item.furnaceId === furnace.id ||
        item.assetId === furnace.id
    ),

    energy: factoryData.energy.filter(
      (item) =>
        item.furnaceId === furnace.id ||
        item.assetId === furnace.id
    ),

    maintenance:
      maintenanceIds.length > 0
        ? findManyByIds(
            factoryData.maintenance,
            normalizeIds(maintenanceIds)
          )
        : factoryData.maintenance.filter(
            (item) =>
              item.furnaceId === furnace.id ||
              item.assetId === furnace.id
          ),
  };
}

export function resolveMotor(motorId) {
  const motor = findById(
    factoryData.motors,
    motorId
  );

  if (!motor) {
    return null;
  }

  return {
    asset: motor,

    machine: factoryData.machines.find(
      (item) =>
        item.motorId === motor.id
    ),

    sensors: factoryData.sensors.filter(
      (item) =>
        item.motorId === motor.id ||
        item.assetId === motor.id
    ),

    maintenance: factoryData.maintenance.filter(
      (item) =>
        item.motorId === motor.id ||
        item.assetId === motor.id
    ),

    energy: factoryData.energy.filter(
      (item) =>
        item.motorId === motor.id ||
        item.assetId === motor.id
    ),
  };
}

export function resolveAsset(type, id) {
  switch (type) {
    case "machine":
      return resolveMachine(id);

    case "furnace":
      return resolveFurnace(id);

    case "motor":
      return resolveMotor(id);

    default:
      return null;
  }
}