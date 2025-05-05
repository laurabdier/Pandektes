import { Module } from '@nestjs/common';
import { Ruling } from './ruling.entity';
import { RulingsResolver } from './ruling.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RulingService } from './ruling.service';
import { RulingCategory } from './ruling-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruling, RulingCategory])],
  providers: [RulingService, RulingsResolver],
})
export class RulingsModule {}
