import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/filters/exception.filter';
import { ValidationPipe } from './common/pipes/validatetion.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  // get config
  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('House Innovation API')
    .setDescription('Api documentation for house innovation group')
    .setContact(
      'House Innovation Group',
      'https://houseinnovationgroup.com',
      'houseinnovationgroup.com',
    )
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  await app.listen(parseInt(configService.get('PORT')) || 3000);
}
bootstrap();
