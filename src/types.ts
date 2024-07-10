export interface UserDto {
  id?: string;
  username?: string;
  email?: string;
  fullname?: string;
  first_name?: string;
  last_name?: string;
  roles?: Array<number>;
  role?: string;
  password?: string;
  new_password?: string;
  phone?: string;
  status?: boolean;
}
