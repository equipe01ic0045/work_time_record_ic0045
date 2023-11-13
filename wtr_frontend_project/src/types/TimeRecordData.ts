// export type Justification = {
//   description?: string;
//   document?: File|null;
//   date?: Date;
// };

// export type JustificationData = Justification & {
//   date: Date;
//   projectId: number;
//   timeRecordId: number;
// }

// type TimeRecordData = Justification & {
//   date: Date;
//   projectId: number;
//   location?: string;
// };

// export default TimeRecordData;



// export type SimpleCheckInData = TimeRecordData & {
//   location?: string;
//   check_in_timestamp: Date;
// };

// export type SimpleCheckOutData = TimeRecordData & {
//   check_out_timestamp: Date;
// };

export type SimpleTimeRecordData = {
  timestamp: Date;
  location?: string;
};

export type JustificationData = {
  user_message: string;
  justification_file?: File;
};

export type DetailedTimeRecordData = SimpleTimeRecordData & JustificationData;

