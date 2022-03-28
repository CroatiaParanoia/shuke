import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  CreateDreamReqDto,
  CreateDreamResDto,
} from '@dream/dto/create-dream.dto';
import { Repository } from 'typeorm';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { DreamDto } from '@dream/dto/dream.dto';
import { UserService } from '@user/service/user.service';
import { map } from 'modern-async';

@Injectable()
export class DreamService {
  constructor(
    @InjectRepository(DreamEntity, MysqlDB.Shuke)
    readonly dreamRepo: Repository<DreamEntity>,
    @Inject(forwardRef(() => UserService))
    readonly userService: UserService,
  ) {}

  async createDream(
    userId: number,
    { dream, isPublic }: CreateDreamReqDto,
  ): Promise<CreateDreamResDto> {
    const publicUser = await this.userService.getPublicUser(userId);
    const dreamInfo = await this.dreamRepo.save({
      dream,
      isPublic,
      userId,
    });

    return {
      ...dreamInfo,
      ...publicUser,
    };
  }

  async getPublicDreamList(): Promise<DreamDto[]> {
    const dreamList = await this.dreamRepo.find({
      where: { isPublic: true },
      take: 10,
      order: {
        createAt: 'DESC',
      },
    });

    const userIds = dreamList.map((v) => v.userId);
    const publicUserMapping = await this.userService.getPublicUserMappingByIds(
      userIds,
    );

    return await map(dreamList, async (item) => {
      const publicUser = publicUserMapping.get(item.userId);
      return {
        ...item,
        ...publicUser,
      };
    });
  }

  async getDreamListByUserId(userId: number): Promise<DreamDto[]> {
    const user = await this.userService.getPublicUser(userId);
    const dreamList = await this.dreamRepo.find({ where: { userId } });

    return dreamList.map((item) => {
      return {
        ...item,
        ...user,
      };
    });
  }
}
