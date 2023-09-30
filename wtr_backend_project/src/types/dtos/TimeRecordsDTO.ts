export interface TimeRecordsCheckinRequestDTO {
    userId: number,
    projectId: number,
    checkInTimestamp: Date,
    userMessage?: string,
    location?: string
}


export interface CheckoutTimeRecordDTO {
    userId: number,
    projectId: number,
    checkOutTimestamp: Date
}