import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * banner模块-Banner信息
 */
@Entity('banner_info')
export class BannerInfoEntity extends BaseEntity {
  @Index()
  @Column({ comment: '名称', length: 255 })
  name: string;

  @Column({ comment: '图片', nullable: true })
  pic: string;

  @Column({ comment: '链接', nullable: true })
  link: string;

  @Column({ comment: '排序', default: 0 })
  sort: number;

  @Column({
    comment: '类型',
    dict: ['首页Banner', '分类Banner', '活动Banner', '未知'],
    default: 0,
  })
  type: number;

  @Column({ comment: '状态', dict: ['禁用', '启用'], default: 1 })
  status: number;

  @Column({ comment: '简介', type: 'text', nullable: true })
  summary: string;

  @Column({ comment: '备注', nullable: true })
  remark: string;
}
