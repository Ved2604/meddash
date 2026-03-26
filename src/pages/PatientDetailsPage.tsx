import { useEffect } from "react";
import { usePatientStore } from "@/stores/patientStore";
import { useNotification } from "@/hooks/useNotification";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import ViewToggle from "@/components/ui/ViewToggle";
import Avatar from "@/components/ui/Avatar";
import StatusBadge from "@/components/ui/StatusBadge";
import PatientModal from "@/components/ui/PatientModal";
import PatientFormModal from "@/components/ui/PatientFormModal";
import Pagination from "@/components/ui/Pagination";
import Spinner from "@/components/ui/Spinner";
import { formatDate } from "@/utils/helpers";
import { Patient, SortField } from "@/types";
import { UserPlus } from "lucide-react";

function PatientListView({
  patients,
  onSelect,
}: {
  patients: Patient[];
  onSelect: (p: Patient) => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      <div className="grid grid-cols-[2fr_0.5fr_0.5fr_1.2fr_0.8fr_1fr] gap-3 px-5 py-3 bg-gray-50/80 border-b border-gray-100">
        <span className="table-header">Patient</span>
        <span className="table-header">Age</span>
        <span className="table-header">Gender</span>
        <span className="table-header">Condition</span>
        <span className="table-header">Status</span>
        <span className="table-header">Last visit</span>
      </div>
      {patients.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="grid grid-cols-[2fr_0.5fr_0.5fr_1.2fr_0.8fr_1fr] gap-3 px-5 py-3.5 border-b border-gray-50 items-center cursor-pointer hover:bg-gray-50/50 transition-colors"
        >
          <div className="flex items-center gap-3 min-w-0">
            <Avatar name={p.name} size="sm" />
            <div className="min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {p.name}
              </p>
              <p className="text-[11px] text-gray-400">{p.id}</p>
            </div>
          </div>
          <span className="text-sm text-gray-600">{p.age}</span>
          <span className="text-sm text-gray-600">{p.gender}</span>
          <span className="text-sm text-gray-700 truncate">{p.condition}</span>
          <StatusBadge status={p.status} />
          <span className="text-xs text-gray-400">
            {formatDate(p.lastVisit)}
          </span>
        </div>
      ))}
    </div>
  );
}

function PatientGridView({
  patients,
  onSelect,
}: {
  patients: Patient[];
  onSelect: (p: Patient) => void;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {patients.map((p) => (
        <div
          key={p.id}
          onClick={() => onSelect(p)}
          className="bg-white border border-gray-100 rounded-xl p-5 cursor-pointer hover:shadow-sm hover:border-gray-200 transition-all group"
        >
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={p.name} size="md" />
            <div className="min-w-0">
              <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-brand-500 transition-colors">
                {p.name}
              </p>
              <p className="text-xs text-gray-400">
                {p.age}y / {p.gender}
              </p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-3 truncate">{p.condition}</p>
          <div className="flex items-center justify-between">
            <StatusBadge status={p.status} />
            <span className="text-[11px] text-gray-400">
              {formatDate(p.lastVisit)}
            </span>
          </div>
          <div className="mt-3 pt-3 border-t border-gray-50">
            <p className="text-[11px] text-gray-400">
              {p.department} · {p.id}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PatientDetailsPage() {
  const {
    fetchPatients,
    filteredPatients,
    paginatedPatients,
    totalPages,
    currentPage,
    setCurrentPage,
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    selectedPatient,
    selectPatient,
    isLoading,
    isFormOpen,
    editingPatient,
    openForm,
    closeForm,
    addPatient,
    updatePatient,
    deletePatient,
  } = usePatientStore();

  const { notify } = useNotification();

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  const allFiltered = filteredPatients();
  const patients = paginatedPatients();
  const pages = totalPages();

  const handleFormSubmit = (patient: Patient) => {
    if (editingPatient) {
      updatePatient(patient);
      notify(
        "Patient updated",
        `${patient.name}'s record has been updated.`,
        "info",
      );
    } else {
      addPatient(patient);
      notify(
        "New patient added",
        `${patient.name} has been added to ${patient.department}.`,
        "success",
      );
    }
    closeForm();
  };

  const handleEdit = (patient: Patient) => {
    selectPatient(null);
    openForm(patient);
  };

  const handleDelete = (id: string) => {
    const patient = allFiltered.find((p) => p.id === id);
    deletePatient(id);
    notify(
      "Patient removed",
      `${patient?.name || "Patient"} has been removed from records.`,
      "warning",
    );
  };

  return (
    <div>
      <Navbar
        title="Patients"
        actions={
          <button
            onClick={() => openForm()}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-brand-400 rounded-lg hover:bg-brand-500 transition-colors"
          >
            <UserPlus size={14} />
            Add patient
          </button>
        }
      />

      <div className="p-6">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by name, condition, department..."
          />
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortField)}
              className="text-xs px-3 py-2 border border-gray-200 rounded-lg bg-white text-gray-600 focus:outline-none focus:border-brand-400"
            >
              <option value="name">Sort: Name</option>
              <option value="date">Sort: Date</option>
              <option value="status">Sort: Status</option>
            </select>
            <ViewToggle viewMode={viewMode} onChange={setViewMode} />
          </div>
        </div>

        {/* Results count */}
        <p className="text-xs text-gray-400 mb-4">
          {allFiltered.length} patient{allFiltered.length !== 1 ? "s" : ""}{" "}
          found
          {searchQuery && ` for "${searchQuery}"`}
        </p>

        {/* Content */}
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-brand-400">
              <Spinner size={24} />
            </div>
          </div>
        ) : allFiltered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-sm">No patients found.</p>
            {searchQuery ? (
              <button
                onClick={() => setSearchQuery("")}
                className="text-brand-400 text-sm mt-2 hover:underline"
              >
                Clear search
              </button>
            ) : (
              <button
                onClick={() => openForm()}
                className="text-brand-400 text-sm mt-2 hover:underline"
              >
                Add your first patient
              </button>
            )}
          </div>
        ) : viewMode === "list" ? (
          <PatientListView patients={patients} onSelect={selectPatient} />
        ) : (
          <PatientGridView patients={patients} onSelect={selectPatient} />
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={pages}
          totalItems={allFiltered.length}
          pageSize={8}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Patient detail modal */}
      {selectedPatient && (
        <PatientModal
          patient={selectedPatient}
          onClose={() => selectPatient(null)}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* Add/Edit form modal */}
      {isFormOpen && (
        <PatientFormModal
          patient={editingPatient}
          onSubmit={handleFormSubmit}
          onClose={closeForm}
        />
      )}
    </div>
  );
}
