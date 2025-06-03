import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShopGoodsEntity } from '../../entity/goods';
import { ShopGoodsService } from '../../service/goods';
import { ShopCategoryEntity } from '../../entity/category';

/**
 * 商城-商品信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ShopGoodsEntity,
  service: ShopGoodsService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.categoryId', 'a.status'],
    select: ['a.*', 'b.name as categoryName'],
    join: [
      {
        entity: ShopCategoryEntity,
        alias: 'b',
        condition: 'a.categoryId = b.id',
        type: 'leftJoin',
      },
    ],
  },
})
export class AdminShopGoodsController extends BaseController {
  @Inject()
  shopGoodsService: ShopGoodsService;
}
