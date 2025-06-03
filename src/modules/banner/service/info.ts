import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BannerInfoEntity } from '../entity/info';

/**
 * Banner信息
 */
@Provide()
export class BannerInfoService extends BaseService {
  @InjectEntityModel(BannerInfoEntity)
  bannerInfoEntity: Repository<BannerInfoEntity>;
}
