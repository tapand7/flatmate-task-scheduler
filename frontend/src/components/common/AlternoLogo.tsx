interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

export default function AlternoLogo({ size = "md", showTagline = false }: LogoProps) {
  const sizes = {
    sm: "scale-90",
    md: "scale-100",
    lg: "scale-110",
  };

  return (
    <div className={`flex origin-left items-center gap-3 ${sizes[size]}`}>
      <div className="flex items-center gap-3 rounded-xl bg-[#1A1F8C] px-3 py-2 text-white shadow-sm shadow-indigo-950/15">
        <div className="relative grid h-9 w-9 overflow-hidden rounded-lg bg-[#2D35D4] text-xs font-black after:absolute after:inset-0 after:-translate-x-full after:skew-x-[-20deg] after:bg-white/15 after:content-[''] hover:after:translate-x-[220%] hover:after:transition-transform hover:after:duration-700">
          aN
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xl font-black">alterno</span>
          <span className="rounded-md bg-[#7F89DA]/30 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#87CEEB]">
            beta
          </span>
        </div>
      </div>
      {showTagline && <span className="text-sm font-medium text-[#6B75D4]">Task and workflow manager</span>}
    </div>
  );
}
