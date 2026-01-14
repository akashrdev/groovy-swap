"use client";
import { WalletConnect } from "../../wallet-connect";
import { Button } from "../../common/button";
import { useRouter } from "next/navigation";

interface NavbarItem {
  label: string;
  href: string;
}

export const Navbar = () => {
  const router = useRouter();

  const navbarClickHandler = (href: string) => {
    router.push(href);
  };
  const NAVBAR_ITEMS: NavbarItem[] = [
    { label: "Terminal", href: "/" },
    { label: "Jito Latency Explorer", href: "/block-engine-explorer" }
  ];
  return (
    <div className="w-screen sticky left-0 right-0 top-0 px-10 py-4 justify-between flex items-center z-10 ">
      <Button
        variant="ghost"
        className={`sm:text-4xl text-primary-brand text-2xl p-0`}
      >
        Groovy Swap
      </Button>
      <div className="absolute left-1/2 -translate-x-1/2 flex gap-4">
        {NAVBAR_ITEMS.map((navbarItem) => {
          return (
            <Button
              key={navbarItem.label}
              variant="ghost"
              className="text-xl"
              onClick={() => {
                navbarClickHandler(navbarItem.href);
              }}
            >
              {navbarItem.label}
            </Button>
          );
        })}
      </div>
      <div className="ml-auto">
        <WalletConnect />
      </div>
    </div>
  );
};
