import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@common/filter/http-exception.filter';
import { ValidationPipe } from '@common/pipe/validate.pipe';
import { PostInterceptor } from '@common/interceptor/post.interceptor';
import { TransformInterceptor } from '@common/interceptor/transform.interceptor';
import { AppConfigService } from '@common/app-config/service/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const appConfigService = app.get(AppConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new PostInterceptor(), new TransformInterceptor());

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('Shuke example')
    .setDescription('The shuke API description')
    .setVersion('1.0')
    .addTag('nestjs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {});

  await app.listen(appConfigService.port);
}
bootstrap();
