import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ruling {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  publicationDate: string;

  @Column()
  providerId: string;

  @Column()
  providerSource: string;
}
