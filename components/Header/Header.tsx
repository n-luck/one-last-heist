import { Logo } from "./Logo";
import { Menu } from "./Menu";

export const Header = () => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex-between">
        <div className="flex-start">
          <Logo />
        </div>
        <div className="flex-center">
          <Menu />
        </div>
      </div>
    </header>
  );
};
