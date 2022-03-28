import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { MysqlDB } from '@common/constant/db.constant';
import { UserModule } from './user/user.module';
import { AppConfigModule } from '@common/app-config/app-config.module';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { DreamModule } from '@dream/dream.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [],
    }),
    TypeOrmModule.forRootAsync({
      name: MysqlDB.Shuke,
      imports: [AppConfigModule],
      useFactory: (appConfigService: AppConfigService) => ({
        ...appConfigService.dbConfig,
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [AppConfigService],
    }),
    UserModule,
    DreamModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
