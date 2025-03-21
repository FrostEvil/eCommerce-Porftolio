import crypto from "node:crypto";

export function hashPassword(password: string, salt: string): Promise<string> {
  // const salt = generateSalt();

  return new Promise((resolve, reject) => {
    crypto.scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);

      resolve(hash.toString("hex").normalize());
    });
  });

  // const hashedPassword = crypto.scryptSync(password, salt, 64);
  // return hashedPassword.toString("hex") + ":" + salt;
}

export async function comparePasswords({
  password,
  salt,
  hashedPassword,
}: {
  password: string;
  salt: string;
  hashedPassword: string;
}) {
  const inputHashedPassword = await hashPassword(password, salt);

  return crypto.timingSafeEqual(
    Buffer.from(inputHashedPassword, "hex"),
    Buffer.from(hashedPassword, "hex")
  );
}

// export function verifyPassword(storedPassword: any, suppliedPassword: any) {
//   const [hashedPassword, salt] = storedPassword.split(":");
//   const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
//   const suppliedPasswordBuf = crypto.scryptSync(suppliedPassword, salt, 64);
//   return crypto.timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
// }

export function generateSalt() {
  return crypto.randomBytes(16).toString("hex").normalize();
}
