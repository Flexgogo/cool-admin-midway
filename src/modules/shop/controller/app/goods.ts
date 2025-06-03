import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShopGoodsEntity } from '../../entity/goods';
import { ShopGoodsService } from '../../service/goods';
import { ShopCategoryEntity } from '../../entity/category';

/**
 * 商城-商品信息
 */
@CoolController({
  api: ['list', 'page', 'info'],
  entity: ShopGoodsEntity,
  service: ShopGoodsService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.categoryId'],
    where: async () => {
      // 仅查询上架商品
      return [['a.status = :status', { status: 1 }]];
    },
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
export class AppShopGoodsController extends BaseController {
  @Inject()
  shopGoodsService: ShopGoodsService;
}
