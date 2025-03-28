import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ unique: true, length: 100, default: '' })
  username: string;

  @Column({ length: 80, default: '' })
  password: string;

  @Column({ length: 45, nullable: true })
  nome: string;

  @Column({ length: 45, nullable: true })
  sobrenome: string;

  @Column({ type: 'tinyint', nullable: true })
  apenasUmaInstalacao: boolean;

  @Column({ nullable: true })
  ultimoClienteId: number;

  @Column({ length: 20, nullable: true })
  passwordTemp: string;

  @Column({ type: 'bit', nullable: true })
  temporario: boolean;

  @Column({ length: 45, nullable: true })
  roleId: string;
}
