import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { PictureDateEntity } from '../entity/date';

/**
 * 图片日期服务
 */
@Provide()
export class PictureDateService extends BaseService {
  @InjectEntityModel(PictureDateEntity)
  pictureDateEntity: Repository<PictureDateEntity>;

  /**
   * 修改之前的数据处理
   * @param data 数据
   * @param type 操作类型
   */
  async modifyBefore(data: any, type: 'delete' | 'update' | 'add') {
    // 可以在这里添加数据验证或处理逻辑
    if (type === 'add' || type === 'update') {
      // 确保日期格式正确
      if (data.date && typeof data.date === 'string') {
        data.date = new Date(data.date);
      }
    }
  }

  /**
   * 修改之后的数据处理
   * @param data 数据
   * @param type 操作类型
   */
  async modifyAfter(data: any, type: 'delete' | 'update' | 'add') {
    // 可以在这里添加后续处理逻辑，如缓存更新、日志记录等
  }

  /**
   * 根据日期查询图片信息
   * @param date 日期
   * @returns 图片日期信息
   */
  async findByDate(date: string | Date): Promise<PictureDateEntity | null> {
    // 将日期转换为YYYY-MM-DD格式的字符串
    let dateStr: string;
    if (typeof date === 'string') {
      // 如果传入的是字符串，确保格式正确
      dateStr = date.includes('T') ? date.split('T')[0] : date;
    } else {
      // 如果传入的是Date对象，转换为YYYY-MM-DD格式
      dateStr = date.toISOString().split('T')[0];
    }
    
    // 使用QueryBuilder进行日期查询，避免时区和时间部分的影响
    return await this.pictureDateEntity
      .createQueryBuilder('pd')
      .where('DATE(pd.date) = :date', { date: dateStr })
      .getOne();
  }

  /**
   * 获取指定状态的图片日期列表
   * @param status 状态
   * @returns 图片日期列表
   */
  async findByStatus(status: number): Promise<PictureDateEntity[]> {
    return await this.pictureDateEntity.findBy({ status });
  }

  /**
   * 获取日期范围内的图片信息
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @returns 图片日期列表
   */
  async findByDateRange(startDate: Date, endDate: Date): Promise<PictureDateEntity[]> {
    return await this.pictureDateEntity
      .createQueryBuilder('date')
      .where('date.date >= :startDate', { startDate })
      .andWhere('date.date <= :endDate', { endDate })
      .orderBy('date.date', 'ASC')
      .getMany();
  }
} 