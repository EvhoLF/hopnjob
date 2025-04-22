import { PointVacancies } from "../types/PointVacancies";
import { VacancyData } from "./VacancyData";

export const PointVacanciesData: PointVacancies[] = [
  {
    id: 'vp1',
    companyId: 'c1',
    coords: [71.430, 51.128],
    vacancies: VacancyData.filter(v => v.companyId === 'c1').map(e => e.id),
  },
  {
    id: 'vp2',
    companyId: 'c2',
    coords: [76.945, 43.238],
    vacancies: VacancyData.filter(v => v.companyId === 'c2').map(e => e.id),
  },
  {
    id: 'vp3',
    companyId: 'c3',
    coords: [80.264, 50.417],
    vacancies: VacancyData.filter(v => v.companyId === 'c3').map(e => e.id),
  },
  {
    id: 'vp4',
    companyId: 'c4',
    coords: [37.6173, 55.7558],
    vacancies: VacancyData.filter(v => v.companyId === 'c4').map(e => e.id),
  },
  {
    id: 'vp5',
    companyId: 'c5',
    coords: [69.590, 42.341],
    vacancies: VacancyData.filter(v => v.companyId === 'c5').map(e => e.id),
  },
];