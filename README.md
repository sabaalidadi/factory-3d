# 🏭 3D Factory Monitoring Dashboard

A modern **3D industrial factory monitoring dashboard** built with **Next.js, React Three Fiber, Three.js and Tailwind CSS**.

This project demonstrates how a web application can combine an interactive 3D factory environment with structured industrial data, object-based navigation, search/filtering, and efficient rendering of large datasets.

---

## ✨ Features

* 🏭 Interactive 3D factory environment
* ⚙️ Interactive machines, furnaces and motors
* 🖱️ Click on 3D objects to inspect their data
* 📊 Industrial monitoring data visualization
* 🔎 Search and filtering for large datasets
* 🚀 Virtualized rendering with `react-window`
* 📦 Support for large datasets with 1000+ records
* 📋 Detailed record inspection
* 🧩 Modular and reusable React components
* 🎨 Modern dark industrial UI
* 📱 Responsive information panels
* ⚡ Client-side optimized rendering
* 🗂️ Structured JSON-based industrial data

---

## 🛠️ Tech Stack

### Frontend

* **Next.js**
* **React**
* **JavaScript**
* **Tailwind CSS**

### 3D

* **Three.js**
* **React Three Fiber**
* **@react-three/drei**

### Data & Performance

* JSON datasets
* `react-window`
* Memoized filtering and derived data with `useMemo`

---

## 🧠 Main Concept

The main purpose of this project is to demonstrate an efficient approach for handling large industrial datasets inside a 3D monitoring interface.

The application follows this flow:

```text
3D Object
    ↓
Object ID
    ↓
Data Resolver
    ↓
Related Dataset
    ↓
Search / Filter
    ↓
Virtualized List
    ↓
Record Details
```

For example, when a user selects a furnace:

```text
Furnace FUR-001
        ↓
resolveFurnace("FUR-001")
        ↓
Furnace information
        +
Sensors
        +
Production
        +
Energy
        +
Maintenance
        +
Large monitoring dataset
        ↓
Search & Status Filter
        ↓
Virtualized Records
        ↓
Selected Record Details
```

---

## 🚀 Large Dataset Handling

One of the important parts of this project is handling a large number of monitoring records without rendering every record into the DOM.

For example, a furnace can have **1000+ monitoring records**.

Instead of rendering all records:

```text
1000 records
↓
1000 DOM elements
```

the project uses virtualization:

```text
1000 records
↓
react-window
↓
Only visible rows are rendered
```

This keeps the UI responsive while allowing the application to work with large datasets.

The list also supports:

* Search by record ID
* Search by sensor
* Search by sensor ID
* Search by batch number
* Status filtering
* Record selection
* Detailed record inspection

---

## 📁 Project Structure

```text
factory-3d/
│
├── app/
│   ├── components/
│   │   └── factory/
│   │       │
│   │       ├── FactoryInfoPanel/
│   │       │   ├── FactoryCategoryList.jsx
│   │       │   ├── FactoryCategoryRecords.jsx
│   │       │   ├── FactoryInfoPanel.js
│   │       │   ├── FactoryRecordDetails.jsx
│   │       │   ├── FurnaceDataSection.jsx
│   │       │   ├── FurnaceRecordDetails.jsx
│   │       │   ├── InfoRow.jsx
│   │       │   └── factoryInfoUtils.js
│   │       │
│   │       ├── Conveyor.js
│   │       ├── FactoryBuilding.js
│   │       ├── FactoryFloor.js
│   │       ├── FactoryScene.js
│   │       ├── Machine.js
│   │       ├── Motor.js
│   │       ├── Tank.js
│   │       ├── VirtualizedRecordList.js
│   │       ├── factoryData.js
│   │       └── largeMockData.js
│   │
│   ├── globals.css
│   ├── layout.js
│   └── page.js
│
├── data/
│   ├── alloys.json
│   ├── departments.json
│   ├── employees.json
│   ├── energy.json
│   ├── factory.json
│   ├── furnaces.json
│   ├── machines.json
│   ├── maintenance.json
│   ├── motors.json
│   ├── production.json
│   ├── safety.json
│   ├── sceneObjects.json
│   └── sensors.json
│
├── public/
│
├── .gitignore
├── package.json
└── README.md
```

