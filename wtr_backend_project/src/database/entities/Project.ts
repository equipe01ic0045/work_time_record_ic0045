import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserProjectRole } from './UserProjectRole';
import { Attendance } from './Attendance';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  ProjectID: number;

  @Column()
  ProjectName: string;

  // Other project-related attributes

  @OneToMany(() => UserProjectRole, upr => upr.project)
  userProjectRoles: UserProjectRole[];

  @OneToMany(() => Attendance, attendance => attendance.project)
  attendances: Attendance[];
}
