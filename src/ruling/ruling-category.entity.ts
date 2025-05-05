import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Ruling } from '../ruling/ruling.entity';
import { Category } from '../category/category.entity';

@Entity('ruling_category')
export class RulingCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Ruling, (ruling) => ruling.categories)
  @JoinColumn({ name: 'ruling_id' })
  ruling: Ruling;

  @ManyToOne(() => Category, (category) => category.rulings)
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
