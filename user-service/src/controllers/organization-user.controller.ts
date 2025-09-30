import i18n from "i18n";
import {
  IOrganizationUserCreate,
  IOrganizationUserGetList,
  IOrganizationUserRemove,
} from "../interfaces/organization-user.interface";
import { db } from "../utils/db.server";
import { order, pagination } from "../utils/pagination";
import {
  validateCreate,
  validateRemove,
} from "../validations/organization-user.validation";

export class OrganizationUserController {
  // add user to organization
  static async create(doc: IOrganizationUserCreate) {
    try {
      // validate doc
      const filtered = await validateCreate(doc);

      //  check org
      const organization = await db.organization.findFirst({
        where: { id: filtered.organizationId },
      });

      if (!organization) {
        throw new Error(i18n.__("error.organization.not_found"));
      }

      // check user
      const user = await db.user.findFirst({
        where: { id: filtered.userId },
      });

      if (!user) {
        throw new Error(i18n.__("error.user.not_found"));
      }

      // check existing
      const existingMembership = await db.userOrganization.findFirst({
        where: {
          userId: filtered.userId,
          organizationId: filtered.organizationId,
        },
      });

      if (existingMembership) {
        throw new Error(i18n.__("error.membership.already_exists"));
      }

      // create
      await db.userOrganization.create({
        data: {
          userId: filtered.userId,
          organizationId: filtered.organizationId,
          role: filtered.role,
        },
      });

      return i18n.__("success.ok");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // remove user from organization
  static async remove(doc: IOrganizationUserRemove) {
    try {
      // validate doc
      const filtered = await validateRemove(doc);

      // check existing
      const membership = await db.userOrganization.findFirst({
        where: {
          userId: filtered.userId,
          organizationId: filtered.organizationId,
        },
      });

      if (!membership) {
        throw new Error(i18n.__("error.membership.not_found"));
      }

      // remove
      await db.userOrganization.delete({
        where: { id: membership.id },
      });

      return i18n.__("success.ok");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // query builder
  static async query(doc: IOrganizationUserGetList): Promise<object> {
    const { organizationId, userId, role } = doc;

    const conditions: any[] = [];

    if (organizationId) conditions.push({ organizationId });
    if (userId) conditions.push({ userId });
    if (role)
      conditions.push({
        role: { contains: role, mode: "insensitive" },
      });

    if (conditions.length === 0) {
      return {};
    }

    return { AND: conditions };
  }

  // get organization users list
  static async getList(doc: IOrganizationUserGetList, user: any) {
    // query
    const where = await this.query(doc);

    const [rows, count] = await Promise.all([
      db.userOrganization.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              email: true,
            },
          },
          organization: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        ...order(doc),
        ...pagination(doc),
      }),
      db.userOrganization.count({ where }),
    ]);

    return { rows, count };
  }
}
