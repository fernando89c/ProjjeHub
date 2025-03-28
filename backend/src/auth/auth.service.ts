import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login(username: string, password: string) {
    const user = await this.usersRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    // O PHP usa o formato $2y$ enquanto o Node usa $2b$
    // Vamos converter o hash se necessário
    let phpHash = user.password;
    if (phpHash.startsWith('$2y$')) {
      phpHash = phpHash.replace('$2y$', '$2b$');
    }

    const isPasswordValid = await bcrypt.compare(password, phpHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      sub: user.userId,
      username: user.username,
      role: user.roleId,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.userId,
        username: user.username,
        nome: user.nome,
        sobrenome: user.sobrenome,
        role: user.roleId,
      },
    };
  }
}
