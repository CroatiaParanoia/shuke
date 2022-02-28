import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MysqlDB } from '@common/constant/db.constant';
import { UserModule } from './user/user.module';
import { AppConfigModule } from '@common/app-config/app-config.module';
import { AppConfigService } from '@common/app-config/service/app-config.service';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      name: MysqlDB.Shuke,
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        ...appConfigService.dbConfig,
        autoLoadEntities: true,
      }),
      inject: [AppConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
