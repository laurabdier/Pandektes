import { Entity, PrimaryGeneratedColumn, Column, Unique, ManyToMany, JoinTable } from 'typeorm';
import { Category } from 'src/category/category.entity';

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
