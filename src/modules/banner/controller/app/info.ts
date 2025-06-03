import { Get, Inject } from '@midwayjs/core';
import { CoolController, BaseController, CoolUrlTag, TagTypes, CoolTag } from '@cool-midway/core';
import { BannerInfoEntity } from '../../entity/info';
import { BannerInfoService } from '../../service/info';

/**
 * 应用Banner信息
 */
@CoolController({
  api: ['list', 'page', 'info'], 
  entity: BannerInfoEntity,
  service: BannerInfoService,
  // 配置list查询选项
  listQueryOp: {
    // 按sort字段升序排序
    addOrderBy: {
      sort: 'ASC'
    },
    // 只返回启用状态的Banner
    where: async () => {
      return [
        ['a.status = :status', { status: 1 }]
      ];
    }
  }
})
@CoolUrlTag()
export class AppBannerInfoController extends BaseController {
  @Inject()
  bannerInfoService: BannerInfoService;

  /**
   * 获取Banner列表 - 无需登录
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/list')
  async list() {
    return await super.list();
  }
}
