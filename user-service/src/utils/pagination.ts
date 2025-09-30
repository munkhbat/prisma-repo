// Pagination and ordering utilities

export interface IPaginationParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  orderDirection?: "asc" | "desc";
}

export interface IPaginationResult<T> {
  rows: T[];
  count: number;
}

// Pagination function
export const pagination = (doc: any) => {
  const page = doc.page && doc.page > 0 ? doc.page : 1;
  const limit = doc.limit && doc.limit > 0 ? doc.limit : 10;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
};

// Order function
export const order = (doc: any) => {
  const orderBy = doc.orderBy || "createdAt";
  const orderDirection = doc.orderDirection || "desc";

  return {
    orderBy: {
      [orderBy]: orderDirection,
    },
  };
};