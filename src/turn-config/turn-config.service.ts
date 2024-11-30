import { HttpException, Injectable } from '@nestjs/common';
import { CreateTurnConfigDto } from './dto/create-turn-config.dto';
import { UpdateTurnConfigDto } from './dto/update-turn-config.dto';
import { TurnConfig } from './entities/turn-config.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TurnConfigService {

  constructor(
    @InjectRepository(TurnConfig)
    private TurnRepository: Repository<TurnConfig>,
  ) {}

  async create(createTurnConfigDto: CreateTurnConfigDto) {
    const turnConfig = await this.TurnRepository.findOne({ where : { chart : createTurnConfigDto.chart }});
    if(turnConfig){
      throw new HttpException('Error al crear el tipo de turno. Detalles: ' + 'El Chart no puede ser igual que uno existente', 400);
    }
    const newTurnConfig = this.TurnRepository.create(createTurnConfigDto);
    const createTurnConfig = await this.TurnRepository.save(newTurnConfig);
    return createTurnConfig;
  }

  async findAll() {
    return await this.TurnRepository.find();
  }

  async findOne(id: number) {
    return await this.TurnRepository.findOne({ where : { id }});
  }

  async update(id: number, updateYearDto: UpdateTurnConfigDto) {
      const turnConfig = await this.TurnRepository.findOne({ where : { chart : updateYearDto.chart }});
      if(turnConfig && turnConfig.id !== id){
        throw new HttpException('Error al actualizar el tipo de Turno. Detalles: ' + 'El chart no puede ser igual que uno existente', 400);
      }
      return this.TurnRepository.update({ id }, updateYearDto);
  }

  remove(id: number) {
    return this.TurnRepository.delete(+id);
  }
}
