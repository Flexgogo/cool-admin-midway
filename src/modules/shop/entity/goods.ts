import { BaseEntity } from '../../base/entity/base';
import { Column, Entity, Index } from 'typeorm';

/**
 * 商城-商品信息
 */
@Entity('shop_goods')
export class ShopGoodsEntity extends BaseEntity {
  @Column({ comment: '图片', type: 'text' })
  pic: string[];

  @Index()
  @Column({ comment: '名称' })
  name: string;

  @Index()
  @Column({ comment: '分类ID' })
  categoryId: number;

  @Column({ comment: '状态', dict: ['下架', '上架'], default: 0 })
  status: number;

  @Column({ comment: '描述', type: 'text', nullable: true })
  description: string;

  @Column({ comment: '排序', default: 0 })
  orderNum: number;
}
