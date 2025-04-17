import { create } from 'zustand';
import Vacancy from '../types/Vacancy';

type VacancyState = {
  selectedVacancy: Vacancy | null;
  setVacancy: (v: Vacancy) => void;
  clearVacancy: () => void;
};

export const useVacancyStore = create<VacancyState>((set) => ({
  selectedVacancy: null,
  setVacancy: (v) => set({ selectedVacancy: v }),
  clearVacancy: () => set({ selectedVacancy: null }),
}));
