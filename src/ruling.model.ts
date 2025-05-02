// src/rulings/ruling.model.ts
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Ruling {
  @Field(() => String)
  id: string;

  @Field()
  title: string;
}
