"use client";

import Link from "next/link";
import { Linkedin } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar() {
    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass border-b-0"
        >
            <Link href="/" className="text-xl font-bold tracking-tighter text-gradient">
                Jamal Uddin
            </Link>

            <div className="hidden md:flex items-center space-x-8">
                {[
                    { name: "About", href: "#about" },
                    { name: "Research", href: "#research" },
                    { name: "Projects", href: "#projects" },
                    { name: "Contact", href: "#contact" },
                ].map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-2 py-1"
                    >
                        {link.name}
                        <motion.span
                            className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    </Link>
                ))}
            </div>

            <div className="flex items-center space-x-4">
                <Link href="https://github.com/jamal-uddin5823" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <img src="https://cdn.simpleicons.org/github/white" alt="GitHub" className="w-5 h-5 hover:opacity-80 transition-opacity" />
                </Link>
                <Link href="https://www.linkedin.com/in/jamal-uddin-mallick-791221282/" target="_blank" className="text-muted-foreground hover:text-foreground transition-colors">
                    <Linkedin className="w-5 h-5" />
                </Link>
            </div>
        </motion.nav>
    );
}
