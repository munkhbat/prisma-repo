export const pagination = (doc: any) => {
  const page = doc.page ? parseInt(doc.page) : 1;
  const limit = doc.limit ? parseInt(doc.limit) : 10;
  const skip = (page - 1) * limit;

  return {
    skip,
    take: limit,
  };
};

export const order = (doc: any) => {
  const sortBy = doc.sortBy || "createdAt";
  const sortOrder = doc.sortOrder || "desc";

  return {
    orderBy: {
      [sortBy]: sortOrder,
    },
  };
};