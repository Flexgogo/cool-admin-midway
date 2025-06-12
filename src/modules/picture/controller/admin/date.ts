import { Inject } from '@midwayjs/core';
import { CoolController, BaseController } from '@cool-midway/core';
import { PictureDateEntity } from '../../entity/date';
import { PictureDateService } from '../../service/date';

/**
 * 图片日期
 */
@CoolController({
  api: ['add', 'delete', 'update', 'info', 'list', 'page'],
  entity: PictureDateEntity,
  service: PictureDateService,
  pageQueryOp: {
    fieldEq: ['a.date', 'a.status'],
    fieldLike: ['a.name'],
    where: async (ctx) => {
      const { dateTimeRange } = ctx.request.body;
      const conditions = [];
      
      if (dateTimeRange && Array.isArray(dateTimeRange) && dateTimeRange.length === 2) {
        const [startDate, endDate] = dateTimeRange;
        if (startDate && endDate) {
          conditions.push([
            'DATE(a.date) >= :startDate AND DATE(a.date) <= :endDate',
            { startDate, endDate }
          ]);
        }
      }
      
      return conditions;
    },
  },
})
export class AdminPictureDateController extends BaseController {
  @Inject()
  pictureDateService: PictureDateService;
}
