import { registerEnumType } from '@nestjs/graphql';

export enum RulingSortKey {
  TITLE = 'title',
  PUBLISHED_AT = 'publishedAt',
}

registerEnumType(RulingSortKey, {
  name: 'RulingSortKey',
});
