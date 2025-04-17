type Vacancy = {
  id: string;
  title: string;
  salaryFrom: number;
  salaryTo: number;
  currency: '₸' | '₽' | '$';
  period: 'месяц' | 'час';
  experience: string;
  employment: string;
  schedule: string;
  hours: number;
  format: string;
  tags: string[];
};

export default Vacancy;