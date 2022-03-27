import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { DreamService } from '@dream/service/dream.service';
import { CreateDreamReqDto } from '@dream/dto/create-dream.dto';
import { User } from '@common/decorator/user.decorator';
import { UserInfo } from '@user/dto/user.dto';
import {
  ApiPaginatedResponse,
  ApiResponse,
} from '@common/decorator/response.decorator';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '@user/guard/jwt-auth.guard';

@Controller('dream')
export class DreamController {
  constructor(readonly dreamService: DreamService) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '造梦' })
  @ApiResponse(DreamEntity)
  createDream(@User() user: UserInfo, @Body() body: CreateDreamReqDto) {
    return this.dreamService.createDream(user.id, body);
  }

  @Get('list')
  @ApiOperation({ summary: '公共梦列表' })
  @ApiPaginatedResponse(DreamEntity)
  getPublicDreamList() {
    return this.dreamService.getPublicDreamList();
  }
}
