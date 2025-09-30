import { IDataSources } from "../../../../dataSources";
import { IResponse } from "../../../../utils/interfaces/common";

const userMutations = {
  async user_register(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.userApi.register(args);
  },

  async user_login(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.userApi.login(args);
  },
};

export default userMutations;
