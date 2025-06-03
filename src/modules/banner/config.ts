import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 必须，模块名称
    name: 'Banner模块',
    // 必须，模块描述
    description: '管理网站或应用中的Banner信息',
    // 可选，中间件，只对本模块有效
    middlewares: [],
    // 可选，全局中间件
    globalMiddlewares: [],
    // 可选，模块加载顺序，默认为0，值越大越优先加载
    order: 0,
  } as ModuleConfig;
};
