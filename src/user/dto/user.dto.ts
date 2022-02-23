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
  @ApiProperty()
  data: UserEntity;
}

export class CreateUserInfoReqDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty({ type: 'enum', enum: Gender })
  gender: Gender;
}

export class QueryUserListResDto {
  @ApiProperty()
  data: UserEntity[];
}
