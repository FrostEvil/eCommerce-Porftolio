import { handleSignOut } from "@/actions/auth-actions";
import { Dispatch, SetStateAction } from "react";

export default function AccountManagement({
  setShowLinks,
}: {
  setShowLinks: Dispatch<SetStateAction<boolean>>;
}) {
  const handleLogOut = () => {
    handleSignOut();
    setShowLinks(false);
  };
  return (
    <div className="absolute z-30 bg-gradient-to-r from-blue-200 via-blue-50 to-blue-300 shadow-lg top-0 right-0 w-56 border border-blue-300 animate-fadeIn">
      <div className="flex flex-col gap-3 p-4">
        <button
          className="text-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition-all w-full text-center py-2 rounded-lg shadow-md uppercase"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
}
