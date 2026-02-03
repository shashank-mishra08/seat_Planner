'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ClassroomLayoutProps {
    capacity: number;
    assigned: number;
    roomId: string;
}

export default function ClassroomLayout({ capacity, assigned, roomId }: ClassroomLayoutProps) {
    // Determine grid columns: 
    // We want a roughly rectangular room. 
    // If capacity is small (<20), maybe 4-5 cols. If large, 8-10 cols.
    const cols = capacity <= 20 ? 4 : capacity <= 50 ? 6 : 10;

    const seats = Array.from({ length: capacity }, (_, i) => ({
        id: i + 1,
        isOccupied: i < assigned
    }));

    return (
        <div className="mt-4 p-6 rounded-xl bg-slate-900/50 border border-white/10 flex flex-col items-center">

            {/* Blackboard / Screen Area */}
            <div className="w-2/3 h-2 bg-slate-700 rounded-full mb-8 relative shadow-[0_10px_20px_-5px_rgba(255,255,255,0.1)]">
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                    Blackboard / Front
                </div>
            </div>

            <div
                className="grid gap-x-3 gap-y-3 mx-auto"
                style={{
                    gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
                }}
            >
                {seats.map((seat) => (
                    <motion.div
                        key={seat.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 25,
                            delay: 0.01 * seat.id
                        }}
                        className="group relative flex flex-col items-center"
                    >
                        <div
                            className={cn(
                                "h-8 w-8 rounded-t-lg rounded-b-md border-b-2 transition-all flex items-center justify-center text-[10px] font-bold shadow-md cursor-pointer relative overflow-hidden",
                                seat.isOccupied
                                    ? "bg-cyan-500 border-cyan-700 text-black shadow-cyan-500/20"
                                    : "bg-white/5 border-white/20 text-slate-500 hover:bg-white/10 hover:border-white/40"
                            )}
                            title={seat.isOccupied ? `Assigned to Student #${seat.id}` : "Available"}
                        >
                            {/* Armrests visual trick */}
                            <div className="absolute bottom-0 left-0 w-1 h-3 bg-black/10"></div>
                            <div className="absolute bottom-0 right-0 w-1 h-3 bg-black/10"></div>

                            {seat.id}
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 pt-4 border-t border-white/5 w-full">
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-cyan-500 border-b-2 border-cyan-700"></div>
                    <span className="text-xs text-slate-400">Occupied</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded bg-white/5 state-empty border border-white/20"></div>
                    <span className="text-xs text-slate-400">Available</span>
                </div>
            </div>
        </div>
    );
}
