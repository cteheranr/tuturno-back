import { Inject, Injectable } from '@nestjs/common';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';
import { Repository } from 'typeorm';
import { Turn } from './entities/turn.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalService } from 'src/personal/personal.service';
import { StatusTurn } from 'src/shared/enums/status-turn.enum';

@Injectable()
export class TurnService {
  constructor(
    @InjectRepository(Turn)
    private turnoRepository: Repository<Turn>,
    @Inject()
    private readonly userService: PersonalService,
  ) {}

  async create(createTurnDto: CreateTurnDto) {
    const { cliente, id_usuario, estado_turno, tipo_turno } = createTurnDto;
    let numero_turno = 0;

    const usuario = await this.userService.findOne(id_usuario);
    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const ultimoTurno = await this.obtenerUltimoRegistro(tipo_turno);

    if(ultimoTurno.length){
      numero_turno = ultimoTurno[0].numero_turno+1
    }else{
      numero_turno = 1;
    }

    const newTurn = this.turnoRepository.create({
      cliente,
      id_usuario,
      estado_turno,
      tipo_turno,
      numero_turno,
      fecha_creacion : new Date()    
    });
    return this.turnoRepository.save(newTurn);
  }

  findAll() {
    return this.turnoRepository.find();
  }

  async findOne(id: number) {
    return await this.turnoRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTurnDto: UpdateTurnDto) {
    await this.turnoRepository.update({ id }, updateTurnDto);
    const updateStaff = await this.findOne(id);
    return { data: updateStaff, message: 'Turno actualizado exitosamente.' };
  }

  async obtenerUltimoRegistro(tipo_turno: string) {
    return await this.turnoRepository.find({
      order: {
        id: 'DESC',
      },
      where: {tipo_turno},
      take: 1,
    });
  }

  async obtenerTurnosEnProceso() {
    return await this.turnoRepository.find({
      where: [
        { estado_turno: StatusTurn.EN_PROCESO },
      ],
    });
  }

}
