import { Provide } from '@midwayjs/core';
import { BaseService } from '@cool-midway/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository, In } from 'typeorm';
import { ShopGoodsEntity } from '../entity/goods';
import { ShopCategoryEntity } from '../entity/category';

/**
 * 商城-商品信息
 */
@Provide()
export class ShopGoodsService extends BaseService {
  @InjectEntityModel(ShopGoodsEntity)
  shopGoodsEntity: Repository<ShopGoodsEntity>;

  @InjectEntityModel(ShopCategoryEntity)
  shopCategoryEntity: Repository<ShopCategoryEntity>;

  /**
   * 新增商品
   * @param param 商品参数
   * @returns 新增结果
   */
  async add(param: any) {
    // 调用父类的add方法新增商品
    const result = await super.add(param);
    
    // 如果有分类ID，则更新分类的商品数量
    if (param.categoryId) {
      await this.updateCategoryCount(param.categoryId);
    }
    
    return result;
  }

  /**
   * 删除商品
   * @param ids 商品ID数组
   * @returns 删除结果
   */
  async delete(ids: any) {
    // 处理ids参数，确保是数组格式
    const idArray = Array.isArray(ids) ? ids : [ids];
    
    // 先获取要删除的商品信息，用于后续更新分类数量
    const goodsList = await this.shopGoodsEntity.findBy({
      id: In(idArray)
    });
    
    // 调用父类的delete方法删除商品
    await super.delete(ids);
    
    // 更新相关分类的商品数量
    if (goodsList.length > 0) {
      const categoryIds = [...new Set(goodsList.map(goods => goods.categoryId))];
      for (const categoryId of categoryIds) {
        await this.updateCategoryCount(categoryId);
      }
    }
  }

  /**
   * 更新商品
   * @param param 更新参数
   * @returns 更新结果
   */
  async update(param: any) {
    let oldCategoryId: number | null = null;
    
    // 如果更新的是分类ID，需要获取原来的分类ID
    if (param.id && param.categoryId) {
      const oldGoods = await this.shopGoodsEntity.findOneBy({ id: param.id });
      oldCategoryId = oldGoods?.categoryId || null;
    }
    
    // 调用父类的update方法更新商品
    await super.update(param);
    
    // 如果涉及分类变更，需要更新相关分类的商品数量
    if (param.categoryId) {
      // 更新新分类的商品数量
      await this.updateCategoryCount(param.categoryId);
      
      // 如果分类发生了变更，也要更新原分类的商品数量
      if (oldCategoryId && oldCategoryId !== param.categoryId) {
        await this.updateCategoryCount(oldCategoryId);
      }
    }
  }

  /**
   * 更新分类的商品数量
   * @param categoryId 分类ID
   */
  private async updateCategoryCount(categoryId: number) {
    try {
      // 统计该分类下的商品数量
      const count = await this.shopGoodsEntity.count({
        where: { categoryId }
      });
      
      // 更新分类的count字段
      await this.shopCategoryEntity.update(categoryId, { count });
    } catch (error) {
      console.error('更新分类商品数量失败:', error);
    }
  }
}
