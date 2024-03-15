import { CustomError } from "../../error/customError";
import { BaseDatabase } from "./baseDatabase";

export class UserDatabase extends BaseDatabase {
  private static TABLE_USER = "fintech_users";

  public signup = async (user: any): Promise<void> => {
    try {
      await UserDatabase.connection
        .insert({
          id: user.id,
          name: user.name,
          email: user.email,
          password: user.password,
          balance: user.balance,
          role: user.role,
          created_at: user.created_at,
        })
        .into(UserDatabase.TABLE_USER);
    } catch (error: any) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };

  public getAllUsers = async (): Promise<any[]> => {
    try {
      const users = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select("id", "name", "email", "balance", "role", "created_at")
        .orderBy("name");

      return users;
    } catch (error: any) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };

  public findUserByEmail = async (email: string): Promise<any> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select()
        .where({ email });

      return result[0];
    } catch (error: any) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };

  public findUserById = async (id: string): Promise<any> => {
    try {
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .select("id", "name", "email", "balance", "role", "created_at")
        .where({ id });

      return result[0];
    } catch (error: any) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };

  public changePassword = async (input: any): Promise<void> => {
    try {
      const { id, newPassword } = input;
      const result = await UserDatabase.connection(UserDatabase.TABLE_USER)
        .update({
          password: newPassword,
        })
        .where("id", "like", id);
    } catch (error: any) {
      throw new CustomError(
        error.statusCode,
        error.sqlMessage || error.message
      );
    }
  };
}
