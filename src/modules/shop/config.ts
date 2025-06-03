import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '商城模块',
    // 模块描述
    description: '商品管理、分类管理',
    // 中间件
    middlewares: [],
    // 中间件，全局
    globalMiddlewares: [],
    // 模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
