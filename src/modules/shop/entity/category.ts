import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商城-商品分类
 */
@Entity('shop_category')
export class ShopCategoryEntity extends BaseEntity {
  @Column({ comment: '图片', type: 'text'  })
  pic: string;

  @Index({ unique: true })
  @Column({ comment: '分类名称' })
  name: string;

  @Column({ comment: '描述', nullable: true })
  description: string;

  @Column({ comment: '状态', dict: ['下架', '上架'], default: 0 })
  status: number;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;
}
