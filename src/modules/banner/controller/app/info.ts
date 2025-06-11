import { Get, Inject, Post } from '@midwayjs/core';
import { CoolController, BaseController, CoolUrlTag, TagTypes, CoolTag } from '@cool-midway/core';
import { BannerInfoEntity } from '../../entity/info';
import { BannerInfoService } from '../../service/info';
import { PictureDateService } from '../../../picture/service/date';

/**
 * 应用Banner信息
 */
@CoolController({
  api: ['page', 'info'], 
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
  ctx;

  @Inject()
  bannerInfoService: BannerInfoService;

  @Inject()
  pictureDateService: PictureDateService;

  /**
   * 获取Banner列表 - 无需登录
   * 支持传入date参数，会同时返回对应日期的图片信息
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Post('/list')
  async list() {
    // 获取请求参数中的date
    const { date } = this.ctx.request.body;
    
    // 获取Banner列表
    const bannerResult = await super.list();
    
    // 如果传入了date参数，查询对应日期的图片信息
    let pictureInfo = null;
    if (date) {
      console.log('查询图片日期信息 - 传入参数:', { date, dateType: typeof date });
      try {
        pictureInfo = await this.pictureDateService.findByDate(date);
        console.log('查询图片日期信息 - 查询结果:', pictureInfo);
        // 只返回启用状态的图片信息
        if (pictureInfo && pictureInfo.status !== 1) {
          console.log('图片状态未启用，过滤掉:', { status: pictureInfo.status });
          pictureInfo = null;
        }
      } catch (error) {
        console.error('查询图片日期信息失败:', error);
        // 图片查询失败不影响Banner列表返回
      }
    }
    
    // 合并返回结果
    return {
      ...bannerResult,
      pictureInfo: pictureInfo ? {
        id: pictureInfo.id,
        date: pictureInfo.date,
        picture: pictureInfo.picture,
        remark: pictureInfo.remark,
        createTime: pictureInfo.createTime,
        updateTime: pictureInfo.updateTime
      } : null
    };
  }
}
