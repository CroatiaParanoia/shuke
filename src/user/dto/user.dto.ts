import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@src/user/schema/mysql/user.entity';

export enum Gender {
  Male = 'male',
  Female = 'female',
}

export class QueryUserInfoReqDto {
  @ApiProperty()
  userId: number;
}

export class QueryUserInfoResDto {
  @ApiProperty({ type: () => UserEntity })
  data: UserEntity;
}

export type UserInfo = Omit<UserEntity, 'password'>;

export class CreateUserInfoReqDto {
  @ApiProperty()
  nickname: string;

  @ApiProperty({ type: 'enum', enum: Gender })
  gender: Gender;
}

export class QueryUserListResDto {
  @ApiProperty({ type: () => UserEntity, isArray: true })
  data: UserEntity[];
}
