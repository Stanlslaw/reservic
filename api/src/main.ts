import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API Docs')
    .setDescription('Reservic bots api')
    .setVersion('1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
        description: 'Custom auth header. Format: "tma your_token"',
      },
      'tma-auth', // это имя схемы — его укажем в контроллере
    )
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept, Authorization',
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.API_PORT ?? 3001);
}
bootstrap();
