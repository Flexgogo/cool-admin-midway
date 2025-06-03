import { Inject, Get, Query } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { ShopCategoryEntity } from '../../entity/category';
import { ShopCategoryService } from '../../service/category';

/**
 * 商城-商品分类
 */
@CoolController({
  api: ['list', 'info'],
  entity: ShopCategoryEntity,
  service: ShopCategoryService,
})
export class AppShopCategoryController extends BaseController {
  @Inject()
  shopCategoryService: ShopCategoryService;

  /**
   * 根据分类ID获取商品列表
   * @param categoryId
   */
  @Get('/goodsList', { summary: '根据分类ID获取商品列表' })
  async categoryGoodsList(@Query('categoryId') categoryId: number) {
    const list = await this.shopCategoryService.shopGoodsEntity.find({
      where: {
        categoryId,
        status: 1, // 仅查询上架商品
      },
    });
    return this.ok(list);
  }
}
