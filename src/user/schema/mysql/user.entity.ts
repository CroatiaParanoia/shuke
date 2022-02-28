import { BaseEntity } from '@common/entities/base.entity';
import { Gender } from '@src/user/dto/user.dto';
import { Column, Entity } from 'typeorm';

export const UserEntityTable = 'user';

@Entity({ name: UserEntityTable })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 18, comment: '用户名' })
  username: string;

  @Column({ type: 'varchar', length: 200, select: false, comment: '密码' })
  password: string;

  @Column({ type: 'varchar', length: 24, comment: '邮箱' })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  nickname: string;

  @Column({
    type: 'enum',
    enum: Gender,
    comment: '性别',
  })
  gender: Gender;
}
