import { ReactNode } from "react";

interface NavBarProps {
  children?: ReactNode;
}

function NavBar({ children }: NavBarProps) {
  return (
    <nav className="bg-primary">
      <div className="px-8 h-12 flex items-center">{children}</div>
    </nav>
  );
}

export default NavBar;
