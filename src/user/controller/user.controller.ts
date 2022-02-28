import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiOperation } from '@nestjs/swagger';
import { UserRegistryReqDto } from '@src/user/dto/user-registry';
import { User } from '@common/decorator/user.decorator';
import { UserEntity } from '@src/user/schema/mysql/user.entity';
import { UserInfo } from '@src/user/dto/user.dto';
import { JwtAuthGuard } from '@src/user/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '登录' })
  async login(@User() user: UserInfo) {
    return this.userService.login(user);
  }

  @Get('info')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '查询用户信息' })
  async getUserInfo(@User() user: UserEntity): Promise<UserInfo> {
    return user;
  }

  @Post('registry')
  @ApiOperation({ summary: '注册' })
  async registry(@Body() body: UserRegistryReqDto): Promise<void> {
    return await this.userService.registry(body);
  }
}
