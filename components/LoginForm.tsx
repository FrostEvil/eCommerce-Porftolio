"use client";

import { ChangeEvent, useActionState, useEffect, useState } from "react";
import { auth } from "@/actions/auth-actions";
import Link from "next/link";
import { FaUserPlus, FaSignInAlt } from "react-icons/fa";
import Modal from "./Modal";
import { cn } from "@/lib/utils";

const initialState = {
  emailError: [],
  passwordError: [],
  successMessage: "",
  success: false,
};

export default function LoginForm({ mode }: { mode: string }) {
  const [state, formAction, pending] = useActionState(
    auth.bind(null, mode),
    initialState
  );
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [resetError, setResetErrors] = useState({
    email: false,
    password: false,
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setFormData({ email: "", password: "" });
    setResetErrors({ email: false, password: false });
    setShowModal(state.success);
  }, [state]);

  const handleChangeData = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setResetErrors((prevData) => ({
      ...prevData,
      [name]: true,
    }));
  };

  return (
    <>
      {showModal && (
        <Modal
          show={showModal}
          onClose={() => setShowModal(false)}
          metadata={{
            title: "🎉 Account Created Successfully!",
            submit: "Log in",
            redirectTo: "/account?mode=login",
          }}
        >
          Your account has been created! You can now log in and start exploring.
          Check your email for a confirmation message, and let us know if you
          need any help!{" "}
        </Modal>
      )}
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg h-fit">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Login or Create Account!
        </h2>
        <form action={formAction} className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChangeData}
              value={formData.email}
              placeholder="Enter your e-mail"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {state.emailError && !resetError.email && (
              <p aria-live="polite" className="text-sm text-red-500">
                {state.emailError[0]}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={handleChangeData}
              value={formData.password}
              placeholder="Enter your password"
              className="px-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {state.passwordError && !resetError.password && (
              <p className="text-sm text-red-500">{state.passwordError[0]}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              disabled={pending}
              className={cn(
                "px-6 py-2 flex items-center justify-center rounded-md transition duration-200",
                pending
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              )}
            >
              {pending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : mode === "login" ? (
                "Login"
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
        <div className="py-4 flex w-full justify-center">
          {mode === "login" ? (
            <Link
              className="text-blue-500 font-semibold flex items-center space-x-2 hover:underline transition duration-200"
              href="/account/?mode=signup"
            >
              <FaUserPlus />
              <span>Create an account.</span>
            </Link>
          ) : (
            <Link
              className="text-blue-500 font-semibold flex items-center space-x-2 hover:underline transition duration-200"
              href="/account/?mode=login"
            >
              <FaSignInAlt />
              <span>Login with existing account.</span>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
