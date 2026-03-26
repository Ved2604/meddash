import { PatientStatus } from '@/types';
import { getStatusBadgeClass, capitalize } from '@/utils/helpers';

interface StatusBadgeProps {
  status: PatientStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span className={`badge ${getStatusBadgeClass(status)}`}>
      {capitalize(status)}
    </span>
  );
}
