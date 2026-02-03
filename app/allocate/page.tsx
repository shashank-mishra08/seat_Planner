'use client';

import AllocationPanel from '@/components/AllocationPanel';
import { motion } from 'framer-motion';

export default function AllocatePage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Exam Allocation</h1>
                    <p className="text-slate-400">Smartly distribute students across available classrooms.</p>
                </motion.div>

                <AllocationPanel />
            </div>
        </div>
    );
}
