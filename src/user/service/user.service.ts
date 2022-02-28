import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../schema/mysql/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MysqlDB } from '@common/constant/db.constant';
import { Gender, UserInfo } from '@src/user/dto/user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRegistryReqDto } from '@src/user/dto/user-registry';
import { BusinessException } from '@common/exception/business-exception';
import { ResponseErrorCode } from '@common/constant/response-code.constant';
import { AppConfigService } from '@common/app-config/service/app-config.service';

interface IUser {
  username: string;
  userId: number;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity, MysqlDB.Shuke)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<UserInfo | null> {
    const findParams = {
      username,
      password: await this.appConfigService.uglifyUserPassword(password),
    };

    const user = await this.userRepo.findOne({
      where: findParams,
    });
    if (user) {
      return await this.getUserInfo(user.id);
    }
    return null;
  }

  async login(user: UserInfo): Promise<{ token: string }> {
    const token = this.jwtSign({ username: user.username, id: user.id });
    return {
      token,
    };
  }

  async isUserExist(username: string) {
    const user = await this.userRepo.findOne({ where: { username } });

    return Boolean(user);
  }

  async registry(body: UserRegistryReqDto) {
    const { username, password, email } = body;

    if (await this.isUserExist(username)) {
      throw new BusinessException(ResponseErrorCode.USER_EXIST);
    }

    const uglifyPassword = await this.appConfigService.uglifyUserPassword(
      password,
    );

    console.log(uglifyPassword, 'uglifyPassword');
    await this.userRepo.save({
      username,
      password: uglifyPassword,
      email,
      nickname: username,
      gender: Gender.Male,
    });

    return null;
  }

  async getUserInfo(userId: number): Promise<UserInfo> {
    const user = await this.userRepo.findOne({
      where: {
        id: userId,
      },
    });

    return user as UserInfo;
  }

  jwtSign(payload: { username: string; id: number }) {
    return this.jwtService.sign(payload);
  }
}
