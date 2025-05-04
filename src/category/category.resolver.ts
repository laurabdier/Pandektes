import { Query, Resolver } from '@nestjs/graphql';
import { Category } from './category.model';
import { CategoryService } from './category.service';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private categoryService: CategoryService) {}

  @Query(() => [Category])
  async categories(): Promise<Category[]> {
    return await this.categoryService.getCategories();
  }
}
