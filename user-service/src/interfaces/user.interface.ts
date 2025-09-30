// user interfaces

// user registration
export interface IRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

// user login
export interface ILogin {
  email: string;
  password: string;
}

// user search parameters
export interface IUserSearchParam {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}
