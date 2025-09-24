'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

export function Footer() {
    const [fabClicked, setFabClicked] = useState(false)

    const handleFabClick = () => {
        setFabClicked(true)
        // Demo response - you can replace this with actual functionality
        setTimeout(() => setFabClicked(false), 2000)
    }

    return (
        <>
            <footer className="bg-black text-white relative">
                <div className="container mx-auto px-4 py-8">
                    {/* Logo */}
                    <div className="flex justify-center mb-6">
                        <Image
                            src="/logo-invert.png"
                            alt="HYPE Logo"
                            width={150}
                            height={50}
                            className="h-12 w-auto"
                            priority
                        />
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-white mb-6"></div>

                    {/* Navigation Links */}
                    <nav className="flex justify-center mb-6">
                        <div className="flex flex-wrap justify-center gap-6 text-sm">
                            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                Home
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                Categories
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                About Us
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                My Account
                            </a>
                            <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                Tracking Order
                            </a>
                        </div>
                    </nav>

                    {/* Divider */}
                    <div className="w-full h-px bg-white mb-6"></div>

                    {/* Bottom Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        {/* Copyright */}
                        <div className="text-sm">
                            Copyright © 2025 <span className="text-primary">HYPE</span>. All Rights Reserved.
                        </div>

                        {/* Legal Links and Social Icons */}
                        <div className="flex items-center gap-4">
                            {/* Legal Links */}
                            <div className="flex items-center gap-4 text-sm">
                                <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                    Terms and Conditions
                                </a>
                                <div className="w-px h-4 bg-white"></div>
                                <a href="#" className="hover:text-primary transition-colors" onClick={(e) => e.preventDefault()}>
                                    Privacy Policy
                                </a>
                            </div>

                            {/* Social Media Icons */}
                            <div className="flex items-center gap-3 ml-4">
                                {/* Instagram */}
                                <a
                                    href="#"
                                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                    </svg>
                                </a>

                                {/* X (Twitter) */}
                                <a
                                    href="#"
                                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                    </svg>
                                </a>

                                {/* Facebook */}
                                <a
                                    href="#"
                                    className="w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition-colors"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Action Button (FAB) */}
            <Button
                onClick={handleFabClick}
                className={cn(
                    "fixed bottom-6 right-6 w-[60px] h-[60px] p-1 rounded-full bg-gradient-to-r from-[#f5c26b] to-[#ff9980] hover:from-orange-500 shadow-lg z-50 transition-all duration-300",
                    fabClicked && "scale-110 shadow-xl"
                )}
                style={{
                    backgroundImage: 'linear-gradient(92.06deg, rgb(245, 194, 107) 23.41%, rgb(255, 153, 128) 100%);'
                }}
                size="icon"
            >
                <svg width="32" height="30" className='!size-auto' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#33475b">
                    <g clip-path="url(#messages__clip0_14307_15730)">
                        <path fill-opacity="0.01" d="M0 0h24v24H0z"></path>
                        <mask id="messages__b" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24" style={{ maskType: 'alpha' }}>
                            <g clip-path="url(#messages__clip1_14307_15730)">
                                <g clip-path="url(#messages__clip2_14307_15730)">
                                    <mask id="messages__a" maskUnits="userSpaceOnUse" x="1" y="0" width="23" height="23" style={{
                                        maskType: 'alpha'
                                    }}>
                                        <path d="M2.571 22.286h-.008.008z"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.143 4.286c1.414 0 2.571 1.157 2.571 2.571v8.572c0 1.414-1.157 2.571-2.571 2.571H7.209l-4.037 4.037c-.162.162-.384.247-.606.248-.11 0-.219-.017-.32-.068-.317-.128-.532-.445-.532-.788V6.857c0-1.414 1.157-2.571 2.572-2.571h12.857zM4.286 6c-.472 0-.857.386-.857.857v12.506l2.82-2.82c.162-.163.377-.249.608-.249h10.286c.471 0 .857-.385.857-.857V6.866c0-.472-.386-.857-.857-.857H4.286V6z"></path>
                                        <path d="M20.571.857c1.415 0 2.572 1.158 2.572 2.572V12c0 .472-.386.857-.857.857-.472 0-.857-.385-.857-.857V3.43c0-.472-.386-.857-.858-.857H7.714c-.471 0-.857-.386-.857-.857 0-.472.386-.858.857-.858h12.857z"></path>
                                    </mask>
                                    <g mask="url(#messages__a)">
                                        <path d="M-1.714-1.714h27.429v27.429H-1.714z"></path>
                                    </g>
                                </g>
                            </g>
                        </mask>
                        <g mask="url(#messages__b)">
                            <path d="M0 0h24v24H0V0z"></path>
                        </g>
                    </g>
                </svg>
            </Button>

            {/* Demo Response Toast */}
            {fabClicked && (
                <div className="fixed bottom-24 right-6 bg-white text-black px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 duration-300">
                    <p className="text-sm font-medium">This is just a demo button.</p>
                </div>
            )}
        </>
    )
}
