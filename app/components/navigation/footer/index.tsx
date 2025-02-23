import Link from "next/link";
import { Ranchers } from "next/font/google";

const ranchers = Ranchers({ subsets: ["latin"], weight: "400" });

export const Footer = () => {
  return (
    <div className="w-screen border-t border-t-primary-border h-7 px-6 py-2 justify-center flex items-center">
      <span>
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/akashrdev"
          className={`${ranchers.className} text-primary-btn`}
        >
          Akash Rajan
        </Link>
      </span>
    </div>
  );
};