---

## 🏗️ 3D Factory Components

The factory environment is composed of reusable React Three Fiber components.

### Factory Floor

Provides the main industrial floor, grid and safety areas.

### Factory Building

Represents the industrial structure using:

* Steel columns
* Structural beams
* Crane components
* Industrial materials

### Machines

Interactive production machines with animated mechanical elements.

### Furnaces

Interactive industrial furnaces/tanks that connect to furnace datasets.

### Motors

Animated motors with rotating components.

### Conveyors

Reusable conveyor belt components used to represent production lines.

---

## 🗃️ Industrial Data

The project uses multiple structured datasets to represent different areas of the factory:

| Dataset            | Description         |
| ------------------ | ------------------- |
| `factory.json`     | Factory information |
| `departments.json` | Factory departments |
| `furnaces.json`    | Industrial furnaces |
| `motors.json`      | Motors              |
| `machines.json`    | Production machines |
| `sensors.json`     | Sensors             |
| `production.json`  | Production data     |
| `energy.json`      | Energy consumption  |
| `maintenance.json` | Maintenance records |
| `employees.json`   | Employees           |
| `safety.json`      | Safety information  |
| `alloys.json`      | Alloy information   |

---

## 🔗 Data Resolution

Instead of directly coupling UI components to individual datasets, the project uses resolver functions.

Examples:

```javascript
resolveMachine(machineId);
resolveFurnace(furnaceId);
resolveMotor(motorId);
```

A resolver takes an object's ID and returns its related data.

For example:

```javascript
resolveFurnace("FUR-001");
```

can resolve:

```text
Furnace
├── Sensors
├── Production
├── Energy
└── Maintenance
```

This keeps the 3D components focused on visualization while the data layer handles relationships between datasets.

---

## 🎨 UI / UX

The monitoring interface uses a dark industrial visual style.

Main characteristics:

* Dark background
* Glassmorphism panels
* Purple accent colors
* Status indicators
* Compact information cards
* Search and filter controls
* Scrollable data panels
* Selected-object highlighting

The interface is designed to keep the 3D scene visible while allowing users to inspect detailed information without leaving the monitoring environment.

---

## ⚡ Performance Considerations

Several techniques are used to keep the application responsive:

### Memoized Data Processing

`useMemo` is used for expensive derived operations such as:

* Furnace records
* Statistics
* Search results
* Filtered datasets

### List Virtualization

`react-window` prevents the browser from rendering every record at once.

### Component Separation

The application separates:

```text
3D Scene
    ↓
3D Objects
    ↓
Data Resolution
    ↓
Information Panel
    ↓
Virtualized Records
    ↓
Record Details
```

This makes the application easier to maintain and extend.

---

## 💻 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sabaalidadi/factory-3d.git
```

### 2. Enter the project

```bash
cd factory-3d
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 📦 Main Dependencies

The project uses:

```text
next
react
react-dom
three
@react-three/fiber
@react-three/drei
react-window
```

---

## 🎯 Project Goals

This project was created to demonstrate practical frontend engineering concepts including:

* Interactive 3D interfaces
* React component architecture
* Data-driven UI
* Large dataset management
* List virtualization
* Search and filtering
* Performance optimization
* Separation of visualization and data logic
* Reusable component design

---

## 🔮 Possible Future Improvements

Potential next steps include:

* Real-time sensor data using WebSockets
* Backend API integration
* Live factory statistics
* Time-series charts
* Advanced date/time filtering
* Pagination or server-side data loading
* More detailed 3D machinery
* Alarm and notification system
* Role-based access control
* Production analytics dashboard
* Energy consumption analytics
* Maintenance scheduling
* Database integration

---

## 👩‍💻 Author

**Saba Alidadi**

Frontend Developer

Focused on building modern interfaces with:

* React
* Next.js
* JavaScript
* Three.js
* React Three Fiber
* Modern UI/UX
* Performance-oriented frontend architecture

---

## 📄 License

This project is intended for demonstration and portfolio purposes.
