export type PatientStatus = 'admitted' | 'critical' | 'discharged' | 'outpatient';

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'M' | 'F';
  condition: string;
  status: PatientStatus;
  department: string;
  lastVisit: string;
  phone: string;
  email: string;
  bloodType: string;
  admissionDate: string;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: number;
  read: boolean;
  type: 'info' | 'warning' | 'critical' | 'success';
}

export type ViewMode = 'grid' | 'list';

export type SortField = 'name' | 'date' | 'status';

export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}
