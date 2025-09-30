import { IDataSources } from "../../../../dataSources";
import { IResponse } from "../../../../utils/interfaces/common";

const organizationQueries = {
  async get_organizations(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.organizationApi.getList(args);
  },
};

export default organizationQueries;
