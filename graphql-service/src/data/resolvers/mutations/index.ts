import organizationUser from "./organization-user/organization-user.mutation";
import organization from "./organization/organization.mutation";
import user from "./user/user.mutation";

export default {
  // user service
  ...user,
  ...organization,
  ...organizationUser,
};
