export interface Vacancy {
  id: string;
  companyId: string;
  label: string;
  salaryFrom: number;
  salaryTo: number;
  currency: '₸' | '₽' | '$';
  unit: 'hour' | 'day' | 'month';
  experience: string | null;
  tags: string[]
}