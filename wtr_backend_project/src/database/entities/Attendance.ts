import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  AttendanceID: number;

  @ManyToOne(() => User, user => user.attendances)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Project, project => project.attendances)
  @JoinColumn({ name: 'ProjectID' })
  project: Project;

  @Column({ type: 'timestamp', nullable: true })
  CheckInTimestamp: Date;

  @Column({ type: 'timestamp', nullable: true })
  CheckOutTimestamp: Date;

  @Column({ type: 'text', nullable: true })
  JustificationText: string;

  @Column({ nullable: true })
  JustificationDocuments: string;

  @Column({ nullable: true })
  Location: string;

  // Other attendance-related attributes
}
