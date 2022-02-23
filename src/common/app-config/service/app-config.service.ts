import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import { MysqlDB } from '@common/constant/db.constant';

@Injectable()
class AppConfigService {
  DATABASE_PORT;

  constructor(private readonly configService: ConfigService) {}

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
}

export { AppConfigService };
