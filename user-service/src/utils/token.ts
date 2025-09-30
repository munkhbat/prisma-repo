import jwt from "jsonwebtoken";
import { db } from "./db.server";

export class TokenUtil {
  private static readonly JWT_SALT = process.env.JWT_SALT || "your-secret-key";
  private static readonly TOKEN_EXPIRY = "30d"; // 30 өдөр

  static generateToken(userId: string): string {
    return jwt.sign({ userId }, this.JWT_SALT, {
      expiresIn: this.TOKEN_EXPIRY,
    });
  }

  static verifyToken(token: string): { userId: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SALT) as { userId: string };
      return decoded;
    } catch (error) {
      return null;
    }
  }

  static async createUserToken(userId: string): Promise<string> {
    // Хуучин token-уудыг идэвхгүй болгох
    await db.token.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });

    const token = this.generateToken(userId);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 өдрийн дараа дуусна

    // Шинэ token database-д хадгалах
    await db.token.create({
      data: {
        token,
        userId,
        expiresAt,
        isActive: true,
      },
    });

    return token;
  }

  static async validateToken(
    token: string
  ): Promise<{ isValid: boolean; userId?: string }> {
    try {
      // JWT verify
      const decoded = this.verifyToken(token);
      if (!decoded) {
        return { isValid: false };
      }

      // Database-аас token шалгах
      const dbToken = await db.token.findFirst({
        where: {
          token,
          isActive: true,
          expiresAt: { gt: new Date() },
        },
      });

      if (!dbToken) {
        return { isValid: false };
      }

      return { isValid: true, userId: decoded.userId };
    } catch (error) {
      return { isValid: false };
    }
  }

  static async revokeToken(token: string): Promise<boolean> {
    try {
      await db.token.updateMany({
        where: { token },
        data: { isActive: false },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
