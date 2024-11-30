import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TurnService } from './turn.service';
import { CreateTurnDto } from './dto/create-turn.dto';
import { UpdateTurnDto } from './dto/update-turn.dto';
import { WebsocketGateway } from 'src/Websockets/websocket.gateway';
import { ApiTags } from '@nestjs/swagger';
import { StatusTurn } from 'src/shared/enums/status-turn.enum';

@Controller('turn')
@ApiTags('Turn')
export class TurnController {
  constructor(
    private readonly turnService: TurnService,
    private readonly turnoGateway: WebsocketGateway,
  ) {}

  @Post()
  async create(@Body() createTurnDto: CreateTurnDto) {
    const nuevoTurno = await this.turnService.create(createTurnDto);
    this.turnoGateway.server.emit('turnoActualizado', nuevoTurno);
    return nuevoTurno;
  }

  @Get()
  findAll() {
    return this.turnService.findAll();
  }

  @Get('in_progress')
  findInProgres() {
    return this.turnService.obtenerTurnosEnProceso();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTurnDto: UpdateTurnDto) {
    const turnAct = this.turnService.update(+id, updateTurnDto);
    if (updateTurnDto.estado_turno === StatusTurn.EN_PROCESO) {
      this.turnoGateway.handleTurnoAtendido(updateTurnDto);
    }
    this.turnoGateway.server.emit('turnoActualizado', turnAct);
    return turnAct;
  }
}
