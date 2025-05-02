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
  publicationDate: string;

  @Field()
  providerId: string;

  @Field()
  providerSource: string;
}
