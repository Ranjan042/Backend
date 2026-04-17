import React from "react";

const CWG = () => {
  return (
    <a
      href="/api/auth/google"
      className="flex items-center justify-center gap-3 w-full py-3.5 border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-black font-space text-[11px] font-bold uppercase tracking-[0.15em]"
    >
      <img
        src="https://developers.google.com/identity/images/g-logo.png"
        alt="Google"
        className="w-4 h-4"
      />
      Continue with Google
    </a>
  );
};

export default CWG;