import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 图片日期信息
 */
@Entity('picture_date')
export class PictureDateEntity extends BaseEntity {
  @Column({ comment: '日期', type: 'date' })
  date: Date;

  @Column({ comment: '图片', nullable: true })
  picture: string;

  @Column({ comment: '状态', dict: ['禁用', '启用'], default: 1 })
  status: number;

  @Column({ comment: '备注', nullable: true })
  remark: string;

  @Column({ comment: '名称', nullable: true })
  name: string;
}
