const Loader = () => {
  return (
    <div className="fixed inset-0 bg-gray-950/95 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center gap-6">
        {/* Advanced 3D Orb with Holographic Effect */}
        <div className="relative w-28 h-28">
          {/* Outer Glow */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/30 to-indigo-600/30 blur-[8px] animate-pulse-glow" />

          {/* Main Sphere with 3D Illusion */}
          <div className="absolute inset-1 rounded-full bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 shadow-[0_0_40px_0_rgba(59,130,246,0.6)] animate-pulse-3d">
            {/* Holographic Rings */}
            <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-blue-400/70 animate-spin-3d" />
            <div
              className="absolute inset-0 rounded-full border-[3px] border-transparent border-r-indigo-400/60 animate-spin-3d-reverse"
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className="absolute inset-2 rounded-full border-[2px] border-transparent border-b-purple-300/50 animate-spin-3d"
              style={{ animationDelay: "0.6s" }}
            />

            {/* Core Light */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent" />

            {/* Floating Particles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 rounded-full bg-blue-300/80 animate-float"
                style={{
                  top: `${Math.random() * 60 + 20}%`,
                  left: `${Math.random() * 60 + 20}%`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Animated Text with Typing Effect */}
        <div className="text-center">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-300 font-medium tracking-wider text-sm uppercase relative">
            <span className="inline-flex items-center">
              Loading
              <span className="ml-1.5 flex">
                {[...Array(3)].map((_, i) => (
                  <span
                    key={i}
                    className="animate-wave text-indigo-300"
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
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent animate-scan" />
          </span>
        </div>
      </div>
    </div>
  );
};

export { Loader };
