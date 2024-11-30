import { Inject, Injectable } from '@nestjs/common';
import { CreatePersonalDto } from './dto/create-personal.dto';
import { UpdatePersonalDto } from './dto/update-personal.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Personal } from './entities/personal.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/shared/enums/roles.enum';
import { PaginationDto } from './dto/pagination-personal.dto';

@Injectable()
export class PersonalService {
  constructor(
    @InjectRepository(Personal)
    private personalRepository: Repository<Personal>,
    @Inject()
    private readonly userService: UsersService,
  ) {}
  async create(createPersonalDto: CreatePersonalDto) {
    const username = this.generateUsername(
      createPersonalDto.first_name,
      createPersonalDto.surname,
      createPersonalDto.no_identification,
    );
    const password = await this.hashPassword(
      createPersonalDto.no_identification,
    );
    try {
      const newUser = await this.userService.create({
        username,
        password,
        role: createPersonalDto.role,
      });
      const userStaff: CreatePersonalDto = {
        ...createPersonalDto,
        user_id: newUser.id,
      };
      const newStaff = this.personalRepository.create(userStaff);
      const createStaff = await this.personalRepository.save(newStaff);
      return {
        credential: newUser,
        user: createStaff,
        message: 'Personal creado con exito.',
      };
    } catch (error) {
      throw new Error('Error al crear usuario. Detalles: ' + error.message);
    }
  }

  private generateUsername(
    firstName: string,
    surname: string,
    no_identification: string,
  ): string {
    const letter = firstName.charAt(0).toLowerCase();
    const lastname = surname.replace(/ /g, '').toLowerCase();
    const number = no_identification.slice(-3);
    return `${letter}${lastname}${number}`;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  async findAll() {
    return await this.personalRepository.find();
  }

  async findOne(id: number) {
    return await this.personalRepository.findOne({
      where: { id },
    });
  }

  async findOneByUserId(user_id: number) {
    return await this.personalRepository.findOne({
      where: { user_id },
    });
  }

  async findAllTeachers(role: Role) {
    return await this.personalRepository.find({
      where: { role },
    });
  }

  async update(id: number, updatePersonalDto: UpdatePersonalDto) {
    await this.personalRepository.update({ id }, updatePersonalDto);
    const updateStaff = await this.findOne(id);
    return { data: updateStaff, message: 'Personal actualizado exitosamente.' };
  }

  async findAllWithPagination({limit, page}: PaginationDto) {
    return this.personalRepository.find({skip: page, take: limit})
  }
}
