// src/rulings/rulings.resolver.ts
import { Resolver, Query } from '@nestjs/graphql';
import { Ruling } from './ruling.model';
import { RulingService } from './ruling.service';

@Resolver(() => Ruling)
export class RulingsResolver {
  constructor(private rulingService: RulingService) {}

  @Query(() => [Ruling])
  async rulings() {
    return await this.rulingService.findAll();
  }
}
