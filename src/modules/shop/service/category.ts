import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { ShopCategoryEntity } from '../entity/category';
import { ShopGoodsEntity } from '../entity/goods';

/**
 * 商城-商品分类
 */
@Provide()
export class ShopCategoryService extends BaseService {
  @InjectEntityModel(ShopCategoryEntity)
  shopCategoryEntity: Repository<ShopCategoryEntity>;

  @InjectEntityModel(ShopGoodsEntity)
  shopGoodsEntity: Repository<ShopGoodsEntity>;
}
