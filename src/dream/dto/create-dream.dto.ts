import { DreamDto } from '@dream/dto/dream.dto';
import { PickType } from '@nestjs/swagger';
import { DreamEntity } from '@dream/schema/mysql/dream.entity';

export class CreateDreamReqDto extends PickType(DreamEntity, [
  'dream',
  'isPublic',
]) {}

export class CreateDreamResDto extends DreamDto {}
