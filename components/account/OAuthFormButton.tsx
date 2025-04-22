import { handleSignInAuth } from "@/actions/auth-actions";

export default function OAuthFormButton({ provider }: { provider: string }) {
  return (
    <form
      action={async () => {
        await handleSignInAuth(provider);
      }}
    >
      <button
        type="submit"
        className="w-full bg-white text-gray-800 text-base md:text-lg py-2 hover:bg-gray-200 transition-all duration-300 ease-in-out cursor-pointer uppercase border border-gray-400"
      >
        Continue with {provider}
      </button>
    </form>
  );
}
