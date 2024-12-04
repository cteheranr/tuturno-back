import { Module } from '@nestjs/common';
import { LoginModule } from './login/login.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PersonalModule } from './personal/personal.module';
import { TurnConfigModule } from './turn-config/turn-config.module';
import { WebsocketGateway } from './Websockets/websocket.gateway';
import { TurnModule } from './turn/turn.module';
import { ModuloModule } from './modulo/modulo.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', // Ruta del archivo .env (opcional si es .env)
      isGlobal: true,      // Hace el módulo de configuración disponible globalmente
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UsersModule,
    LoginModule,
    PersonalModule,
    TurnConfigModule,
    TurnModule,
    ModuloModule,
  ],
  controllers: [],
  providers: [WebsocketGateway],
})
export class AppModule {}
