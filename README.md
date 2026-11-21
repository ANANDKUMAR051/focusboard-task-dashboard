# FocusBoard

A responsive, frontend-only task dashboard built with React, Vite, JavaScript, CSS, and Lucide React. The layout is based on the user-supplied Figma screenshots of the desktop dashboard, mobile dashboard, create-task form, and three Focus Notes slides.

## Setup

```bash
npm install
npm run dev
```

For production:

```bash
npm run build
npm run preview
```

## Features

- 12 initial sample tasks based on the reference design (five in progress and seven completed).
- Create, edit, and delete tasks with required-title validation and delete confirmation.
- Update status using the task checkbox or the task action menu.
- Case-insensitive title search combined with status and priority filters.
- Dynamic total, in-progress, completed, and completion-percentage values.
- Three Focus Notes slides with clickable indicators and previous/next arrows on desktop.
- Persistent tasks using browser localStorage.
- Responsive sidebar and bottom mobile navigation.

## Project structure

- `src/components/`: reusable dashboard components and dialogs.
- `src/pages/Dashboard.jsx`: screen layout, search/filter state, and modal state.
- `src/context/TaskContext.jsx`: shared task data and immutable task operations.
- `src/hooks/useLocalStorage.js`: safe browser persistence.
- `src/data/`: sample tasks and Focus Notes content.
- `src/styles/`: separate global, dashboard, component, and responsive styles.

## State management

`TaskProvider` is the single source of truth for tasks. `addTask`, `editTask`, `deleteTask`, and `updateStatus` update arrays immutably. Statistics are derived from tasks using `useMemo`. Dashboard uses `useMemo` to combine search, status, and priority filters. The carousel owns its own slide index using `useState`.

## LocalStorage

The app uses `focusboard.tasks.v1`. On first visit it initializes the 12 sample tasks. On later visits it restores a valid stored task list, including an intentionally empty array. Invalid JSON or invalid task shapes safely fall back to sample tasks. To reset demo data, open browser DevTools and run `localStorage.removeItem('focusboard.tasks.v1'); location.reload();`. This deletes saved changes.

## Deployment

Import the repository into Vercel. Framework preset: Vite. Build command: `npm run build`. Output directory: `dist`.

Hosted URL: `https://YOUR-PROJECT.vercel.app`

## Known limitations

- This is a single-user browser-only application; data does not sync across devices.
- The screenshot references include the visual design but do not expose every Figma measurement, so minor spacing differences may remain.
- On mobile, the carousel follows the Figma mobile card style, with compact slide controls added to meet the interaction requirement.
- The screenshots folder contains the provided Figma references, not browser screenshots of the running application.
