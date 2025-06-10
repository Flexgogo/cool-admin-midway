import { Inject, Get, Query } from '@midwayjs/core';
import { CoolController, BaseController, CoolUrlTag, CoolTag, TagTypes } from '@cool-midway/core';
import { ShopCategoryEntity } from '../../entity/category';
import { ShopCategoryService } from '../../service/category';

/**
 * 商城-商品分类
 */
@CoolUrlTag()
@CoolController({
  api: ['list', 'info'],
  entity: ShopCategoryEntity,
  service: ShopCategoryService,
})
export class AppShopCategoryController extends BaseController {
  @Inject()
  shopCategoryService: ShopCategoryService;

  /**
   * 分类列表 - 公开接口，无需登录
   * @param type 分类类型：0-category(分类)，1-collection(合集)，不传则查询所有
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/list', { summary: '商品分类列表' })
  async list(@Query('type') type?: number) {
    // 构建查询条件
    const whereCondition: any = {
      status: 1, // 仅查询上架的分类
    };

    // 如果传入了type参数，则添加类型筛选条件
    if (type !== undefined && type !== null) {
      whereCondition.type = type;
    }

    const list = await this.shopCategoryService.shopCategoryEntity.find({
      where: whereCondition,
      order: {
        orderNum: 'ASC', // 按排序字段升序排列
        createTime: 'DESC', // 创建时间降序
      },
    });
    return this.ok(list);
  }

  /**
   * 分类详情 - 公开接口，无需登录
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/categoryInfo', { summary: '商品分类详情' })
  async categoryInfo(@Query('id') id: number) {
    const info = await this.shopCategoryService.shopCategoryEntity.findOne({
      where: {
        id,
        status: 1, // 仅查询上架的分类
      },
    });
    return this.ok(info);
  }

  /**
   * 根据分类ID获取商品列表 - 公开接口，无需登录
   * @param categoryId
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/goodsList', { summary: '根据分类ID获取商品列表' })
  async categoryGoodsList(@Query('categoryId') categoryId: number) {
    const list = await this.shopCategoryService.shopGoodsEntity.find({
      where: {
        categoryId,
        status: 1, // 仅查询上架商品
      },
      order: {
        createTime: 'DESC', // 按创建时间降序排列
      },
    });
    return this.ok(list);
  }
}
