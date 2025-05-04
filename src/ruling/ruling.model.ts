import { ObjectType, Field } from '@nestjs/graphql';

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
}
