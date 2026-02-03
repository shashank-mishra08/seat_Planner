export type Classroom = {
    roomId: string; // Unique ID
    capacity: number;
    floorNo: number;
    nearWashroom: boolean;
};

export type AllocationResult = {
    roomId: string;
    floorNo: number;
    capacity: number;
    assignedStudents: number;
};
