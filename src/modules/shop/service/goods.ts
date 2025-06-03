import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ShopGoodsEntity } from '../entity/goods';
import { ShopCategoryEntity } from '../entity/category';

/**
 * 商城-商品信息
 */
@Provide()
export class ShopGoodsService extends BaseService {
  @InjectEntityModel(ShopGoodsEntity)
  shopGoodsEntity: Repository<ShopGoodsEntity>;

  @InjectEntityModel(ShopCategoryEntity)
  shopCategoryEntity: Repository<ShopCategoryEntity>;
}
