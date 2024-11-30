import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { CRUDAdmin } from 'src/shared/constants/rolesConstants';

@ApiTags('User Controller')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth(...CRUDAdmin)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Auth(...CRUDAdmin)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Auth(...CRUDAdmin)
  @Get(':username')
  findOneUsername(@Param('username') username: string) {
    return this.usersService.findOne(+username);
  }

  @Auth(...CRUDAdmin)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }
}
