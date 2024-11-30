import { Controller, Get, Post, Body, Req, UnauthorizedException } from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUserInterface, RequestWithUser } from 'src/shared/interfaces/requestUser.interface';
import { allPersonal } from 'src/shared/constants/rolesConstants';
import { Auth } from 'src/shared/decorators/auth.decorator';
import { ActiveUser } from 'src/shared/decorators/user.decorator';

@ApiTags('Login Controller')
@Controller('auth')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post('login')
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.loginUser(createLoginDto);
  }

  @Get('profile')
  @Auth(...allPersonal)
  profile(
    @ActiveUser()
    req: ActiveUserInterface
  ){
    return this.loginService.profileById(req);
  }

  @Get('username')
  @Auth(...allPersonal)
  username(
    @Req()
    req: ActiveUserInterface
  ){
      return this.loginService.profileByUsername(req);
  }

  @Post('refresh-token')
  async refreshToken(@Body('refreshToken') refreshToken: string) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token es requerido');
    }
    return this.loginService.refreshAccessToken(refreshToken);
  }
}
