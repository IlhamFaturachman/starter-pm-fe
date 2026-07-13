import { createBrowserRouter, Navigate } from 'react-router';
import { paths } from './paths';
import { authLoader, guestLoader } from './guards';
import { DashboardLayout } from '@/components/templates/DashboardLayout';
import { LoginPage } from '@/pages/LoginPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { KanbanPage } from '@/pages/KanbanPage';
import { TableDemoPage } from '@/pages/TableDemoPage';

export const router = createBrowserRouter([
  {
    path: paths.root,
    element: <Navigate to={paths.dashboard} replace />,
  },
  {
    path: paths.login,
    loader: guestLoader,
    element: <LoginPage />,
  },
  {
    id: 'app',
    loader: authLoader,
    element: <DashboardLayout />,
    children: [
      { index: true, element: <Navigate to={paths.dashboard} replace /> },
      { path: paths.dashboard, element: <DashboardPage /> },
      { path: paths.projects, element: <ProjectsPage /> },
      { path: paths.kanban, element: <KanbanPage /> },
      { path: paths.tableDemo, element: <TableDemoPage /> },
    ],
  },
  {
    path: '*',
    element: (
      <div className="flex min-h-screen items-center justify-center text-surface-700">
        404 — Not found
      </div>
    ),
  },
]);
