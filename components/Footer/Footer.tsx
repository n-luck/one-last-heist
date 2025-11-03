import { APP_NAME } from "@/lib/constants";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="wrapper flex-center">
      <p>
        All rights reserved &#169; {APP_NAME} {currentYear}
      </p>
    </footer>
  );
};
