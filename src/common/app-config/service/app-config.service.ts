import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { MysqlDB } from '@common/constant/db.constant';
import * as CryptoJs from 'crypto-js';

@Injectable()
class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port() {
    return Number(this.configService.get<number>('PORT'));
  }

  get dbConfig(): MysqlConnectionOptions {
    return {
      type: 'mysql',
      name: MysqlDB.Shuke,
      host: this.configService.get<string>('DATABASE_HOST'),
      port: this.configService.get<number>('DATABASE_PORT'),
      username: this.configService.get<string>('DATABASE_USERNAME'),
      password: this.configService.get<string>('DATABASE_PASSWORD'),
      database: this.configService.get<string>('DATABASE_NAME_1'),
      synchronize: true,
    };
  }

  get jwtSecret() {
    return this.configService.get<string>('JWT_SECRET');
  }

  get userPasswordSecret() {
    return this.configService.get<string>('USER_PASSWORD_SECRET');
  }

  uglifyUserPassword(password: string) {
    return CryptoJs.MD5(`${password}.${this.userPasswordSecret}`).toString();
  }
}

export { AppConfigService };
