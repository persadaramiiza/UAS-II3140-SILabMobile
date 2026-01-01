# Interactive Modules Implementation Guide

## Overview

Aplikasi SILab Mobile memiliki **4 Interactive Modules** yang menjadi fitur utama aplikasi ini. Modules ini memberikan pengalaman belajar interaktif dengan tools yang dapat digunakan langsung oleh mahasiswa.

## 1. Requirements Engineering Module

**File:** `src/screens/Modules/RequirementsEngineeringScreen.js`

### Features
- **MoSCoW Prioritization Board**: Kategorisasi requirements menggunakan framework MoSCoW
- **4 Priority Categories**:
  - 🔴 **Must Have**: Requirements yang wajib ada (critical)
  - 🟠 **Should Have**: Requirements yang sangat penting tapi tidak critical
  - 🔵 **Could Have**: Requirements yang bagus untuk dimiliki
  - ⚪ **Won't Have**: Requirements yang tidak akan diimplementasikan saat ini

### Functionality
✅ Add requirements dengan modal input
✅ Assign requirements ke kategori tertentu
✅ Move requirements antar kategori
✅ Delete requirements dengan konfirmasi
✅ Expand/collapse kategori sections
✅ Badge counter untuk setiap kategori
✅ AsyncStorage persistence (auto-save)
✅ Empty state indicators

### User Flow
1. Tap "Add Requirement" button
2. Enter requirement name dan pilih kategori
3. Tap "Create" untuk menambahkan
4. Tap requirement untuk melihat action menu
5. Pilih "Move to..." untuk pindah kategori
6. Pilih "Delete" untuk menghapus

### Technical Details
- **Storage**: AsyncStorage (`@requirements_moscow`)
- **State Management**: React useState hooks
- **Data Structure**:
```javascript
{
  id: string,
  name: string,
  category: 'must' | 'should' | 'could' | 'wont'
}
```

---

## 2. Enterprise Architecture Module

**File:** `src/screens/Modules/EnterpriseArchitectureScreen.js`

