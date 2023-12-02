export interface User {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  nationality: string;
  national_id: string;
  company_id: number;
  profile_img: string;
}

export const UsersTableName = "users";
