import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruling } from './ruling.entity';
import {
  Between,
  FindOptionsOrder,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { RulingsFilterInput } from './ruling.input';

@Injectable()
export class RulingService {
  constructor(
    @InjectRepository(Ruling)
    private rulingRepository: Repository<Ruling>,
  ) {}

  async getRulings(filter: RulingsFilterInput = {}): Promise<Ruling[]> {
    const { ids, titleSearch, publishedFrom, publishedTo, sortDirection, sortKey, limit, offset } =
      filter;
    const whereOptions: FindOptionsWhere<Ruling> = {};
    const orderOptions: FindOptionsOrder<Ruling> = {};

    if (ids && ids.length > 0) {
      whereOptions.id = In(ids);
    }
    if (publishedFrom && publishedTo) {
      whereOptions.publishedAt = Between(publishedFrom, publishedTo);
    } else if (publishedFrom) {
      whereOptions.publishedAt = MoreThanOrEqual(publishedFrom);
    } else if (publishedTo) {
      whereOptions.publishedAt = LessThanOrEqual(publishedTo);
    }

    if (titleSearch) {
      whereOptions.title = Like(`%${titleSearch}%`);
    }

    if (sortDirection && sortKey) {
      orderOptions[sortKey] = sortDirection;
    }

    return await this.rulingRepository.find({
      where: whereOptions,
      order: orderOptions,
      skip: offset,
      take: limit,
    });
  }

  async getRulingById(id: string) {
    return await this.rulingRepository.findOneBy({
      id,
    });
  }
}
