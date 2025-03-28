import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Verifica se já existe algum usuário
    const userCount = await this.usersRepository.count();
    
    if (userCount === 0) {
      // Cria um usuário de teste se não existir nenhum
      const hashedPassword = await bcrypt.hash('admin123', 10);
      const testUser = this.usersRepository.create({
        username: 'admin',
        password: hashedPassword,
        nome: 'Administrador',
        sobrenome: 'Sistema',
        roleId: '1', // Role de administrador
      });
      
      await this.usersRepository.save(testUser);
      console.log('Usuário de teste criado com sucesso!');
    }
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException(`Usuário #${id} não encontrado`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    return this.usersRepository.remove(user);
  }
}
