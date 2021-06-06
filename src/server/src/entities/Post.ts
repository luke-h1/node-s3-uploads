import { Field, Int } from 'type-graphql';
import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';

export class Post extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  pictureUrl: string;
}
