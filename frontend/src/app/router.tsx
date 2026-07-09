import { createBrowserRouter } from 'react-router-dom';
import LandingPage from '@/features/landing/LandingPage';
import LoginPage from '@/features/auth/LoginPage';
import DashboardPage from '@/features/dashboard/DashboardPage';
import UsersPage from '@/features/dashboard/users/UsersPage';
import DashboardLayout from '@/features/dashboard/layout/DashboardLayout';
import ProtectedRoute from '@/features/auth/components/ProtectedRoute';
import DockerPage from '@/features/docker/DockerPage';
import {
  StoragePlaceholder,
  MonitoringPlaceholder,
  SettingsPlaceholder,
} from '@/features/dashboard/Placeholders';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '',
        element: <DashboardPage />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'docker',
        element: <DockerPage />,
      },
      {
        path: 'storage',
        element: <StoragePlaceholder />,
      },
      {
        path: 'monitoring',
        element: <MonitoringPlaceholder />,
      },
      {
        path: 'settings',
        element: <SettingsPlaceholder />,
      },
    ],
  },
]);
