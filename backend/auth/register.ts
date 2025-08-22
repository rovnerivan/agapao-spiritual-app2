import { api } from "encore.dev/api";
import { authDB } from "./db";

export interface RegisterUserRequest {
  googleId: string;
  countryCode: string;
}

export interface User {
  id: string;
  googleId: string;
  countryCode: string;
  createdAt: Date;
}

// Registers a new anonymous user after Google OAuth
export const register = api<RegisterUserRequest, User>(
  { expose: true, method: "POST", path: "/auth/register" },
  async (req) => {
    const existingUser = await authDB.queryRow<User>`
      SELECT id, google_id as "googleId", country_code as "countryCode", created_at as "createdAt"
      FROM users_anonymous 
      WHERE google_id = ${req.googleId}
    `;

    if (existingUser) {
      await authDB.exec`
        UPDATE users_anonymous 
        SET last_login = NOW() 
        WHERE google_id = ${req.googleId}
      `;
      return existingUser;
    }

    const newUser = await authDB.queryRow<User>`
      INSERT INTO users_anonymous (google_id, country_code)
      VALUES (${req.googleId}, ${req.countryCode})
      RETURNING id, google_id as "googleId", country_code as "countryCode", created_at as "createdAt"
    `;

    return newUser!;
  }
);
