import customScalars from "./custom-scalars";
import Mutation from "./mutations";
import Query from "./queries";

const resolvers = {
  ...customScalars,
  Query,
  Mutation,
};

export default resolvers;
