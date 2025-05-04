import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Category {
  @Field(() => String)
  id: string;

  @Field()
  name: string;
}
