'use client';

import ClassroomList from '@/components/ClassroomList';
import { motion } from 'framer-motion';

export default function ViewPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 px-6">
            <div className="max-w-4xl mx-auto h-[80vh]">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl font-bold text-white mb-2">Classroom Directory</h1>
                    <p className="text-slate-400">Manage and view all registered classrooms.</p>
                </motion.div>

                <ClassroomList />
            </div>
        </div>
    );
}
