import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { BannerInfoEntity } from '../../entity/info';
import { BannerInfoService } from '../../service/info';

/**
 * 后台Banner信息
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: BannerInfoEntity,
  service: BannerInfoService,
  pageQueryOp: {
    keyWordLikeFields: ['a.name'], // 名称支持模糊搜索
    fieldEq: ['a.type', 'a.status'], // 类型和状态支持精确匹配
  },
})
export class AdminBannerInfoController extends BaseController {
  @Inject()
  bannerInfoService: BannerInfoService;
}
