export interface User {
  id: number;
  name: string;
  email: string;
  permissions: string[];
  status: 'active' | 'invited';
}

export interface PermissionFormData {
  name: string;
  email: string;
}