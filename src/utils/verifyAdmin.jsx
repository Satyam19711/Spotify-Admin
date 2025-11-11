import { toast } from "react-toastify";
import React, { useEffect } from "react";
import { Lock } from "lucide-react";

export const verifyAdmin = async () => {
  return new Promise((resolve) => {
    let password = "";

    const handleSubmit = () => {
      const correctPassword = import.meta.env.VITE_ADMIN_KEY;

      if (password === correctPassword) {
        toast.dismiss("admin-password-input");
        toast.success("Access granted");
        resolve(true);
      } else {
        toast.error("Invalid password");
        resolve(false);
      }
    };

    const ToastInput = () => {
      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.key === "Enter") handleSubmit();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
      }, []);

      return (
        <div className="flex flex-col items-center gap-3 p-2">
          <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
            <Lock size={16} /> Enter Admin Password
          </div>

          <input
            type="password"
            placeholder="Type your password"
            className="border border-slate-300 rounded px-2 py-1 text-sm w-56 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-400 transition"
            onChange={(e) => (password = e.target.value)}
            autoFocus
          />

          <button
            onClick={handleSubmit}
            className="bg-green-600 text-white text-sm px-4 py-1.5 rounded cursor-pointer hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      );
    };

    toast.info(<ToastInput />, {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-center",
      toastId: "admin-password-input",
    });
  });
};
