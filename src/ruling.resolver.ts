import { Resolver, Query, Args } from '@nestjs/graphql';
import { Ruling } from './ruling.model';
import { RulingService } from './ruling.service';
import { RulingsFilterInput } from './ruling.input';

@Resolver(() => Ruling)
export class RulingsResolver {
  constructor(private rulingService: RulingService) {}

  @Query(() => [Ruling])
  async rulings(
    @Args('filter', { type: () => RulingsFilterInput, nullable: true })
    filter?: RulingsFilterInput,
  ): Promise<Ruling[]> {
    return await this.rulingService.getRulings(filter);
  }
}
