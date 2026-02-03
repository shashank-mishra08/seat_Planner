'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AllocationResult, Classroom } from '@/types';

interface PlannerContextType {
    classrooms: Classroom[];
    addClassroom: (classroom: Classroom) => void;
    deleteClassroom: (roomId: string) => void;
    clearClassrooms: () => void;
    allocateExam: (totalStudents: number) => AllocationResult[] | string;
}

const PlannerContext = createContext<PlannerContextType | undefined>(undefined);

export function PlannerProvider({ children }: { children: React.ReactNode }) {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);

    // Load from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('seat-planner-classrooms');
        if (saved) {
            try {
                setClassrooms(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse classrooms', e);
            }
        }
    }, []);

    // Save to LocalStorage whenever classrooms change
    useEffect(() => {
        localStorage.setItem('seat-planner-classrooms', JSON.stringify(classrooms));
    }, [classrooms]);

    const addClassroom = (classroom: Classroom) => {
        if (classrooms.some((c) => c.roomId === classroom.roomId)) {
            throw new Error('Room ID already exists');
        }
        setClassrooms((prev) => [...prev, classroom]);
    };

    const deleteClassroom = (roomId: string) => {
        setClassrooms((prev) => prev.filter((c) => c.roomId !== roomId));
    };

    const clearClassrooms = () => {
        setClassrooms([]);
        localStorage.removeItem('seat-planner-classrooms');
    };

    const allocateExam = (totalStudents: number): AllocationResult[] | string => {
        if (totalStudents <= 0) return "Invalid student count";
        if (classrooms.length === 0) return "No classrooms added. Please add classrooms first.";

        // Sort: Lower floors first, then larger capacity
        // To ensure "Minimum number of rooms" while preferring lower floors:
        // This is tricky. 
        // If we want STRICTLY minimum rooms, we should just sort by Capacity DESC.
        // If we want STRICTLY lower floors, we sort by Floor ASC.
        // The requirement says: 
        // "a. Allocate the minimum number of classrooms"
        // "b. Prefer lower floor classrooms first"
        // This usually means Multi-objective optimization.
        // My interpretation: Prioritize Floor. Within same floor, prioritize Capacity (to minimize rooms ON THAT FLOOR).
        // If we run out of space on Floor 1, go to Floor 2.
        // This satisfies "Prefer lower floor".
        // And within Floor 1, using largest rooms first satisfies "min rooms" locally.

        // Let's refine: Ideally, we want the global minimum rooms, but constrained by floor preference.
        // If I have Floor 1 (Cap 10) and Floor 5 (Cap 100) and I need 100 seats.
        // "Prefer lower floor" -> Use Floor 1 (10) first. Then Floor 5 (90). Total 2 rooms.
        // "Min rooms" -> Use Floor 5 (100). Total 1 room.
        // "Prefer lower floor classrooms FIRST" suggests a greedy approach by floor.
        // So I will sort by Floor ASC, then Capacity DESC.

        const sortedRooms = [...classrooms].sort((a, b) => {
            if (a.floorNo !== b.floorNo) return a.floorNo - b.floorNo; // Lower floor first
            return b.capacity - a.capacity; // Larger capacity first
        });

        let remainingStudents = totalStudents;
        const allocation: AllocationResult[] = [];

        for (const room of sortedRooms) {
            if (remainingStudents <= 0) break;

            const assigned = Math.min(room.capacity, remainingStudents);
            allocation.push({
                roomId: room.roomId,
                floorNo: room.floorNo,
                capacity: room.capacity,
                assignedStudents: assigned,
            });
            remainingStudents -= assigned;
        }

        if (remainingStudents > 0) {
            return `Not enough seats available. Unassigned students: ${remainingStudents}`;
        }

        return allocation;
    };

    return (
        <PlannerContext.Provider value={{ classrooms, addClassroom, deleteClassroom, clearClassrooms, allocateExam }}>
            {children}
        </PlannerContext.Provider>
    );
}

export function usePlanner() {
    const context = useContext(PlannerContext);
    if (context === undefined) {
        throw new Error('usePlanner must be used within a PlannerProvider');
    }
    return context;
}
