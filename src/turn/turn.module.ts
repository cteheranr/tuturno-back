import { Module } from '@nestjs/common';
import { TurnService } from './turn.service';
import { TurnController } from './turn.controller';
import { WebsocketGateway } from 'src/Websockets/websocket.gateway';
import { PersonalModule } from 'src/personal/personal.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Turn } from './entities/turn.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Turn]), PersonalModule],
  controllers: [TurnController],
  providers: [TurnService, WebsocketGateway],
})
export class TurnModule {}
