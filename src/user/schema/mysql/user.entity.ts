import { BaseEntity } from '@common/entities/base.entity';
import { Gender } from '@src/user/dto/user.dto';
import { Column, Entity } from 'typeorm';

export const UserEntityTable = 'user';

@Entity({ name: UserEntityTable })
export class UserEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
  })
  name: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: Gender,
    comment: '性别',
  })
  gender: Gender;
}
