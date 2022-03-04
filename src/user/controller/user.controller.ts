import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UserRegistryReqDto } from '@src/user/dto/user-registry.dto';
import { User } from '@common/decorator/user.decorator';
import { UserInfo } from '@src/user/dto/user.dto';
import { JwtAuthGuard } from '@src/user/guard/jwt-auth.guard';
import { LocalAuthGuard } from '../guard/local-auth.guard';
import { UserLoginReqDto, UserLoginResDto } from '@src/user/dto/user-login.dto';
import {
  ApiPaginatedResponse,
  ApiResponse,
} from '@common/decorator/paginated-response.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: '登录' })
  @ApiResponse(UserLoginResDto)
  async login(
    @Body() body: UserLoginReqDto,
    @User() user: UserInfo,
  ): Promise<UserInfo> {
    return this.userService.login(user);
  }

  @Get('info')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiPaginatedResponse(UserInfo)
  @ApiOperation({ summary: '查询用户信息' })
  async getUserInfo(@User() user: UserInfo): Promise<UserInfo[]> {
    return [user];
  }

  @Post('registry')
  @ApiOperation({ summary: '注册' })
  async registry(@Body() body: UserRegistryReqDto) {
    return await this.userService.registry(body);
  }
}
