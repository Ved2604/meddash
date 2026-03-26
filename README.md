# MedDash — Healthcare Management Platform

A B2B Healthcare SaaS dashboard built with React, TypeScript, and Tailwind CSS. Features authentication, analytics, patient management with grid/list views, and browser notifications via Service Workers.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.4-blue) ![Vite](https://img.shields.io/badge/Vite-6-purple)

## Features

### Authentication

- Firebase Email/Password authentication
- Session persistence across page refreshes
- Protected routes with automatic redirects
- Form validation with inline error states

### Dashboard

- Summary stat cards (patients, appointments, alerts, wait time)
- Patient admissions trend chart (Recharts)
- Recent patients list with status badges
- Activity table with sortable columns

### Analytics

- Admissions over time (area chart)
- Department-wise patient distribution (horizontal bar chart)
- Patient status breakdown (donut chart)
- Filterable by department and time range

### Patient Management

- **Grid view** — card-based layout with patient info
- **List view** — table layout with full details
- Toggle switch to switch between views
- Real-time search (name, condition, department, ID)
- Sort by name, date, or status
- Click-to-open patient detail modal

### Notifications

- Service Worker registration
- Browser Notification API integration
- In-app notification panel (bell icon with unread count)
- Triggered on login welcome and patient events
- Mark as read / mark all read functionality

## Tech Stack

| Layer            | Technology                        |
| ---------------- | --------------------------------- |
| Framework        | React 18 + TypeScript             |
| Build Tool       | Vite 6                            |
| Routing          | React Router v6                   |
| State Management | Zustand 5                         |
| Styling          | Tailwind CSS 3.4                  |
| Charts           | Recharts                          |
| Icons            | Lucide React                      |
| Auth             | Firebase Authentication           |
| Notifications    | Service Worker + Notification API |

## Architecture

```
src/
├── components/
│   ├── layout/          # AppLayout, Sidebar, Navbar, ProtectedRoute
│   └── ui/              # Avatar, StatCard, StatusBadge, ViewToggle,
│                          SearchBar, PatientModal, NotificationPanel
├── pages/               # LoginPage, DashboardPage, AnalyticsPage,
│                          PatientDetailsPage
├── stores/              # authStore, patientStore, notificationStore
├── hooks/               # useNotification
├── services/            # firebase.ts
├── types/               # TypeScript interfaces
├── data/                # Mock patient & chart data
└── utils/               # Helper functions
```

### State Management (Zustand)

Three stores handle the entire app state:

- **authStore** — user session, login/logout, Firebase listener
- **patientStore** — patient list, search, sort, view mode, selection
- **notificationStore** — notifications array, permissions, panel state

### Key Design Decisions

- **Code splitting** — Pages are lazy-loaded with `React.lazy()` for smaller initial bundle
- **Derived state** — `filteredPatients()` computes from `patients + searchQuery + sortBy` rather than duplicating data
- **Component composition** — Reusable primitives (Avatar, StatusBadge, StatCard) compose into larger views
- **Custom hooks** — `useNotification` encapsulates SW registration + permission + notify logic

## Getting Started

### Prerequisites

- Node.js 18+
- A Firebase project with Email/Password auth enabled

### Setup

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/meddash.git
cd meddash

# Install
npm install

# Configure Firebase
cp .env.example .env
# Edit .env with your Firebase config values

# Run
npm run dev
```

### Deployment (Vercel)

```bash
npm run build
```

1. Push to GitHub
2. Import repo in [vercel.com](https://vercel.com)
3. Add environment variables (same as `.env`)
4. Deploy

## Performance

- Lazy-loaded routes (code splitting)
- Optimized re-renders via Zustand selectors
- Tailwind CSS purging for minimal CSS bundle
- No unnecessary dependencies

## License

MIT
