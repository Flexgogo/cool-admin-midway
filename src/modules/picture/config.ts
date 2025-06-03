import { ModuleConfig } from '@cool-midway/core';

/**
 * 模块配置
 */
export default () => {
  return {
    // 模块名称
    name: '图片模块',
    // 模块描述
    description: '图片管理模块，支持图片上传、分类、标签等功能',
    // 中间件
    middlewares: [],
    // 配置，jwt配置
    jwt: 'PICTURE_JWT_SECRET',
  } as ModuleConfig;
};
