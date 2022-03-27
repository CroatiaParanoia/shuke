import { DreamEntity } from '@dream/schema/mysql/dream.entity';
import { PickType } from '@nestjs/swagger';

export class CreateDreamReqDto extends PickType(DreamEntity, [
  'dream',
  'isPublic',
]) {}
