export default function Footer() {
  return (
    <footer className="flex h-10 items-center justify-center border-t border-[#E8EAFF] bg-white px-5 text-xs text-[#6B75D4] dark:border-[#2D35D4]/30 dark:bg-[#1A1F8C] dark:text-[#87CEEB]">
      © {new Date().getFullYear()} alterno · Smart task &amp; workflow manager
    </footer>
  );
}
