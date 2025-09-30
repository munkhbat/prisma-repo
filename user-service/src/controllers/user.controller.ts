import i18n from "i18n";
import {
  ILogin,
  IRegister,
  IUserSearchParam,
} from "../interfaces/user.interface";
import { db } from "../utils/db.server";
import { HashUtil } from "../utils/hash";
import { order, pagination } from "../utils/pagination";
import { TokenUtil } from "../utils/token";
import {
  validateLogin,
  validateRegister,
} from "../validations/user.validation";

export class UserController {
  // user registration
  static async register(doc: IRegister) {
    try {
      // query
      const filtered = await validateRegister(doc);

      // existing
      const existingUser = await db.user.findFirst({
        where: { email: filtered.email },
      });

      if (existingUser) {
        throw new Error(i18n.__("model.already_created"));
      }

      const hashedPassword = await HashUtil.hashPassword(doc.password);

      const user = await db.user.create({
        data: {
          firstName: filtered.firstName,
          lastName: filtered.lastName,
          email: filtered.email,
          password: hashedPassword,
        },
      });

      // craete token
      await TokenUtil.createUserToken(user.id);

      return i18n.__("success.ok");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // user login
  static async login(doc: ILogin) {
    try {
      // validate doc
      const filtered = await validateLogin(doc);

      const user = await db.user.findFirst({
        where: { email: filtered.email },
      });

      if (!user) throw new Error(i18n.__("error.user.not_found"));

      const isPasswordValid = await HashUtil.comparePassword(
        filtered.password,
        user.password
      );

      if (!isPasswordValid)
        throw new Error(i18n.__("error.password.not_match"));

      const userToken = await db.token.findFirst({
        where: {
          userId: user.id,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
      });

      if (!userToken) throw new Error(i18n.__("error.token.not_found"));

      return i18n.__("success.ok");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // Get user query
  static async query(doc: IUserSearchParam): Promise<object> {
    const { id, firstName, lastName, email } = doc;

    const conditions: any[] = [];

    if (id) conditions.push({ id });
    if (firstName)
      conditions.push({
        firstName: { contains: firstName, mode: "insensitive" },
      });
    if (lastName)
      conditions.push({
        lastName: { contains: lastName, mode: "insensitive" },
      });
    if (email)
      conditions.push({ email: { contains: email, mode: "insensitive" } });

    if (conditions.length === 0) {
      return {};
    }

    return { OR: conditions };
  }

  // get user list
  static async getList(doc: IUserSearchParam) {
    const where = await this.query(doc);

    const [rows, count] = await Promise.all([
      db.user.findMany({
        where,
        ...order(doc),
        ...pagination(doc),
      }),
      db.user.count({ where }),
    ]);

    return { rows, count };
  }
}
