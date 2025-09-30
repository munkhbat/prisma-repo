import { db } from "../database";

export default class TokenController {
  static async userTokenCheck(userId: string): Promise<any> {
    const tokendb = await db.$queryRaw<Array<{ token: string }>>`
      SELECT token FROM "tokens" WHERE "userId" = ${userId}
    `;

    if (!tokendb || tokendb.length === 0) return null;
    console.log(tokendb[0]);

    return tokendb[0];
  }
}
