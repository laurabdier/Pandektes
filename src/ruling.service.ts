import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruling } from './ruling.entity';
import { FindOptionsOrder, FindOptionsWhere, In, Repository } from 'typeorm';
import { RulingsFilterInput } from './ruling.input';

@Injectable()
export class RulingService {
  constructor(
    @InjectRepository(Ruling)
    private rulingRepository: Repository<Ruling>,
  ) {}

  async getRulings(filter: RulingsFilterInput = {}): Promise<Ruling[]> {
    const { ids, publicationDates, providerIds, providerSources, sorting, limit, offset } = filter;
    const whereOptions: FindOptionsWhere<Ruling> = {};
    const orderOptions: FindOptionsOrder<Ruling> = {};

    if (ids && ids.length > 0) {
      whereOptions.id = In(ids);
    }
    if (publicationDates && publicationDates.length > 0) {
      whereOptions.publicationDate = In(publicationDates);
    }
    if (providerIds && providerIds.length > 0) {
      whereOptions.publicationDate = In(providerIds);
    }
    if (providerSources && providerSources.length > 0) {
      whereOptions.providerSource = In(providerSources);
    }

    if (sorting) {
      orderOptions.title = sorting;
    }

    return await this.rulingRepository.find({
      where: whereOptions,
      order: orderOptions,
      skip: offset,
      take: limit,
    });
  }

  async getMFKNRulingById(id: string) {
    return await this.rulingRepository.findBy({
      id,
    });
  }
}
