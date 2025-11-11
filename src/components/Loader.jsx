import React from "react";

const Loader = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
    <div className="flex items-center space-x-3 p-4 bg-white rounded shadow">
      <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-slate-700 rounded-full"></div>
      <div className="text-slate-700 font-medium">Loading...</div>
    </div>
  </div>
);

export default Loader;
