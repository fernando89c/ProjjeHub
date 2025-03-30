import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurando CORS para permitir requisições do frontend
  app.enableCors({
    origin: 'http://localhost:9000', // URL do frontend Quasar
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Usando porta 3001 para o backend
  await app.listen(3001);
}
bootstrap();
