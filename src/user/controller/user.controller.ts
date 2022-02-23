import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  CreateUserInfoReqDto,
  QueryUserInfoReqDto,
  QueryUserInfoResDto,
  QueryUserListResDto,
} from '@src/user/dto/user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('info')
  @ApiOperation({ summary: '查询用户信息' })
  async getUserInfo(
    @Query() query: QueryUserInfoReqDto,
  ): Promise<QueryUserInfoResDto> {
    return {
      data: await this.userService.getUserInfo(query.userId),
    };
  }

  @Post('info')
  @ApiOperation({ summary: '创建用户' })
  async createUser(@Body() body: CreateUserInfoReqDto): Promise<{
    code: number;
    message: string;
  }> {
    const isCreateSuccess = await this.userService.createUser(body);

    return {
      code: isCreateSuccess ? 0 : 1,
      message: isCreateSuccess ? '创建成功' : '创建失败',
    };
  }

  @Get('list')
  @ApiOperation({ summary: '查询用户列表' })
  async getUserList(): Promise<QueryUserListResDto> {
    return {
      data: await this.userService.getUserList(),
    };
  }
}
