import { ApiProperty } from '@nestjs/swagger';

export class UserRegistryReqDto {
  @ApiProperty({ required: true, description: '用户名' })
  username: string;

  @ApiProperty({ required: true, description: '密码' })
  password: string;

  @ApiProperty({ required: true, description: '邮箱' })
  email: string;
}
