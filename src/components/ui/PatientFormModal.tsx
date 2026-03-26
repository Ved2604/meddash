import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Patient, PatientStatus } from "@/types";

const DEPARTMENTS = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "General",
  "Endocrinology",
  "Pulmonology",
  "Dermatology",
  "Pediatrics",
  "Oncology",
  "Gastroenterology",
];

const BLOOD_TYPES = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const STATUSES: { value: PatientStatus; label: string }[] = [
  { value: "admitted", label: "Admitted" },
  { value: "outpatient", label: "Outpatient" },
  { value: "critical", label: "Critical" },
  { value: "discharged", label: "Discharged" },
];

interface PatientFormModalProps {
  patient?: Patient | null;
  onSubmit: (patient: Patient) => void;
  onClose: () => void;
}

function generatePatientId(): string {
  return `P-${Math.floor(2000 + Math.random() * 8000)}`;
}

function todayStr(): string {
  return new Date().toISOString().split("T")[0];
}

const emptyForm = {
  name: "",
  age: "",
  gender: "M" as "M" | "F",
  condition: "",
  status: "admitted" as PatientStatus,
  department: "General",
  phone: "",
  email: "",
  bloodType: "O+",
  lastVisit: todayStr(),
  admissionDate: todayStr(),
};

export default function PatientFormModal({
  patient,
  onSubmit,
  onClose,
}: PatientFormModalProps) {
  const isEditing = !!patient;
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (patient) {
      setForm({
        name: patient.name,
        age: String(patient.age),
        gender: patient.gender,
        condition: patient.condition,
        status: patient.status,
        department: patient.department,
        phone: patient.phone,
        email: patient.email,
        bloodType: patient.bloodType,
        lastVisit: patient.lastVisit,
        admissionDate: patient.admissionDate,
      });
    }
  }, [patient]);

  const update = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.age || Number(form.age) < 0 || Number(form.age) > 150)
      errs.age = "Enter a valid age";
    if (!form.condition.trim()) errs.condition = "Condition is required";
    if (form.email && !form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const result: Patient = {
      id: patient?.id || generatePatientId(),
      name: form.name.trim(),
      age: Number(form.age),
      gender: form.gender,
      condition: form.condition.trim(),
      status: form.status,
      department: form.department,
      phone: form.phone.trim(),
      email: form.email.trim(),
      bloodType: form.bloodType,
      lastVisit: form.lastVisit,
      admissionDate: form.admissionDate,
    };

    onSubmit(result);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "slideUp 0.25s ease-out" }}
      >
        {/* Header */}
        <div className="h-1.5 bg-gradient-to-r from-brand-400 to-brand-200" />
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">
            {isEditing ? "Edit patient" : "Add new patient"}
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-all"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4"
        >
          {/* Row: Name + Age */}
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full name *
              </label>
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Anita Patel"
                className={`input-field ${errors.name ? "border-red-300" : ""}`}
              />
              {errors.name && (
                <p className="text-xs text-red-500 mt-1">{errors.name}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age *
              </label>
              <input
                type="number"
                value={form.age}
                onChange={(e) => update("age", e.target.value)}
                placeholder="34"
                min="0"
                max="150"
                className={`input-field ${errors.age ? "border-red-300" : ""}`}
              />
              {errors.age && (
                <p className="text-xs text-red-500 mt-1">{errors.age}</p>
              )}
            </div>
          </div>

          {/* Row: Gender + Blood type */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => update("gender", "M")}
                  className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                    form.gender === "M"
                      ? "bg-brand-50 border-brand-400 text-brand-500 font-medium"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Male
                </button>
                <button
                  type="button"
                  onClick={() => update("gender", "F")}
                  className={`flex-1 py-2 text-sm rounded-lg border transition-all ${
                    form.gender === "F"
                      ? "bg-brand-50 border-brand-400 text-brand-500 font-medium"
                      : "border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
                >
                  Female
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blood type
              </label>
              <select
                value={form.bloodType}
                onChange={(e) => update("bloodType", e.target.value)}
                className="input-field"
              >
                {BLOOD_TYPES.map((bt) => (
                  <option key={bt} value={bt}>
                    {bt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Condition / Diagnosis *
            </label>
            <input
              value={form.condition}
              onChange={(e) => update("condition", e.target.value)}
              placeholder="e.g. Hypertension, Fracture — Femur"
              className={`input-field ${errors.condition ? "border-red-300" : ""}`}
            />
            {errors.condition && (
              <p className="text-xs text-red-500 mt-1">{errors.condition}</p>
            )}
          </div>

          {/* Row: Department + Status */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Department
              </label>
              <select
                value={form.department}
                onChange={(e) => update("department", e.target.value)}
                className="input-field"
              >
                {DEPARTMENTS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={form.status}
                onChange={(e) => update("status", e.target.value)}
                className="input-field"
              >
                {STATUSES.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row: Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Admission date
              </label>
              <input
                type="date"
                value={form.admissionDate}
                onChange={(e) => update("admissionDate", e.target.value)}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Last visit
              </label>
              <input
                type="date"
                value={form.lastVisit}
                onChange={(e) => update("lastVisit", e.target.value)}
                className="input-field"
              />
            </div>
          </div>

          {/* Row: Contact */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="patient@email.com"
                className={`input-field ${errors.email ? "border-red-300" : ""}`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1">
              {isEditing ? "Save changes" : "Add patient"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
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
