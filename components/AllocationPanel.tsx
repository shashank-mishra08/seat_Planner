'use client';

import { useState } from 'react';
import { usePlanner } from '@/context/PlannerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, CheckCircle2, AlertTriangle, Sparkles, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { AllocationResult } from '@/types';
import ClassroomLayout from './ClassroomLayout';

export default function AllocationPanel() {
    const { allocateExam, classrooms } = usePlanner();
    const [totalStudents, setTotalStudents] = useState('');
    const [result, setResult] = useState<AllocationResult[] | string | null>(null);

    const handleAllocate = () => {
        if (!totalStudents) return;
        const res = allocateExam(parseInt(totalStudents));
        setResult(res);
    };

    const totalCapacity = classrooms.reduce((acc, curr) => acc + curr.capacity, 0);

    return (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-panel rounded-2xl p-8"
            >
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
                        <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold text-white">Smart Allocation</h2>
                        <p className="text-sm text-slate-400">Total System Capacity: <span className="text-cyan-400 font-bold">{totalCapacity}</span></p>
                    </div>
                </div>

                <div className="flex gap-4 items-end">
                    <div className="flex-1 space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Students</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-3.5 h-5 w-5 text-slate-500" />
                            <Input
                                type="number"
                                placeholder="Enter count..."
                                value={totalStudents}
                                onChange={(e) => setTotalStudents(e.target.value)}
                                className="glass-input pl-10 h-12 text-lg"
                            />
                        </div>
                    </div>
                    <Button
                        onClick={handleAllocate}
                        className="h-12 px-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <LayoutDashboard className="mr-2 h-5 w-5" />
                        Allocate
                    </Button>
                </div>
            </motion.div>

            <AnimatePresence mode='wait'>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {typeof result === 'string' ? (
                            <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-200 flex items-center gap-3 shadow-lg">
                                <AlertTriangle className="h-6 w-6 text-red-500" />
                                <div className="font-medium text-lg">{result}</div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2">
                                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-lg">
                                        <CheckCircle2 className="h-6 w-6" />
                                        Allocation Successful
                                    </div>
                                    <div className="text-emerald-200/80 pl-8">
                                        Optimized distribution for <strong className="text-white">{totalStudents}</strong> students across <strong className="text-white">{result.length}</strong> room{result.length !== 1 && 's'}.
                                    </div>
                                </div>

                                <div className="grid gap-3">
                                    {result.map((item, idx) => (
                                        <div key={item.roomId} className="bg-white/5 border border-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="flex justify-between items-center p-5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center text-xl font-bold text-white border border-white/10">
                                                        {item.roomId.split('-')[1] || item.roomId.substring(0, 2)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-lg text-white">{item.roomId}</div>
                                                        <div className="text-sm text-slate-400">Floor <span className="text-cyan-400 font-mono">{item.floorNo}</span></div>
                                                    </div>
                                                </div>

                                                <div className="text-right">
                                                    <div className="flex items-end justify-end gap-1.5">
                                                        <span className="text-2xl font-bold text-white leading-none">{item.assignedStudents}</span>
                                                        <span className="text-sm text-slate-500 mb-0.5">/ {item.capacity}</span>
                                                    </div>

                                                    {/* Progress Bar */}
                                                    <div className="w-32 h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${(item.assignedStudents / item.capacity) * 100}%` }}
                                                            transition={{ duration: 1, delay: 0.5 + (idx * 0.1) }}
                                                            className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500"
                                                        />
                                                    </div>
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                transition={{ delay: 0.8 + (idx * 0.1) }}
                                                className="overflow-hidden border-t border-white/5 bg-black/20"
                                            >
                                                <ClassroomLayout
                                                    roomId={item.roomId}
                                                    capacity={item.capacity}
                                                    assigned={item.assignedStudents}
                                                />
                                            </motion.div>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
