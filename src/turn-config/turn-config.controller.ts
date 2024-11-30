import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TurnConfigService } from './turn-config.service';
import { CreateTurnConfigDto } from './dto/create-turn-config.dto';
import { UpdateTurnConfigDto } from './dto/update-turn-config.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { allPersonal, CRUDAdmin } from 'src/shared/constants/rolesConstants';

@ApiTags('Turn-Config Controller')
@Controller('turn-config')
export class TurnConfigController {
  constructor(private readonly turnConfigService: TurnConfigService) {}

  @Auth(...CRUDAdmin)
  @Post()
  create(@Body() createTurnConfigDto: CreateTurnConfigDto) {
    return this.turnConfigService.create(createTurnConfigDto);
  }

  @Auth(...allPersonal)
  @Get()
  findAll() {
    return this.turnConfigService.findAll();
  }

  @Auth(...CRUDAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.turnConfigService.findOne(+id);
  }

  @Auth(...CRUDAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTurnConfigDto: UpdateTurnConfigDto) {
    return this.turnConfigService.update(+id, updateTurnConfigDto);
  }

  @Auth(...CRUDAdmin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.turnConfigService.remove(+id);
  }
}
