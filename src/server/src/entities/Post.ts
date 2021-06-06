import { Field, Int } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name: string;

  @Column()
  pictureUrl: string;
}
