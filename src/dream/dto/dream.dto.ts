import { IntersectionType } from '@nestjs/swagger';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { PublicUserInfo } from '@user/dto/user.dto';

export class DreamDto extends IntersectionType(
  // OmitType(DreamEntity, ['user']),
  DreamEntity,
  PublicUserInfo,
) {}
