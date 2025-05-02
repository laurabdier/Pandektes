import { Module } from '@nestjs/common';
import { Ruling } from './ruling.entity';
import { RulingsResolver } from './ruling.resolver';
import { RulingService } from './ruling.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ruling])],
  providers: [RulingService, RulingsResolver],
})
export class RulingsModule {}
