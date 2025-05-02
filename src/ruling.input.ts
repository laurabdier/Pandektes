import { InputType, Field, Int } from '@nestjs/graphql';
import { SortDirection } from './types';

@InputType()
export class RulingsFilterInput {
  @Field(() => [String], { nullable: true })
  ids?: string[];

  @Field(() => [[String]], { nullable: true })
  publicationDates?: string[];

  @Field(() => [String], { nullable: true })
  providerIds?: string[];

  @Field(() => [String], { nullable: true })
  providerSources?: string[];

  @Field(() => Int, { nullable: true })
  limit?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;

  @Field(() => SortDirection, { nullable: true })
  sorting?: SortDirection;
}
