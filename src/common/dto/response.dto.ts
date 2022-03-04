import { ApiProperty } from '@nestjs/swagger';
import { IsArray, ValidateNested } from 'class-validator';

export class PaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  @IsArray()
  @ApiProperty({ isArray: true })
  @ValidateNested({ each: true })
  data: TData[];

  constructor(data: TData[]) {
    this.data = data;
  }
}

export class AbstractResponseDto<T> {
  @ApiProperty()
  code: number;

  @ValidateNested()
  data: T;

  @ApiProperty()
  message: string;
}
