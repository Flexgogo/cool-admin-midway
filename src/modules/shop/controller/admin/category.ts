import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShopCategoryEntity } from '../../entity/category';
import { ShopCategoryService } from '../../service/category';

/**
 * 商城-商品分类
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: ShopCategoryEntity,
  service: ShopCategoryService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'],
    fieldEq: ['a.id', 'a.status', 'a.type'],
    fieldLike: ['a.name'],
  },
})
export class AdminShopCategoryController extends BaseController {
  @Inject()
  shopCategoryService: ShopCategoryService;
}
