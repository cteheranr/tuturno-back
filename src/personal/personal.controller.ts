import { Controller, Get, Post, Body, Param, Put, Query } from '@nestjs/common';
import { PersonalService } from './personal.service';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { ApiTags } from '@nestjs/swagger';
import { allPersonal, CRUDAdmin } from 'src/shared/constants/rolesConstants';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { ActiveUserInterface } from 'src/shared/interfaces/requestUser.interface';
import { ActiveUser } from 'src/shared/decorators/user.decorator';
import { Role } from 'src/shared/enums/roles.enum';
import { PaginationDto } from './dto/pagination-personal.dto';

@ApiTags('Staff Controller')
@Controller('personal')
export class PersonalController {
  constructor(private readonly personalService: PersonalService) {}

  @Auth(...CRUDAdmin)
  @Post()
  create(@Body() createPersonalDto: CreatePersonalDto) {
    return this.personalService.create(createPersonalDto);
  }

  // @Auth(...allPersonal)
  // @Get()
  // findAll() {
  //   return this.personalService.findAll();
  // }

  @Auth(...allPersonal)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalService.findOne(+id);
  }

  @Get('role/:role')
  findAllTeachers(@Param('role') role: Role) {
    return this.personalService.findAllTeachers(role);
  }

  @Auth(...allPersonal)
  @Get('user/:user_id')
  findOneByUsername(@Param('user_id') id: string) {
    return this.personalService.findOneByUserId(+id);
  }

  @Get('profile')
  @Auth(...allPersonal)
  profile(
    @ActiveUser()
    req: ActiveUserInterface
  ){
    return this.personalService.findOne(req.sub);
  }

  // @Auth(...CRUDStudens)
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updatePersonalDto: UpdatePersonalDto) {
  //   return this.personalService.update(+id, updatePersonalDto);
  // }

  @Auth(...allPersonal)
  @Get()
  findAllWithPagination(@Query() paginationDto: PaginationDto) {
    return this.personalService.findAllWithPagination(paginationDto);
  }
}
