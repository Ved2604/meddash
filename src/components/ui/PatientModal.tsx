import { useState } from "react";
import {
  X,
  Phone,
  Mail,
  Droplets,
  Calendar,
  Building2,
  Pencil,
  Trash2,
} from "lucide-react";
import { Patient } from "@/types";
import Avatar from "./Avatar";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/utils/helpers";

interface PatientModalProps {
  patient: Patient;
  onClose: () => void;
  onEdit?: (patient: Patient) => void;
  onDelete?: (id: string) => void;
}

export default function PatientModal({
  patient,
  onClose,
  onEdit,
  onDelete,
}: PatientModalProps) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.25s ease-out" }}
      >
        {/* Header band */}
        <div className="h-2 bg-gradient-to-r from-brand-400 to-brand-200" />

        <div className="p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
          >
            <X size={16} />
          </button>

          {/* Patient header */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar name={patient.name} size="lg" />
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {patient.name}
              </h2>
              <p className="text-sm text-gray-500">
                {patient.id} · {patient.age}y / {patient.gender}
              </p>
            </div>
          </div>

          {/* Status & condition */}
          <div className="flex items-center gap-3 mb-6">
            <StatusBadge status={patient.status} />
            <span className="text-sm text-gray-600">{patient.condition}</span>
          </div>

          {/* Info grid */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Building2 size={15} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  Department
                </p>
                <p className="text-gray-700">{patient.department}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Droplets size={15} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  Blood type
                </p>
                <p className="text-gray-700">{patient.bloodType}</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Calendar size={15} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  Admitted
                </p>
                <p className="text-gray-700">
                  {formatDate(patient.admissionDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center text-gray-400">
                <Calendar size={15} />
              </div>
              <div>
                <p className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">
                  Last visit
                </p>
                <p className="text-gray-700">{formatDate(patient.lastVisit)}</p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="border-t border-gray-100 pt-4 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone size={14} className="text-gray-400" />
              <span className="text-gray-600">{patient.phone}</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail size={14} className="text-gray-400" />
              <span className="text-gray-600">{patient.email}</span>
            </div>
          </div>

          {/* Actions */}
          {(onEdit || onDelete) && (
            <div className="border-t border-gray-100 pt-4 mt-4">
              {!confirmDelete ? (
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(patient)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-brand-500 border border-brand-200 rounded-lg hover:bg-brand-50 transition-colors"
                    >
                      <Pencil size={14} />
                      Edit
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => setConfirmDelete(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete
                    </button>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-600 mb-3">
                    Are you sure you want to delete{" "}
                    <span className="font-medium">{patient.name}</span>? This
                    action cannot be undone.
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onDelete?.(patient.id)}
                      className="flex-1 py-2 text-sm font-medium text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Yes, delete
                    </button>
                    <button
                      onClick={() => setConfirmDelete(false)}
                      className="flex-1 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
