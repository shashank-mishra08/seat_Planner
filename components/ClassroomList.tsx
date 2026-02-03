'use client';

import { usePlanner } from '@/context/PlannerContext';
import { Button } from '@/components/ui/button';
import { Trash2, Building2, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ClassroomList() {
    const { classrooms, deleteClassroom, clearClassrooms } = usePlanner();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-panel rounded-2xl p-6 h-full flex flex-col"
        >
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-pink-500/20 text-pink-400">
                        <Building2 className="h-5 w-5" />
                    </div>
                    <h2 className="text-xl font-semibold text-white">Classrooms</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="bg-white/10 text-white px-3 py-1 rounded-full text-xs font-medium">
                        {classrooms.length} Total
                    </span>
                    {classrooms.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={clearClassrooms}
                            className="h-7 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                            Clear All
                        </Button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-auto pr-2 -mr-2 space-y-3 custom-scrollbar">
                {classrooms.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-3">
                        <Building2 className="h-12 w-12 opacity-20" />
                        <p>No classrooms added yet</p>
                    </div>
                ) : (
                    <AnimatePresence>
                        {classrooms
                            .sort((a, b) => a.roomId.localeCompare(b.roomId))
                            .map((room) => (
                                <motion.div
                                    key={room.roomId}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="group relative flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-all hover:bg-white/10"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-white font-bold text-sm border border-white/5">
                                            {room.roomId.substring(0, 2)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-white text-lg">{room.roomId}</div>
                                            <div className="flex items-center gap-3 text-xs text-slate-400 mt-1">
                                                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Floor {room.floorNo}</span>
                                                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Cap: {room.capacity}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        {room.nearWashroom && (
                                            <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
                                                WC
                                            </div>
                                        )}
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                                            onClick={() => deleteClassroom(room.roomId)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                )}
            </div>
        </motion.div>
    );
}
