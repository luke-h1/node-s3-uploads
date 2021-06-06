import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  pictureUrl: string;
}
