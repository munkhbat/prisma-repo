import i18n from "i18n";
import {
  IOrganizationCreate,
  IOrganizationGetList,
} from "../interfaces/organization.interface";
import { db } from "../utils/db.server";
import { order, pagination } from "../utils/pagination";
import { validateCreateOrg } from "../validations/organization.validation";

export class OrganizationController {
  // organization craete
  static async create(doc: IOrganizationCreate) {
    try {
      // validate doc
      const filtered = await validateCreateOrg(doc);

      // check org
      const existingOrg = await db.organization.findFirst({
        where: {
          OR: [{ register: filtered.register }, { email: filtered.email }],
        },
      });

      if (existingOrg) throw new Error(i18n.__("model.already_created"));

      // create org
      await db.organization.create({
        data: {
          name: filtered.name,
          register: filtered.register,
          email: filtered.email,
        },
      });

      return i18n.__("success.ok");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // query
  static async query(doc: any): Promise<object> {
    const { id, name, email } = doc;

    const conditions: any[] = [];

    if (id) conditions.push({ id });
    if (name)
      conditions.push({
        name: { contains: name, mode: "insensitive" },
      });
    if (email)
      conditions.push({ email: { contains: email, mode: "insensitive" } });

    if (conditions.length === 0) {
      return {};
    }

    return { OR: conditions };
  }

  // get list
  static async getList(doc: IOrganizationGetList, user: any) {
    // query
    const where = await this.query(doc);

    const [rows, count] = await Promise.all([
      db.organization.findMany({
        where,
        ...order(doc),
        ...pagination(doc),
      }),
      db.organization.count({ where }),
    ]);

    return { rows, count };
  }
}
