import { ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@ObjectType()
@Entity()
@Unique(['providerId', 'providerSource'])
export class Ruling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ type: 'timestamptz' })
  publishedAt: Date;

  @Column()
  providerId: string;

  @Column()
  providerSource: string;
}
