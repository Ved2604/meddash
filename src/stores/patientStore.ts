import { create } from "zustand";
import { Patient, ViewMode, SortField } from "@/types";
import { patients as mockPatients } from "@/data/mockData";

const PAGE_SIZE = 8;

interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  sortBy: SortField;
  isLoading: boolean;
  currentPage: number;
  isFormOpen: boolean;
  editingPatient: Patient | null;

  // Computed
  filteredPatients: () => Patient[];
  paginatedPatients: () => Patient[];
  totalPages: () => number;

  // Actions
  fetchPatients: () => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (field: SortField) => void;
  selectPatient: (patient: Patient | null) => void;
  setCurrentPage: (page: number) => void;
  addPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (id: string) => void;
  openForm: (patient?: Patient) => void;
  closeForm: () => void;
}

export const usePatientStore = create<PatientState>((set, get) => ({
  patients: [],
  selectedPatient: null,
  viewMode: "list",
  searchQuery: "",
  sortBy: "name",
  isLoading: false,
  currentPage: 1,
  isFormOpen: false,
  editingPatient: null,

  filteredPatients: () => {
    const { patients, searchQuery, sortBy } = get();
    let filtered = [...patients];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.condition.toLowerCase().includes(q) ||
          p.department.toLowerCase().includes(q) ||
          p.id.toLowerCase().includes(q),
      );
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
          return (
            new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
          );
        case "status": {
          const order = {
            critical: 0,
            admitted: 1,
            outpatient: 2,
            discharged: 3,
          };
          return order[a.status] - order[b.status];
        }
        default:
          return 0;
      }
    });

    return filtered;
  },

  paginatedPatients: () => {
    const { currentPage } = get();
    const filtered = get().filteredPatients();
    const start = (currentPage - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  },

  totalPages: () => {
    const filtered = get().filteredPatients();
    return Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  },

  fetchPatients: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ patients: mockPatients, isLoading: false });
    }, 400);
  },

  setViewMode: (mode) => set({ viewMode: mode }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setSortBy: (field) => set({ sortBy: field, currentPage: 1 }),

  selectPatient: (patient) => set({ selectedPatient: patient }),

  setCurrentPage: (page) => set({ currentPage: page }),

  addPatient: (patient) =>
    set((state) => ({
      patients: [patient, ...state.patients],
      currentPage: 1,
    })),

  updatePatient: (updated) =>
    set((state) => ({
      patients: state.patients.map((p) => (p.id === updated.id ? updated : p)),
      selectedPatient: null,
    })),

  deletePatient: (id) =>
    set((state) => {
      const newPatients = state.patients.filter((p) => p.id !== id);
      const totalPages = Math.max(1, Math.ceil(newPatients.length / PAGE_SIZE));
      return {
        patients: newPatients,
        selectedPatient: null,
        currentPage: Math.min(state.currentPage, totalPages),
      };
    }),

  openForm: (patient) =>
    set({
      isFormOpen: true,
      editingPatient: patient || null,
    }),

  closeForm: () =>
    set({
      isFormOpen: false,
      editingPatient: null,
    }),
}));
