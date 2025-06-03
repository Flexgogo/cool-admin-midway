import { Get, Inject } from '@midwayjs/core';
import { CoolController, BaseController, CoolTag, TagTypes } from '@cool-midway/core';
import { PictureDateService } from '../../service/date';

/**
 * APP端图片日期接口
 */
@CoolController({
  api: [],
})
export class AppPictureDateController extends BaseController {
  @Inject()
  ctx;

  @Inject()
  pictureDateService: PictureDateService;

  /**
   * 根据起止时间获取图片列表
   * @param startDate 开始日期 YYYY-MM-DD
   * @param endDate 结束日期 YYYY-MM-DD
   * @returns 图片列表
   */
  @CoolTag(TagTypes.IGNORE_TOKEN)
  @Get('/picturesByDateRange')
  async getPicturesByDateRange() {
    const { startDate, endDate } = this.ctx.request.query;
    
    // 参数验证
    if (!startDate || !endDate) {
      return this.fail('开始日期和结束日期不能为空');
    }

    try {
      // 转换日期格式
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      
      // 验证日期有效性
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return this.fail('日期格式不正确，请使用YYYY-MM-DD格式');
      }
      
      // 验证日期范围
      if (start > end) {
        return this.fail('开始日期不能大于结束日期');
      }
      
      // 调用服务获取数据
      const pictures = await this.pictureDateService.findByDateRange(start, end);
      
      // 过滤掉状态为禁用的图片
      const activePictures = pictures.filter(item => item.status === 1);
      
      // 格式化返回数据
      const result = activePictures.map(item => ({
        id: item.id,
        date: item.date,
        picture: item.picture,
        remark: item.remark,
        createTime: item.createTime,
        updateTime: item.updateTime
      }));
      
      return this.ok(result);
    } catch (error) {
      console.error('获取图片列表失败:', error);
      return this.fail('获取图片列表失败');
    }
  }
} 