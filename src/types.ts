import { registerEnumType } from '@nestjs/graphql';

export enum SortDirection {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(SortDirection, {
  name: 'SortDirection',
});

export enum RulingSortKey {
  TITLE = 'title',
  PUBLISHED_AT = 'publishedAt',
}

registerEnumType(RulingSortKey, {
  name: 'RulingSortKey',
});
