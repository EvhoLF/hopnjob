import Vacancy from "./Vacancy";

export type CompanyPoint = {
  id: string;
  companyName: string;
  coords: [number, number]; // [longitude, latitude]
  vacancies: Vacancy[];
};