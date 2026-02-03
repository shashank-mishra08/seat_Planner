'use client';

import { useState } from 'react';
import { usePlanner } from '@/context/PlannerContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';
import { Plus, Layers, Users, Building, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ClassroomForm() {
    const { addClassroom } = usePlanner();
    const [formData, setFormData] = useState({
        roomId: '',
        capacity: '',
        floorNo: '',
        nearWashroom: false
    });
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!formData.roomId || !formData.capacity || !formData.floorNo) {
            setError('All fields are required');
            return;
        }

        try {
            addClassroom({
                roomId: formData.roomId,
                capacity: parseInt(formData.capacity),
                floorNo: parseInt(formData.floorNo),
                nearWashroom: formData.nearWashroom
            });
            setFormData({ roomId: '', capacity: '', floorNo: '', nearWashroom: false });
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-panel rounded-2xl p-6"
        >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/20 text-indigo-400">
                    <Plus className="h-5 w-5" />
                </div>
                <h2 className="text-xl font-semibold text-white">Add Classroom</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                    <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Room ID</label>
                    <div className="relative">
                        <Building className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                        <Input
                            placeholder="e.g. A-101"
                            value={formData.roomId}
                            onChange={(e) => setFormData({ ...formData, roomId: e.target.value })}
                            className="glass-input pl-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Capacity</label>
                        <div className="relative">
                            <Users className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                type="number"
                                placeholder="50"
                                value={formData.capacity}
                                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                                className="glass-input pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Floor</label>
                        <div className="relative">
                            <Layers className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                            <Input
                                type="number"
                                placeholder="1"
                                value={formData.floorNo}
                                onChange={(e) => setFormData({ ...formData, floorNo: e.target.value })}
                                className="glass-input pl-10"
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border border-white/5 cursor-pointer transition-all",
                        formData.nearWashroom ? "bg-emerald-500/20 border-emerald-500/30" : "bg-white/5 hover:bg-white/10"
                    )}
                    onClick={() => setFormData({ ...formData, nearWashroom: !formData.nearWashroom })}
                >
                    <div className={cn(
                        "h-5 w-5 rounded-full border-2 flex items-center justify-center transition-colors",
                        formData.nearWashroom ? "border-emerald-500 bg-emerald-500" : "border-slate-500"
                    )}>
                        {formData.nearWashroom && <Check className="h-3 w-3 text-white" />}
                    </div>
                    <span className={cn("text-sm font-medium", formData.nearWashroom ? "text-emerald-200" : "text-slate-400")}>
                        Near Washroom
                    </span>
                </div>

                {error && <p className="text-sm text-red-400 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}

                <Button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 py-6 text-base shadow-lg shadow-indigo-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]">
                    Add Classroom
                </Button>
            </form>
        </motion.div>
    );
}
