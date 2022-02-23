import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../schema/mysql/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { CreateUserInfoReqDto } from '@src/user/dto/user.dto';
import to from 'await-to-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, MysqlDB.Shuke)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async getUserInfo(userId: number) {
    return await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });
  }

  async getUserList() {
    return this.userRepo.find();
  }

  async createUser(body: CreateUserInfoReqDto) {
    const { name, gender, description } = body;

    const [err] = await to(
      this.userRepo.insert({
        name,
        gender,
        description,
      }),
    );

    return !err;
  }
}
