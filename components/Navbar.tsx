'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, PlusCircle, List, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { name: 'Add Classroom', path: '/', icon: PlusCircle },
        { name: 'View List', path: '/view', icon: List },
        { name: 'Allocate', path: '/allocate', icon: UserCheck },
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white font-bold">SP</span>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                        SeatPlanner
                    </span>
                </div>

                <div className="flex items-center gap-1">
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;
                        const Icon = item.icon;

                        return (
                            <Link key={item.path} href={item.path}>
                                <div className={cn(
                                    "relative px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all duration-300",
                                    isActive ? "text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                                )}>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-bg"
                                            className="absolute inset-0 bg-white/10 rounded-lg border border-white/5"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <Icon className="w-4 h-4 relative z-10" />
                                    <span className="relative z-10">{item.name}</span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
