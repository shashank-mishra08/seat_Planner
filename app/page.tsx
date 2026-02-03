'use client';

import ClassroomForm from '@/components/ClassroomForm';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Add New Classroom</h1>
          <p className="text-slate-400">Register a new room with its capacity and details.</p>
        </motion.div>

        <ClassroomForm />
      </div>
    </div>
  );
}
