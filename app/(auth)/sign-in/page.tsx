import SignInForm from "@/components/account/SignInForm";
import Link from "next/link";

export default async function SignIn() {
  return (
    <section className="h-[calc(100vh-3rem)]">
      <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-blue-100 to-blue-50">
        <div className="flex flex-col justify-center items-center ">
          <div className="bg-white shadow-lg rounded p-8 w-[480px] border border-blue-200">
            <h2
              className="text-2xl font-bold text-gray-700 mb-4
          "
            >
              Log Into Your Account
            </h2>
            <SignInForm />
          </div>
          <div className="mt-2 w-[480px]">
            <div className="bg-white shadow-lg rounded p-6 border border-blue-200">
              <p className="text-gray-600 text-base">
                First time at LitStore?{" "}
                <Link
                  href="/sign-up"
                  className="text-blue-600 font-semibold hover:underline transition-colors duration-300"
                >
                  Create an account!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
