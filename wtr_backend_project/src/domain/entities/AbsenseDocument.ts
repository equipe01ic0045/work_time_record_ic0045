import { TimeRecord } from "./TimeRecord";

export class AbsenseDocument {
    absense_document_id: number;
    time_record_id: number;
    document_file: Buffer;
    time_record: TimeRecord
}