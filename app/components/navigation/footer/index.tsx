import Link from "next/link";

export const Footer = () => {
  return (
    <div className="w-screen border-t border-t-primary-border h-7 px-6 py-2 justify-center flex">
      <span>
        Made with ❤️ by{" "}
        <Link
          href="https://github.com/akashrdev"
          className="text-primary-btn font-ranchers"
        >
          Akash Rajan
        </Link>
      </span>
    </div>
  );
};
