import { DelabsGraphqlModule } from '@delabs/graphql';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from './config';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true
  });
  app.setGlobalPrefix(config.prefix);
  app.useGlobalPipes(new ValidationPipe());
  app.disable('x-powered-by');

  DelabsGraphqlModule.createGqlDocument();

  const port = 3000;
  await app.listen(port);

  console.log(
    `🚀 server ready at http://localhost:${port}/${process.env.API_PREFIX}/graphql 🚀`
  );
}

bootstrap();
