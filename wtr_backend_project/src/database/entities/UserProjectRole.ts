import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { Project } from './Project';
import { Role } from './Role';

@Entity()
export class UserProjectRole {
  @PrimaryGeneratedColumn()
  UserProjectRoleID: number;

  @ManyToOne(() => User, user => user.userProjectRoles)
  @JoinColumn({ name: 'UserID' })
  user: User;

  @ManyToOne(() => Project, project => project.userProjectRoles)
  @JoinColumn({ name: 'ProjectID' })
  project: Project;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'RoleID' })
  role: Role;
}
