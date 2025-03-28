export class CreateUserDto {
  username: string;
  password: string;
  nome?: string;
  sobrenome?: string;
  apenasUmaInstalacao?: boolean;
  ultimoClienteId?: number;
  passwordTemp?: string;
  temporario?: boolean;
  roleId?: string;
}
