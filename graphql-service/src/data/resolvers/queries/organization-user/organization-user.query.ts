import { IDataSources } from "../../../../dataSources";
import { IResponse } from "../../../../utils/interfaces/common";

const organizationUserQueries = {
  async get_organization_users(
    _root: any,
    args: object,
    { dataSources }: { dataSources: IDataSources }
  ): Promise<IResponse> {
    return await dataSources.organizationUserApi.getList(args);
  },
};

export default organizationUserQueries;
