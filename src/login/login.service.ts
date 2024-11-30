import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLoginDto } from './dto/create-login.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { LoginResponse } from 'src/shared/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private userService: UsersService
  ) {}

  async loginUser({
    username,
    password,
  }: CreateLoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'password', 'role'],
    });
    if (!user) {
      throw new UnauthorizedException('Credensiales incorrectas');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Credensiales incorrectas');
    }

    const payload = { username: user.username, role: user.role, sub: user.id };
    const token = await this.jwtService.signAsync(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '5d',
    });
    return {
      token,
      refreshToken
    };

  }

  async profileById({ sub, role } : { sub: number, role: string }){
    const response = await this.userService.findOne(sub);
    return response;
  }

  async profileByUsername({ username } : { username: string }){
    const response = await this.userService.findOneUsername(username);
    return response;
  }

  async refreshAccessToken(refreshToken: string): Promise<{ token: string }> {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      const newAccessToken = this.jwtService.sign(
        { username: payload.username, role: payload.role, sub: payload.sub },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      return { token: newAccessToken };
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
