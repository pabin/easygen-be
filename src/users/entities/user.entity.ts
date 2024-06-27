import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ObjectIdColumn()
  id: ObjectId;

  @Column('varchar', { length: 64 }) firstName: string;
  @Column('varchar', { length: 64 }) lastName: string;

  @Column('varchar', { length: 64, unique: true }) email: string;
  @Column('varchar', { length: 132, select: false }) password: string;

  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
