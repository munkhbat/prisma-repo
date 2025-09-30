import { IDataSources } from "../../../../dataSources";
import { IResponse } from "../../../../utils/interfaces/common";

const organizationUserMutations = {
  async organization_user_create(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.organizationUserApi.create(args);
  },

  async organization_user_remove(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.organizationUserApi.remove(args);
  },
};

export default organizationUserMutations;
