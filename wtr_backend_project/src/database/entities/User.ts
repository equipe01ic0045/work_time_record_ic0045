import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserProjectRole } from './UserProjectRole';
import { Attendance } from './Attendance';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  UserID: number;

  @Column()
  Username: string;

  @Column()
  Password: string;

  // Other user-related attributes

  @OneToMany(() => UserProjectRole, upr => upr.user)
  userProjectRoles: UserProjectRole[];

  @OneToMany(() => Attendance, attendance => attendance.user)
  attendances: Attendance[];
}
