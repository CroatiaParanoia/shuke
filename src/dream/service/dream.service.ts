import { Injectable } from '@nestjs/common';
import { CreateDreamReqDto } from '@dream/dto/create-dream.dto';
import { Repository } from 'typeorm';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { UserService } from '@user/service/user.service';

@Injectable()
export class DreamService {
  constructor(
    @InjectRepository(DreamEntity, MysqlDB.Shuke)
    readonly dreamRepo: Repository<DreamEntity>,
    readonly userService: UserService,
  ) {}

  async createDream(userId: number, { dream, isPublic }: CreateDreamReqDto) {
    const dreamIns = new DreamEntity();
    dreamIns.dream = dream;
    dreamIns.isPublic = isPublic;

    dreamIns.user = await this.userService.getUser(userId);

    return this.dreamRepo.save(dreamIns);
  }

  async getPublicDreamList() {
    return await this.dreamRepo.find({
      where: { isPublic: true },
      relations: ['user'],
      take: 10,
    });
  }
}
