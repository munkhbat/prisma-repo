import organizationUser from "./organization-user/organization-user.query";
import organization from "./organization/organization.query";
import user from "./user/user.query";

export default {
  // user service
  ...user,
  ...organization,
  ...organizationUser,
};
