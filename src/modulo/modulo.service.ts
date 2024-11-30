import { HttpException, Injectable } from '@nestjs/common';
import { CreateModuloDto } from './dto/create-modulo.dto';
import { UpdateModuloDto } from './dto/update-modulo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Modulo } from './entities/modulo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ModuloService {
  constructor(@InjectRepository(Modulo)
  private ModuloRepository: Repository<Modulo>,){
    
  }

  async create(createModuloDto: CreateModuloDto) {

    const modulo = await this.ModuloRepository.findOne({ where : { name : createModuloDto.name }});
    if(modulo){
      throw new HttpException('Error al crear el Modulo. Detalles: ' + 'El Nombre del modulo no puede ser igual que uno existente', 400);
    }
    const newModulo = this.ModuloRepository.create(createModuloDto);
    const createModulo = await this.ModuloRepository.save(newModulo);
    return createModulo;
  }

  async findAll() {
    return await this.ModuloRepository.find();
  }

  async findOne(id: number) {
    return await this.ModuloRepository.findOne({ where : { id }});
  }

  async update(id: number, updateModuloDto: UpdateModuloDto) {
    await this.ModuloRepository.update({ id }, updateModuloDto);
    const updateStaff = await this.findOne(id);
    return { data: updateStaff, message: 'Turno actualizado exitosamente.' };
  }

}
