import { Module } from '@nestjs/common';
import { UserController } from '@src/user/controller/user.controller';
import { UserService } from '@src/user/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@src/user/schema/mysql/user.entity';
import { MysqlDB } from '@common/constant/db.constant';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity], MysqlDB.Shuke)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
