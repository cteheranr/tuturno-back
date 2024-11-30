import { Module } from '@nestjs/common';
import { TurnConfigService } from './turn-config.service';
import { TurnConfigController } from './turn-config.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TurnConfig } from './entities/turn-config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TurnConfig])],
  controllers: [TurnConfigController],
  providers: [TurnConfigService],
})
export class TurnConfigModule {}
