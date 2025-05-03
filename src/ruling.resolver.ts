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

  @Query(() => Ruling, { nullable: true })
  async ruling(
    @Args('id', { type: () => String })
    id: string,
  ): Promise<Ruling | null> {
    return await this.rulingService.getRulingById(id);
  }
}
