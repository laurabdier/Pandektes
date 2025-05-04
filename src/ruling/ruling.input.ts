import { InputType, Field, Int } from '@nestjs/graphql';
import { SortDirection } from '../types';
import { RulingSortKey } from './ruling.types';

@InputType()
export class RulingsFilterInput {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => String, { nullable: true })
  titleSearch?: string;

  @Field(() => String, { nullable: true })
  publishedFrom?: Date;

  @Field(() => String, { nullable: true })
  publishedTo?: Date;

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => RulingSortKey, { nullable: true, defaultValue: RulingSortKey.PUBLISHED_AT })
  sortKey?: RulingSortKey;

  @Field(() => SortDirection, { nullable: true, defaultValue: SortDirection.ASC })
  sortDirection?: SortDirection;
}
