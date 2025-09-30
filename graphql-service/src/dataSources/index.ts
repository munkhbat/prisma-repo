import UserApi from "./user/userApi";
import OrganizationApi from "./organization/organizationApi";
import OrganizationUserApi from "./organization-user/organizationUserApi";

export const contextDataSources = async (
  user: object | null
): Promise<object> => {
  return {
    userApi: new UserApi(user),
    organizationApi: new OrganizationApi(user),
    organizationUserApi: new OrganizationUserApi(user),
  };
};

export interface IDataSources {
  userApi: UserApi;
  organizationApi: OrganizationApi;
  organizationUserApi: OrganizationUserApi;
}
