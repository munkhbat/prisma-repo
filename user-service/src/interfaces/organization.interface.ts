// organization interfaces

// organization registration
export interface IOrganizationCreate {
  name: string;
  register: string;
  email: string;
}

// get list
export interface IOrganizationGetList {
  id?: string;
  name?: string;
  email?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
