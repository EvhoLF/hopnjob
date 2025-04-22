export type PointVacancies = {
  id: string;
  companyId: string;
  coords: [number, number]; // [longitude, latitude]
  vacancies: string[];
};