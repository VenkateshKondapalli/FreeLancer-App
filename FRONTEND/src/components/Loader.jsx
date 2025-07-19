const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-950/90 backdrop-blur-md flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center gap-5">
        {/* 3D Orb Spinner */}
        <div className="relative w-24 h-24">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-600/20 blur-[6px]" />

          {/* Main sphere */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 shadow-[0_0_30px_0_rgba(99,102,241,0.5)] animate-pulse-slow" />

          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-indigo-300/80 border-r-purple-300/80 animate-spin-slow" />
          <div className="absolute inset-3 rounded-full border-[3px] border-transparent border-b-indigo-200/60 border-l-purple-200/60 animate-spin-reverse" />

          {/* Center highlight */}
          <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/10 to-white/5" />
        </div>

        {/* Animated text */}
        <div className="text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-purple-200 font-medium tracking-wider text-sm uppercase">
            <span className="inline-flex items-baseline">
              Loading
              <span className="ml-1.5 flex">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="animate-wave text-purple-300"
                    style={{
                      animationDelay: `${i * 0.15}s`,
                      transformOrigin: "bottom center",
                    }}
                  >
                    .
                  </span>
                ))}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};
export { Loader };
