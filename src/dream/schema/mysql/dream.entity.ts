import { AbstractEntity } from '@common/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { IsBoolean, IsString, Length } from 'class-validator';

export const DreamEntityTable = 'dream';

@Entity({ name: DreamEntityTable })
export class DreamEntity extends AbstractEntity {
  /**
   * 梦想内容
   */
  @Column({ type: 'varchar', length: 300, comment: '梦想内容' })
  @IsString({ message: 'dream 字段必须为string类型' })
  @Length(1, 300, { message: '梦想长度不合法' })
  dream: string;

  /**
   * 是否公开
   */
  @Column({ type: 'boolean', comment: '是否公开秘密' })
  @IsBoolean()
  isPublic: boolean;

  // @ManyToOne(() => UserEntity, (user) => user.dreams)
  // user: UserEntity;

  /**
   * 用户id
   */
  @Column({
    type: 'int',
    unsigned: true,
    nullable: false,
    comment: '用户id',
  })
  userId: number;
}
