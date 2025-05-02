// src/rulings/ruling.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruling } from './ruling.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RulingService {
  constructor(
    @InjectRepository(Ruling)
    private rulingRepository: Repository<Ruling>,
  ) {}

  async findAll(): Promise<Ruling[]> {
    return this.rulingRepository.find();
  }
}
