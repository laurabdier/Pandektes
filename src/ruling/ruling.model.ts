import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from 'src/category/category.model';

@ObjectType()
export class Ruling {
  @Field(() => String)
  id: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  publishedAt: Date;

  @Field()
  providerId: string;

  @Field()
  providerSource: string;

  @Field(() => [Category])
  categories: Category[];
}