### Features
- **Value Stream × Capability Mapping Matrix**: Visualisasi hubungan antara value streams dan capabilities
- **Heat Intensity System**: Menggunakan skala 0-100 dengan color coding
- **Heat Map Visualization**:
  - 0 (None): Gray (#6b7280)
  - 1-25 (Low): Blue (#3b82f6)
  - 26-50 (Medium): Green (#10b981)
  - 51-75 (High): Orange (#f59e0b)
  - 76-100 (Critical): Red (#ef4444)

### Default Data
**Value Streams**: Discovery, Design, Development, Testing, Deployment
**Capabilities**: Requirements Analysis, System Design, Database Modeling, API Development, Testing & QA, DevOps

### Functionality
✅ Interactive matrix dengan scrolling horizontal & vertical
✅ Tap cell untuk set intensity dengan slider (0-100)
✅ Real-time color feedback saat adjust slider
✅ Add custom value streams
✅ Add custom capabilities
✅ Reset to default configuration
✅ Legend showing heat intensity levels
✅ AsyncStorage persistence

### User Flow
1. Scroll matrix untuk melihat semua mappings
2. Tap cell untuk open intensity modal
3. Drag slider untuk set intensity (0-100)
4. Lihat color change in real-time
5. Tap "Set Intensity" untuk save
6. Tap "+" di headers untuk add custom items
7. Tap "Reset to Defaults" untuk restart

### Technical Details
- **Storage**: AsyncStorage (`@ea_mapping`)
- **Dependencies**: `@react-native-community/slider@4.5.5`
- **Data Structure**:
```javascript
{
  streams: string[],
  capabilities: string[],
  mapping: {
    [streamIndex]: {
      [capabilityIndex]: number (0-100)
    }
  }
}
```

---

## 3. Interaction Design Module

**File:** `src/screens/Modules/InteractionDesignScreen.js`

### Features
- **Wireframe Playground**: Canvas untuk membuat wireframe sederhana
- **6 UI Components**:
  - 📱 **Button**: Standard button dengan background blue
  - ✍️ **Input**: Text input field dengan border
  - 📝 **Text**: Lorem ipsum text element
  - 🖼️ **Image**: Placeholder untuk gambar
  - 📄 **Card**: Card component dengan shadow
  - 🧭 **Navbar**: Navigation bar component

### Functionality
✅ Drag-and-drop positioning (menggunakan PanResponder)
✅ Component toolbox dengan icon preview
✅ Canvas dengan background putih (mobile screen simulation)
✅ Select component untuk edit
✅ Inspector panel showing position & size
✅ Delete selected component
✅ Clear entire canvas
✅ AsyncStorage persistence
✅ Toggle toolbox visibility

### User Flow
1. Tap "Components" untuk show toolbox
2. Pilih component dari toolbox
3. Component muncul di canvas
4. Drag component ke posisi yang diinginkan
5. Tap component untuk select
6. View properties di inspector panel
7. Tap red X untuk delete
8. Tap "Clear" untuk reset canvas

### Technical Details
- **Storage**: AsyncStorage (`@wireframe_design`)
- **Drag System**: React Native PanResponder API
- **Canvas Size**: Full width - 40px margin, min-height 800px
- **Data Structure**:
```javascript
{
  id: string,
  type: 'button' | 'input' | 'text' | 'image' | 'card' | 'nav',
  label: string,
  icon: string,
  x: number,
  y: number,
  width: number,
  height: number
}
```

---

## 4. ERD Builder Module

**File:** `src/screens/Modules/ERDBuilderScreen.js`

### Features
- **Entity-Relationship Diagram Builder**: Buat ERD secara interaktif
- **Entity Management**:
  - Add/edit entities dengan nama
  - Multiple attributes per entity
  - Mark attributes as PK (Primary Key)
  - Mark attributes as FK (Foreign Key)
  - Expand/collapse attribute list
  
- **Relationship Management**:
  - 3 Relationship Types:
    - **1:1** (One to One) — symbol: `—`
    - **1:M** (One to Many) — symbol: `—<`
    - **M:M** (Many to Many) — symbol: `>—<`

### Functionality
✅ Create entities dengan modal form
✅ Add multiple attributes per entity
✅ Toggle PK/FK markers untuk attributes
✅ Edit existing entities
✅ Delete entities (dengan cascade delete relationships)
✅ Create relationships antara 2 entities
✅ Select relationship type
✅ Delete relationships
✅ Clear entire diagram
✅ Entity count dan relationship count badges
✅ AsyncStorage persistence

### User Flow - Entities
1. Tap "Add Entity" button
2. Enter entity name (e.g., "User")
3. Add attributes dengan nama
4. Mark attributes sebagai PK atau FK
5. Tap "Add Attribute" untuk attribute baru
6. Tap "Create Entity" untuk save
7. Tap entity card untuk expand/collapse attributes
8. Tap edit icon untuk modify entity
9. Tap trash icon untuk delete

### User Flow - Relationships
1. Tap "Add Relation" button (requires ≥2 entities)
2. Select "From Entity"
3. Select relationship type (1:1, 1:M, M:M)
4. Select "To Entity"
5. Tap "Add Relationship" untuk create
6. View relationship dalam list
7. Tap trash untuk delete relationship

### Technical Details
- **Storage**: AsyncStorage (`@erd_diagram`)
- **Validation**: 
  - Entity name required
  - At least 1 attribute required
  - Cannot relate entity to itself
  - Cascade delete relationships when entity deleted
- **Data Structure**:
```javascript
{
  entities: [
    {
      id: string,
      name: string,
      attributes: [
        {
          name: string,
          isPK: boolean,
          isFK: boolean
        }
      ]
    }
  ],
  relationships: [
    {
      id: string,
      from: string (entity id),
      to: string (entity id),
      type: '1-1' | '1-M' | 'M-M'
    }
  ]
}
```

---

## Navigation Integration

### Auto-routing from ModuleContentScreen

File: `src/screens/Modules/ModuleContentScreen.js`

Ketika user tap module dari ModulesScreen, sistem akan:

1. Check apakah module memiliki interactive screen
2. Jika ya, auto-navigate ke interactive screen
3. Jika tidak, tampilkan static content

**Mapping:**
```javascript
const INTERACTIVE_MODULES = {
  'Requirements': 'RequirementsEngineering',
  'Enterprise Architecture': 'EnterpriseArchitecture',
  'Interaction Design': 'InteractionDesign',
  'Conceptual Modeling (ERD)': 'ERDBuilder',
};
```

### AppNavigator Routes

File: `src/navigation/AppNavigator.js`

All 4 interactive modules registered sebagai Stack screens:
- `RequirementsEngineering`
- `EnterpriseArchitecture`
- `InteractionDesign`
- `ERDBuilder`

---

## Installation & Setup

### 1. Install Dependencies

```bash
npm install @react-native-community/slider@4.5.5
```

### 2. Run the App

```bash
npm start
# atau
expo start
```

### 3. Test Each Module

1. Login ke aplikasi
2. Navigate ke **Modul** tab
3. Tap salah satu dari 4 interactive modules
4. Explore features dan test functionality
5. Verify data persistence dengan close & reopen app

---

## Design Decisions

### Why AsyncStorage?

- ✅ **No backend required**: Data stored locally
- ✅ **Instant saves**: No network latency
- ✅ **Privacy**: User data stays on device
- ✅ **Offline-first**: Works tanpa internet
- ❌ **No sync**: Data tidak sync antar devices
- ❌ **No collaboration**: Single-user only

### Why PanResponder for Drag-Drop?

- ✅ Native gesture handling
- ✅ Smooth performance
- ✅ No additional dependencies
- ✅ Full control over drag behavior

### Why Slider for Heat Mapping?

- ✅ Precise value control (0-100)
- ✅ Visual feedback
- ✅ Touch-friendly interface
- ✅ Standard UI pattern

---

## Color Scheme

Consistent dark theme dengan accent colors:

- **Background**: `#020617` (slate-950)
- **Cards**: `#111827` (gray-900)
- **Borders**: `#374151` (gray-700)
- **Text Primary**: `#fff` (white)
- **Text Secondary**: `#9ca3af` (gray-400)
- **Accent**: `#facc15` (yellow-400)
- **Primary**: `#3b82f6` (blue-500)
- **Success**: `#10b981` (green-500)
- **Warning**: `#f59e0b` (orange-500)
- **Danger**: `#ef4444` (red-500)

---

## Future Enhancements

### Potential Features
1. **Export functionality**: Export diagrams as images atau JSON
2. **Templates**: Pre-built templates untuk quick start
3. **Collaboration**: Multi-user editing dengan Supabase real-time
4. **Version history**: Undo/redo functionality
5. **Cloud sync**: Sync data across devices
6. **Share**: Share wireframes/ERDs dengan link
7. **Comments**: Add notes/comments to elements
8. **Advanced ERD**: Support untuk inheritance, weak entities, etc.
9. **Wireframe export**: Generate React Native code from wireframe
10. **MoSCoW analytics**: Statistics dan charts untuk requirements

---

## Troubleshooting

### Module tidak muncul
- **Check**: Apakah navigation routes sudah registered di AppNavigator?
- **Check**: Apakah import statements sudah benar?

### Data hilang setelah restart
- **Check**: AsyncStorage persistence implemented?
- **Check**: Apakah ada error di console saat save?
- **Debug**: Add console.log di save/load functions

### Slider tidak muncul
- **Solution**: Install `@react-native-community/slider`
- **Command**: `npm install @react-native-community/slider@4.5.5`

### Drag tidak smooth
- **Check**: Pastikan PanResponder sudah diimplementasikan dengan benar
- **Optimize**: Reduce re-renders dengan React.memo atau useMemo

---

## Testing Checklist

### Requirements Engineering
- [ ] Add requirement dengan semua kategori
- [ ] Move requirement antar kategori
- [ ] Delete requirement
- [ ] Expand/collapse categories
- [ ] Close app dan reopen - data persist?

### Enterprise Architecture
- [ ] Tap cell dan set intensity
- [ ] Slider bergerak smooth
- [ ] Color changes sesuai intensity
- [ ] Add custom value stream
- [ ] Add custom capability
- [ ] Reset to defaults
- [ ] Data persist setelah restart?

### Interaction Design
- [ ] Add semua 6 component types
- [ ] Drag components ke posisi baru
- [ ] Select component
- [ ] Inspector show correct position
- [ ] Delete component
- [ ] Clear canvas
- [ ] Toggle toolbox visibility
- [ ] Data persist?

### ERD Builder
- [ ] Create entity dengan attributes
- [ ] Mark PK dan FK
- [ ] Edit entity
- [ ] Delete entity
- [ ] Create relationship (semua 3 types)
- [ ] Delete relationship
- [ ] Clear diagram
- [ ] Expand/collapse attribute list
- [ ] Data persist?

---

## Success Metrics

Modules dianggap sukses jika:

✅ Semua 4 modules accessible dari Modul tab
✅ Navigation smooth tanpa crashes
✅ Data persistence works reliably
✅ UI responsive dan user-friendly
✅ No major bugs atau performance issues
✅ Consistent dengan design system
✅ Features match web app functionality

---

**Dibuat**: Januari 2025  
**Version**: 1.0  
**Status**: ✅ Production Ready
