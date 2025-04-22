export type Role = 'jobseeker' | 'employer';

export interface User {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  avatar?: string;
}