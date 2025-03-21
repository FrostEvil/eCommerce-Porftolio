"use server";

import { verifyPassword } from "@/lib/passwordHasher";
import { createSession, deleteSession } from "@/lib/session";
import { createUser, getUserByEmail } from "@/lib/users";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUserSession } from "./session-actions";

interface SqliteError extends Error {
  code: string;
}

// Check mode to login or signup
export async function auth(mode: string, prevState: any, formData: FormData) {
  if (mode === "login") {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}

export async function signup(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return {
      emailError: ["Email and password are required!"],
      passwordError: [],
      successMessage: "",
      success: false,
    };
  }

  // Create a Zod schema to validate email and password
  const formSchema = z.object({
    email: z
      .string()
      .email("Invalid email address")
      .min(5, "Email must be at least 5 characters long"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-zA-Z]/, "Password must contain at least one letter")
      .regex(/[0-9]/, "Password must contain at least one number"),
  });

  const validationResult = formSchema.safeParse({ email, password });

  if (!validationResult.success) {
    const errorMessages = validationResult.error.flatten().fieldErrors;
    return {
      emailError: errorMessages.email,
      passwordError: errorMessages.password,
      successMessage: "",
      success: false,
    };
  }

  try {
    createUser(email!, password!);

    return {
      emailError: [],
      passwordError: [],
      successMessage: ["User created successfully! Now you can log in."],
      success: true,
    };
  } catch (error) {
    if ((error as SqliteError).code === "SQLITE_CONSTRAINT_UNIQUE") {
      return {
        emailError: [
          "Account with this email already exists. Please try to login",
        ],
        passwordError: [],
        successMessage: "",
        success: false,
      };
    }

    console.error("Error creating user:", error);

    return {
      emailError: ["Something went wrong. Please try again."],
      passwordError: [],
      successMessage: "",
      success: false,
    };
  }
}

export async function login(prevState: any, formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    return {
      emailError: ["Email and password are required!"],
      passwordError: [],
      successMessage: "",
      success: false,
    };
  }

  const existingUser = getUserByEmail(email as string);

  if (!existingUser) {
    return {
      emailError: ["User does not exist."],
      passwordError: [],
      successMessage: "",
      success: false,
    };
  }
  const isValidPassword = verifyPassword(existingUser.password, password);

  if (!isValidPassword) {
    return {
      emailError: [],
      passwordError: ["Password is incorrect, try again."],
      successMessage: "",
      success: false,
    };
  }

  const session = await createSession(existingUser.id);

  //is necessary use 'server action'? or better create session here?
  await createUserSession(existingUser.id, session);

  redirect("/products");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
