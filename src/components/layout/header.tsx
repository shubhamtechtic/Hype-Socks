'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Menu, X, User, ShoppingCart, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const navigationLinks = [
    { label: 'HOME', href: '#', hasDropdown: false },
    { label: 'BUILDER', href: '#', hasDropdown: false },
    { label: 'BY SPORT', href: '#', hasDropdown: true },
    { label: 'BY LENGTH', href: '#', hasDropdown: true },
    { label: 'CONTACT US', href: '#', hasDropdown: false },
    { label: 'GET A QUOTE', href: '#', hasDropdown: false },
    { label: 'ABOUT US', href: '#', hasDropdown: false },
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="HYPE Logo"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigationLinks.map((link, index) => (
              <div key={index} className="relative group">
                <a
                  href={link.href}
                  className="text-gray-600 hover:text-primary transition-colors duration-200 text-sm font-medium uppercase tracking-wide flex items-center gap-1"
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className="w-3 h-3" />
                  )}
                </a>
                
                {/* Dropdown placeholder - just for demo */}
                {link.hasDropdown && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={(e) => e.preventDefault()}>
                        Dropdown Item 1
                      </a>
                      <a href="#" className="block px-4 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50" onClick={(e) => e.preventDefault()}>
                        Dropdown Item 2
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={(e) => e.preventDefault()}
            >
              <User className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={(e) => e.preventDefault()}
            >
              <ShoppingCart className="w-5 h-5" />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-primary hover:text-primary/80 hover:bg-primary/10"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={cn(
          "lg:hidden transition-all duration-300 ease-in-out overflow-hidden",
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        )}>
          <nav className="py-4 border-t border-gray-200">
            <div className="space-y-2">
              {navigationLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block px-4 py-3 text-gray-600 hover:text-primary hover:bg-gray-50 transition-colors duration-200 text-sm font-medium uppercase tracking-wide"
                  onClick={(e) => e.preventDefault()}
                >
                  {link.label}
                </a>
              ))}
            </div>
            
            {/* Mobile Icons */}
            <div className="flex items-center justify-center space-x-4 mt-4 pt-4 border-t border-gray-200">
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary/80 hover:bg-primary/10"
                onClick={(e) => e.preventDefault()}
              >
                <User className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-primary hover:text-primary/80 hover:bg-primary/10"
                onClick={(e) => e.preventDefault()}
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
