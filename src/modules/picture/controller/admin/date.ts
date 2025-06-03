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
  },
})
export class AdminPictureDateController extends BaseController {
  @Inject()
  pictureDateService: PictureDateService;
}
