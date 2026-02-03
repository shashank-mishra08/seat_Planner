'use client';

import ClassroomForm from "@/components/ClassroomForm";
import ClassroomList from "@/components/ClassroomList";
import AllocationPanel from "@/components/AllocationPanel";
import { GraduationCap, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass-panel border-x-0 border-t-0 sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-indigo-600 rounded-xl shadow-lg shadow-indigo-500/20">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Exam<span className="text-indigo-400">Planner</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            {/* Placeholder for future nav items or user profile */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-500"></div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8">

        {/* Left Column: Management (4 cols) */}
        <div className="lg:col-span-4 space-y-8">
          <section>
            <ClassroomForm />
          </section>

          <section className="h-[600px]">
            <ClassroomList />
          </section>
        </div>

        {/* Right Column: Allocation (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          <section>
            <AllocationPanel />
          </section>

          {/* Instructions / Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="p-8 rounded-2xl border border-white/5 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 text-slate-400 text-sm"
          >
            <h3 className="font-semibold text-white mb-4 text-base">Allocation Intelligence</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-indigo-400 font-bold text-xs uppercase tracking-wider">Priority 1</div>
                <p className="leading-relaxed">Minimizes student travel by filling <strong>Lower Floors</strong> first.</p>
              </div>
              <div className="space-y-2">
                <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">Priority 2</div>
                <p className="leading-relaxed">Optimizes invigilation by using <strong>Largest Capacity</strong> rooms on those floors.</p>
              </div>
            </div>
          </motion.div>
        </div>

      </main>
    </div>
  );
}
