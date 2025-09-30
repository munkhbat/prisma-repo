import { db } from "../database";

export default class UserController {
  static async userIdCheck(id: string): Promise<any> {
    const users = await db.$queryRaw<Array<{ id: string }>>`
      SELECT id FROM users WHERE id = ${id}
    `;

    if (!users || users.length === 0) return null;
    return users[0];
  }
}
