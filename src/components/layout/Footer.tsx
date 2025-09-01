import Link from "next/link";
import { MessageSquare, Instagram, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-white">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="flex flex-col items-center gap-8">
          <Image src="https://hypesocks.com/wp-content/uploads/2025/01/Mask-group-7-768x221.png" alt="Hype Socks Logo" width={150} height={43} className="h-12 w-auto" />
          <div className="w-full border-t border-gray-700"></div>
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-5 md:text-left">
            <Link href="#" className="text-sm hover:underline">Home</Link>
            <Link href="#" className="text-sm hover:underline">Categories</Link>
            <Link href="#" className="text-sm hover:underline">About Us</Link>
            <Link href="#" className="text-sm hover:underline">My Account</Link>
            <Link href="#" className="text-sm hover:underline">Tracking Order</Link>
          </div>
          <div className="w-full border-t border-gray-700"></div>
          <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-center text-sm text-gray-400">
              Copyright © 2025 <span className="text-accent">HYPE</span>. All Rights Reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm hover:underline">Terms and Conditions</Link>
              <span className="text-gray-500">|</span>
              <Link href="#" className="text-sm hover:underline">Privacy Policy</Link>
            </div>
            <div className="flex items-center gap-3">
              <a href="#" className="rounded-full bg-accent p-2 text-primary-foreground hover:bg-accent/90">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-accent p-2 text-primary-foreground hover:bg-accent/90">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="rounded-full bg-accent p-2 text-primary-foreground hover:bg-accent/90">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <button className="fixed bottom-5 right-5 rounded-full bg-accent p-4 text-white shadow-lg hover:bg-accent/90">
        <MessageSquare className="h-6 w-6" />
      </button>
    </footer>
  );
}
