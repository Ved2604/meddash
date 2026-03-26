import { PatientStatus } from '@/types';

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getAvatarColor(name: string): { bg: string; text: string } {
  const colors = [
    { bg: 'bg-blue-50', text: 'text-blue-700' },
    { bg: 'bg-purple-50', text: 'text-purple-700' },
    { bg: 'bg-teal-50', text: 'text-teal-700' },
    { bg: 'bg-amber-50', text: 'text-amber-700' },
    { bg: 'bg-rose-50', text: 'text-rose-700' },
    { bg: 'bg-indigo-50', text: 'text-indigo-700' },
    { bg: 'bg-cyan-50', text: 'text-cyan-700' },
    { bg: 'bg-pink-50', text: 'text-pink-700' },
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function getStatusBadgeClass(status: PatientStatus): string {
  const map: Record<PatientStatus, string> = {
    admitted: 'badge-admitted',
    critical: 'badge-critical',
    discharged: 'badge-discharged',
    outpatient: 'badge-outpatient',
  };
  return map[status];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateId(): string {
  return `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}
