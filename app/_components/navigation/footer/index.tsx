import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-screen border-t border-t-primary-accent h-7 px-6 py-2 justify-center flex items-center">
      <span className="text-primary-brand font-aeonik text-xs">
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/akashrdev"
          className="text-primary-brand font-ppneuebit text-xl"
        >
          Akash Rajan
        </Link>
      </span>
    </div>
  );
};
