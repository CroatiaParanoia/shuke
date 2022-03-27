import { forwardRef, Module } from '@nestjs/common';
import { DreamController } from '@dream/controller/dream.controller';
import { DreamService } from '@dream/service/dream.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DreamEntity], MysqlDB.Shuke),
    forwardRef(() => UserModule),
  ],
  controllers: [DreamController],
  providers: [DreamService],
  exports: [DreamService],
})
export class DreamModule {}
