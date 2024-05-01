import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder} from '@nestjs/swagger'; //npm install --save @nestjs/swagger
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => ({
          property : error.property,
          message : error.constraints[Object.keys(error.constraints)[0]],
        }));
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  //configuracion de parámetros básicos de la documentación de la API
  const configuracion = new DocumentBuilder() 
  .setTitle('Uber Eats TAW 2024')
  .setDescription('Esta API adjunta las entities y eschemas de la base de datos del proyecto de TAW para el caso de estudio y solución para UBER EATS')
  .setVersion('1.0')
  .build()

  //Instanciando la documentación del swagger en 'localhost:3000/api/doc' 
  const documentacion = SwaggerModule.createDocument(app, configuracion); //
  SwaggerModule.setup('api/doc', app, documentacion);

  await app.listen(3000);
}
bootstrap();
