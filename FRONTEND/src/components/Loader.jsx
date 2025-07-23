import React from "react";

const Loader = () => {
  const spinClockwise = {
    animation: "spin 1s linear infinite",
  };

  const spinCounter = {
    animation: "spin 1s linear infinite reverse",
  };

  const pulseDot = {
    animation: "pulse 1.5s ease-in-out infinite",
  };

  const pulseDotDelay = {
    animation: "pulse 1.5s ease-in-out infinite 0.5s",
  };

  const keyframes = `
   @keyframes spin {
 to { transform: rotate(360deg); }
 }

 @keyframes pulse {
 0%, 100% { opacity: 1; transform: scale(1); }
 50% { opacity: 0.4; transform: scale(1.2); }
 }
 `;

  return (
    <>
      <style>{keyframes}</style>{" "}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        {" "}
        <div className="relative w-24 h-24">
          {/* Outer ring */}{" "}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-r-blue-400 shadow-lg shadow-blue-500/30"
            style={spinClockwise}
          ></div>
          {/* Inner ring */}{" "}
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-b-blue-500 border-l-blue-400 shadow-md shadow-blue-400/20"
            style={spinCounter}
          ></div>
          {/* Center circle */}{" "}
          <div className="absolute inset-6 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10">
            {" "}
            <span className="text-sm font-semibold text-blue-400 tracking-wide">
              Loading...{" "}
            </span>{" "}
          </div>
          {/* Top dot */}{" "}
          <div
            className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-400"
            style={pulseDot}
          ></div>
          {/* Bottom dot */}{" "}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-3 h-3 rounded-full bg-blue-300"
            style={pulseDotDelay}
          ></div>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
};

export { Loader };
