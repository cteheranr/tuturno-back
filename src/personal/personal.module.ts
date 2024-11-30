import { Module } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { PersonalController } from './personal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Personal]), UsersModule],
  controllers: [PersonalController],
  providers: [PersonalService],
  exports: [PersonalService]
})
export class PersonalModule {}
