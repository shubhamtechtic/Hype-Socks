import Link from "next/link";
import { ChevronDown, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://hypesocks.com/wp-content/uploads/2025/01/Group-1321314334-2048x590.png" alt="Hype Socks Logo" width={120} height={35} className="h-8 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">HOME</Link>
          <Link href="/build" className="text-sm font-medium text-gray-600 hover:text-gray-900">BUILDER</Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">
              BY SPORT <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Basketball</DropdownMenuItem>
              <DropdownMenuItem>Football</DropdownMenuItem>
              <DropdownMenuItem>Baseball</DropdownMenuItem>
              <DropdownMenuItem>Soccer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
           <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900">
              BY LENGTH <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ankle</DropdownMenuItem>
              <DropdownMenuItem>Quarter</DropdownMenuItem>
              <DropdownMenuItem>Crew</DropdownMenuItem>
              <DropdownMenuItem>Knee High</DropdownMenuItem>
              <DropdownMenuItem>Over The Knee</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">CONTACT US</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">GET A QUOTE</Link>
          <Link href="#" className="text-sm font-medium text-gray-600 hover:text-gray-900">ABOUT US</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Account</span>
          </Button>
          <Button variant="ghost" size="icon">
            <ShoppingCart className="h-5 w-5 text-gray-600" />
            <span className="sr-only">Cart</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
