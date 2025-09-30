import { IDataSources } from "../../../../dataSources";
import { IResponse } from "../../../../utils/interfaces/common";

const organizationMutations = {
  async organization_create(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.organizationApi.register(args);
  },
};

export default organizationMutations;
