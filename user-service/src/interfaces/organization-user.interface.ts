// OrganizationUser interfaces

// add user to organization
export interface IOrganizationUserCreate {
  organizationId: string;
  userId: string;
  role: string;
}

// get organization users list
export interface IOrganizationUserGetList {
  organizationId?: string;
  userId?: string;
  role?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// remove user from organization
export interface IOrganizationUserRemove {
  organizationId: string;
  userId: string;
}
