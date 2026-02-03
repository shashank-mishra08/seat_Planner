'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ClassroomLayoutProps {
    capacity: number;
    assigned: number;
    roomId: string;
}

export default function ClassroomLayout({ capacity, assigned, roomId }: ClassroomLayoutProps) {
    // Determine grid columns based on capacity to keep aspect ratio somewhat balanced
    // Simple heuristic: sqrt of capacity, but clamped
    const cols = Math.ceil(Math.sqrt(capacity));

    // Create array of seats
    const seats = Array.from({ length: capacity }, (_, i) => ({
        id: i + 1,
        isOccupied: i < assigned
    }));

    return (
        <div className="mt-4 p-4 rounded-xl bg-black/20 border border-white/5">
            <div className="text-xs font-medium text-slate-400 mb-3 uppercase tracking-wider text-center">
                Room Layout ({roomId})
            </div>

            <div
                className="grid gap-1.5 mx-auto justify-center"
                style={{
                    gridTemplateColumns: `repeat(auto-fit, minmax(20px, 1fr))`,
                    maxWidth: '100%'
                }}
            >
                <div className="flex flex-wrap gap-1.5 justify-center">
                    {seats.map((seat) => (
                        <motion.div
                            key={seat.id}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: 0.02 * seat.id
                            }}
                            className={cn(
                                "h-6 w-6 rounded-md flex items-center justify-center text-[8px] font-bold transition-colors select-none",
                                seat.isOccupied
                                    ? "bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.4)]"
                                    : "bg-white/5 text-slate-600 border border-white/5"
                            )}
                            title={seat.isOccupied ? `Student ${seat.id}` : "Empty"}
                        >
                            {seat.id}
                        </motion.div>
                    ))}
                </div>
            </div>

            <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-500">
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-cyan-500"></div>
                    <span>Occupied</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded bg-white/10 border border-white/5"></div>
                    <span>Available</span>
                </div>
            </div>
        </div>
    );
}
