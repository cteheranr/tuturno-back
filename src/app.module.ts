import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PersonalModule } from './personal/personal.module';
import { TurnConfigModule } from './turn-config/turn-config.module';
import { WebsocketGateway } from './Websockets/websocket.gateway';
import { TurnModule } from './turn/turn.module';
import { ModuloModule } from './modulo/modulo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'app_turno',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }), UsersModule, LoginModule, PersonalModule, TurnConfigModule, TurnModule, ModuloModule],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
